import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Global3DCanvas — Liquid Domain-Warped WebGL Shader Field
 * 
 * Architecture:
 * 1. Centerpiece: Full-bleed WebGL fragment shader with multi-octave FBM domain warping (molten glass / mercury / aurora field)
 * 2. Theme-Driven Material Feel: Deep iridescent dark mode vs soft frosted opalescent light mode
 * 3. Reactive Field: Scroll-linked distortion flow + cursor ripple deflection with lerp decay
 * 4. 3-Tier Hardware Performance Scaling (low / mid / high) with Page Visibility pause
 * 5. Touch-aware event binding with zero dead mousemove listeners
 */
export default function Global3DCanvas({ theme = 'dark' }) {
  const mountRef = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // =========================================================================
    // 1. HARDWARE PERFORMANCE TIER DETECTION (Executed once on mount)
    // =========================================================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isSmallScreen = window.innerWidth < 480;

    const getDeviceTier = () => {
      // Non-blocking hardware heuristics
      const cores = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 4; // in GB if supported

      // LOW: Budget mobile devices (<= 4 cores or <= 3GB memory or small touch)
      if (cores <= 4 || memory <= 3 || (isTouch && isSmallScreen && cores <= 4)) {
        return 'low';
      }
      // MID: Average laptops, mid-range phones, tablets
      if (cores <= 6 || memory <= 6 || isTouch) {
        return 'mid';
      }
      // HIGH: Desktop & workstation graphics
      return 'high';
    };

    const tier = getDeviceTier();
    const isLowTier = tier === 'low';
    const isMidTier = tier === 'mid';
    const isHighTier = tier === 'high';

    // =========================================================================
    // 2. THREE.JS SCENE, ORTHOGRAPHIC CAMERA & RENDERER
    // =========================================================================
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false, // Not needed for fragment-shader screen quad
        alpha: true,
        powerPreference: 'high-performance',
        precision: isLowTier ? 'mediump' : 'highp',
        depth: false,
        stencil: false
      });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Pixel ratio capping to guarantee smooth 60fps
      const maxPixelRatio = isLowTier ? 1.0 : isMidTier ? 1.25 : Math.min(window.devicePixelRatio, 1.5);
      renderer.setPixelRatio(maxPixelRatio);
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL Shader initialization failed", e);
      return;
    }

    // =========================================================================
    // 3. GLSL LIQUID DOMAIN-WARPED FRAGMENT SHADER
    // =========================================================================
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;

      uniform float u_time;
      uniform float u_scroll;
      uniform vec2 u_mouse;
      uniform vec2 u_resolution;
      uniform float u_theme; // 0.0 = Dark Mode, 1.0 = Light Mode
      uniform float u_tier;  // 0.0 = Low, 1.0 = Mid, 2.0 = High

      // 2D Hash & Value Noise
      vec2 hash2(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
              dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
          mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
              dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      // Fractional Brownian Motion (FBM) with adaptive octaves per device tier
      float fbm(vec2 p) {
        float val = 0.0;
        float amp = 0.5;
        float freq = 1.0;
        
        // 2 octaves on low/mid
        val += amp * noise(p * freq);
        freq *= 2.02;
        amp *= 0.5;
        
        val += amp * noise(p * freq);
        
        // 4 octaves on high tier
        if (u_tier > 1.5) {
          freq *= 2.03;
          amp *= 0.5;
          val += amp * noise(p * freq);
          
          freq *= 2.01;
          amp *= 0.5;
          val += amp * noise(p * freq);
        }
        
        return val;
      }

      // Multi-Layer Domain Warping: f(p + f(p + f(p)))
      float domainWarp(vec2 p, out vec2 q, out vec2 r) {
        q.x = fbm(p + vec2(0.0, 0.0) + 0.05 * u_time);
        q.y = fbm(p + vec2(5.2, 1.3) + 0.04 * u_time);

        r.x = fbm(p + 4.0 * q + vec2(1.7, 9.2) + 0.12 * u_time + u_scroll * 0.6);
        r.y = fbm(p + 4.0 * q + vec2(8.3, 2.8) + 0.09 * u_time);

        return fbm(p + 3.5 * r);
      }

      void main() {
        vec2 st = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        // Localized cursor ripple deflection
        float mouseDist = length(st - u_mouse);
        float mouseRipple = exp(-mouseDist * 2.5) * 0.22;
        st += (st - u_mouse) * mouseRipple;

        // Scaling & smooth organic flow
        vec2 p = st * 1.35;
        p.y += u_scroll * 1.2;

        vec2 q, r;
        float f = domainWarp(p, q, r);

        // =====================================================================
        // COLOR PALETTES (Dark Mode vs Light Mode)
        // =====================================================================
        // Dark Mode: Cosmic Void -> Cyan Aurora -> Indigo -> Emerald Shimmer
        vec3 darkBase    = vec3(0.015, 0.03, 0.07);
        vec3 darkCyan    = vec3(0.05, 0.55, 0.88);
        vec3 darkIndigo  = vec3(0.35, 0.18, 0.82);
        vec3 darkEmerald = vec3(0.06, 0.80, 0.65);

        vec3 colDark = mix(darkBase, darkIndigo, clamp(f * f * 3.5, 0.0, 1.0));
        colDark = mix(colDark, darkCyan, clamp(length(q) * 1.2, 0.0, 1.0));
        colDark = mix(colDark, darkEmerald, clamp(length(r.x) * 0.9, 0.0, 1.0));
        colDark += vec3(0.04, 0.15, 0.35) * f * f * 2.0;

        // Light Mode: High-Contrast Opalescent Liquid Ribbons & Silk Shimmer
        vec3 lightBase    = vec3(0.91, 0.94, 0.98);
        vec3 lightAzure   = vec3(0.18, 0.52, 0.94);
        vec3 lightViolet  = vec3(0.42, 0.24, 0.88);
        vec3 lightCyan    = vec3(0.04, 0.68, 0.78);
        vec3 lightRose    = vec3(0.90, 0.32, 0.62);

        vec3 colLight = mix(lightBase, lightAzure, clamp(f * f * 3.2, 0.0, 0.85));
        colLight = mix(colLight, lightViolet, clamp(length(q) * 1.1, 0.0, 0.80));
        colLight = mix(colLight, lightCyan, clamp(length(r.x) * 0.95, 0.0, 0.75));
        colLight = mix(colLight, lightRose, clamp(r.y * 0.6, 0.0, 0.55));

        // Smooth cross-fade between Dark & Light themes
        vec3 finalColor = mix(colDark, colLight, u_theme);

        // Subtle vignette for cinematic depth
        float vignette = 1.0 - smoothstep(0.5, 1.6, length(st * 0.8));
        finalColor *= mix(vignette, 1.0, 0.35);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const tierUniformVal = isLowTier ? 0.0 : isMidTier ? 1.0 : 2.0;

    const uniforms = {
      u_time: { value: 0 },
      u_scroll: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_theme: { value: themeRef.current === 'dark' ? 0.0 : 1.0 },
      u_tier: { value: tierUniformVal }
    };

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthTest: false,
      depthWrite: false
    });

    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const quadMesh = new THREE.Mesh(quadGeo, shaderMaterial);
    scene.add(quadMesh);

    // =========================================================================
    // 4. MOUSE & TOUCH EVENT MANAGEMENT
    // =========================================================================
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    if (!isTouch && !isLowTier) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // =========================================================================
    // 5. SCROLL PROGRESS & PAGE VISIBILITY
    // =========================================================================
    let targetScroll = 0;
    let currentScroll = 0;
    let isTabVisible = !document.hidden;

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = docHeight > 0 ? window.scrollY / docHeight : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // =========================================================================
    // 6. ANIMATION & THEME LERP RENDER LOOP
    // =========================================================================
    const clock = new THREE.Clock();
    let animationFrameId;

    let targetThemeFloat = themeRef.current === 'dark' ? 0.0 : 1.0;
    let currentThemeFloat = targetThemeFloat;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Pause when tab is hidden to save GPU cycles
      if (!isTabVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth Theme Cross-Fade Lerp (~350ms continuous interpolation)
      targetThemeFloat = themeRef.current === 'dark' ? 0.0 : 1.0;
      currentThemeFloat += (targetThemeFloat - currentThemeFloat) * 0.1;
      uniforms.u_theme.value = currentThemeFloat;

      // Time progression (respects reduced motion)
      if (!prefersReducedMotion) {
        uniforms.u_time.value = elapsed * 0.6;
      } else {
        uniforms.u_time.value = 0.5;
      }

      // Smooth Scroll Lerp
      currentScroll += (targetScroll - currentScroll) * 0.08;
      uniforms.u_scroll.value = currentScroll;

      // Smooth Mouse Lerp
      if (!isTouch && !isLowTier) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;
        uniforms.u_mouse.value.set(currentMouseX, currentMouseY);
      }

      renderer.render(scene, camera);
    };

    animate();

    // =========================================================================
    // 7. CLEANUP & DISPOSAL
    // =========================================================================
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (!isTouch && !isLowTier) window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      quadGeo.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    />
  );
}

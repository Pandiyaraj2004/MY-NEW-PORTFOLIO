import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Global3DCanvas({ theme = 'dark' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const isDark = theme === 'dark';

    // Theme-based colors
    const fogColor = isDark ? 0x030712 : 0xf8fafc;
    const particleColor1 = isDark ? new THREE.Color(0x38bdf8) : new THREE.Color(0x4f46e5);
    const particleColor2 = isDark ? new THREE.Color(0x818cf8) : new THREE.Color(0x0284c7);
    const wireframeColor = isDark ? 0x6366f1 : 0x4f46e5;
    const coreColor = isDark ? 0x06b6d4 : 0x0284c7;

    scene.fog = new THREE.FogExp2(fogColor, 0.035);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(fogColor, 1);
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL not supported or context error", e);
      return;
    }

    // 1. Hero Signature 3D Lattice Core
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // Outer wireframe geometric lattice (Icosahedron)
    const outerGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: wireframeColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    heroGroup.add(outerMesh);

    // Inner glowing core geometry (Octahedron)
    const innerGeo = new THREE.OctahedronGeometry(0.9, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: coreColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.6 : 0.4
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    heroGroup.add(innerMesh);

    // Vertex glowing points on the outer lattice
    const vertPositions = outerGeo.attributes.position.array;
    const vertPointsGeo = new THREE.BufferGeometry();
    vertPointsGeo.setAttribute('position', new THREE.BufferAttribute(vertPositions, 3));
    const vertPointsMat = new THREE.PointsMaterial({
      color: isDark ? 0x38bdf8 : 0x4338ca,
      size: 0.1,
      transparent: true,
      opacity: 0.8
    });
    const vertPoints = new THREE.Points(vertPointsGeo, vertPointsMat);
    heroGroup.add(vertPoints);

    // 2. Global Particle Constellation (Coordinates driven by scroll)
    const particleCount = window.innerWidth < 768 ? 240 : 450;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    // Store base positions and target formations
    const basePositions = [];
    const gridPositions = [];
    const neuralPositions = [];

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Ambient spherical cluster
      const r = 3 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = (r * Math.cos(phi)) - 4;

      posArray[idx] = x;
      posArray[idx + 1] = y;
      posArray[idx + 2] = z;

      basePositions.push({ x, y, z });

      // Structured grid formation (Data Science / Skills)
      const gx = ((i % 20) - 10) * 0.8;
      const gy = (Math.floor((i % 100) / 20) - 2.5) * 0.8;
      const gz = (Math.floor(i / 100) - 2) * 2;
      gridPositions.push({ x: gx, y: gy, z: gz });

      // Neural/Connected mesh formation (AI / Projects)
      const nx = (Math.sin(i * 0.5) * 4) + ((Math.random() - 0.5) * 2);
      const ny = (Math.cos(i * 0.5) * 3) + ((Math.random() - 0.5) * 2);
      const nz = ((i / particleCount) * -12) + 2;
      neuralPositions.push({ x: nx, y: ny, z: nz });

      // Colors
      const mixRatio = Math.random();
      const mixed = particleColor1.clone().lerp(particleColor2, mixRatio);
      colorArray[idx] = mixed.r;
      colorArray[idx + 1] = mixed.g;
      colorArray[idx + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isDark ? 0.07 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.65 : 0.5,
      fog: true
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 3. Dynamic Neural / Fintech Network Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x6366f1 : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.15 : 0.1
    });

    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(180 * 3);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(networkLines);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Scroll Tracking
    let targetScroll = 0;
    let currentScroll = 0;

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = docHeight > 0 ? window.scrollY / docHeight : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Resize Handler
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll lerping
      currentScroll += (targetScroll - currentScroll) * 0.08;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // 1. Animate Hero Signature Object
      if (heroGroup) {
        // Slow rotation
        heroGroup.rotation.x = elapsedTime * 0.15;
        heroGroup.rotation.y = elapsedTime * 0.2;
        innerMesh.rotation.x = -elapsedTime * 0.3;
        innerMesh.rotation.z = elapsedTime * 0.25;

        // Position handoff on scroll: pulls back and drifts upward
        heroGroup.position.z = -currentScroll * 15;
        heroGroup.position.y = (currentScroll * 6) + (mouseY * 0.3);
        heroGroup.position.x = mouseX * 0.4;

        // Fade out slightly in later sections
        const heroOpacity = Math.max(0, 1 - currentScroll * 2.5);
        outerMat.opacity = (isDark ? 0.35 : 0.25) * heroOpacity;
        innerMat.opacity = (isDark ? 0.6 : 0.4) * heroOpacity;
        vertPointsMat.opacity = 0.8 * heroOpacity;
      }

      // 2. Camera Spatial Motion across Scroll
      camera.position.x = Math.sin(currentScroll * Math.PI) * 1.5 + (mouseX * 0.5);
      camera.position.y = -currentScroll * 4 - (mouseY * 0.5);
      camera.position.z = 8 - (currentScroll * 4);
      camera.lookAt(0, -currentScroll * 3, 0);

      // 3. Morph Particle Formations Based on Scroll Phase
      const positions = particleGeo.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const base = basePositions[i];
        const grid = gridPositions[i];
        const neural = neuralPositions[i];

        let targetX, targetY, targetZ;

        if (currentScroll < 0.25) {
          // Phase 1: Hero Ambient Constellation
          targetX = base.x;
          targetY = base.y;
          targetZ = base.z;
        } else if (currentScroll < 0.55) {
          // Phase 2: Structured Data / Skills Grid
          const t = (currentScroll - 0.25) / 0.3;
          targetX = THREE.MathUtils.lerp(base.x, grid.x, t);
          targetY = THREE.MathUtils.lerp(base.y, grid.y + Math.sin(elapsedTime + i * 0.1) * 0.2, t);
          targetZ = THREE.MathUtils.lerp(base.z, grid.z, t);
        } else if (currentScroll < 0.8) {
          // Phase 3: AI & Fintech Neural Mesh
          const t = (currentScroll - 0.55) / 0.25;
          targetX = THREE.MathUtils.lerp(grid.x, neural.x, t);
          targetY = THREE.MathUtils.lerp(grid.y, neural.y + Math.cos(elapsedTime * 0.5 + i) * 0.3, t);
          targetZ = THREE.MathUtils.lerp(grid.z, neural.z, t);
        } else {
          // Phase 4: Expansive Horizon
          targetX = base.x * 1.4;
          targetY = base.y * 1.4 + Math.sin(elapsedTime * 0.3 + i) * 0.4;
          targetZ = base.z * 1.2;
        }

        // Smooth transition
        positions[idx] += (targetX - positions[idx]) * 0.05;
        positions[idx + 1] += (targetY - positions[idx + 1]) * 0.05;
        positions[idx + 2] += (targetZ - positions[idx + 2]) * 0.05;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // 4. Update Connecting Network Lines
      if (currentScroll > 0.3 && currentScroll < 0.85) {
        const linePos = lineGeo.attributes.position.array;
        let lineIdx = 0;
        const maxLines = 60;
        let lineCount = 0;

        for (let i = 0; i < particleCount && lineCount < maxLines; i += 4) {
          const p1Idx = i * 3;
          const p2Idx = ((i + 1) % particleCount) * 3;

          linePos[lineIdx++] = positions[p1Idx];
          linePos[lineIdx++] = positions[p1Idx + 1];
          linePos[lineIdx++] = positions[p1Idx + 2];

          linePos[lineIdx++] = positions[p2Idx];
          linePos[lineIdx++] = positions[p2Idx + 1];
          linePos[lineIdx++] = positions[p2Idx + 2];

          lineCount++;
        }
        lineGeo.attributes.position.needsUpdate = true;
        lineMat.opacity = isDark ? 0.2 : 0.12;
      } else {
        lineMat.opacity = 0;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount or theme change
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      vertPointsGeo.dispose();
      vertPointsMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      if (renderer) renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  );
}

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Global3DCanvas({ theme = 'dark' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDark = theme === 'dark';

    // 1. Scene & Deep Navy / Soft Light Fog
    const scene = new THREE.Scene();
    const fogColor = isDark ? 0x040814 : 0xf8fafc;
    scene.fog = new THREE.FogExp2(fogColor, 0.022);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.8);

    // 3. WebGL Renderer
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
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = isDark ? 1.15 : 1.0;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL initialization failed", e);
      return;
    }

    // 4. Dramatic Multi-Point Lighting
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x0c1527 : 0xffffff,
      isDark ? 1.8 : 2.5
    );
    scene.add(ambientLight);

    // Key Light from upper-left (highlighting metallic struts & glass panels)
    const keyLight = new THREE.DirectionalLight(
      isDark ? 0x60a5fa : 0x3b82f6,
      isDark ? 3.0 : 2.0
    );
    keyLight.position.set(-5, 6, 4);
    scene.add(keyLight);

    // Rim light from upper-right
    const rimLight = new THREE.DirectionalLight(
      isDark ? 0x2dd4bf : 0x0284c7,
      isDark ? 2.5 : 1.5
    );
    rimLight.position.set(5, 4, 3);
    scene.add(rimLight);

    // Intense Cyan Core Point Light inside the sphere
    const internalCoreLight = new THREE.PointLight(
      isDark ? 0x06b6d4 : 0x0ea5e9,
      isDark ? 4.5 : 2.8,
      18
    );
    internalCoreLight.position.set(0, 0, 0);
    scene.add(internalCoreLight);

    // 5. MASTER GEODESIC CORE GROUP
    const coreMasterGroup = new THREE.Group();
    scene.add(coreMasterGroup);

    // Base Icosahedron Geodesic Geometry
    const sphereRadius = 2.15;
    const geodesicGeo = new THREE.IcosahedronGeometry(sphereRadius, 1);

    // Extract unique vertices for ball joints and emissive nodes
    const posAttr = geodesicGeo.attributes.position;
    const vertexMap = new Map();
    const uniqueVertices = [];

    for (let i = 0; i < posAttr.count; i++) {
      const key = `${posAttr.getX(i).toFixed(3)},${posAttr.getY(i).toFixed(3)},${posAttr.getZ(i).toFixed(3)}`;
      if (!vertexMap.has(key)) {
        const v = new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
        vertexMap.set(key, uniqueVertices.length);
        uniqueVertices.push(v);
      }
    }

    // --- A. Translucent Glass Facet Panels ---
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x0d1e36 : 0xdbeafe,
      emissive: isDark ? 0x041c33 : 0x1e3a8a,
      emissiveIntensity: isDark ? 0.4 : 0.15,
      roughness: 0.12,
      metalness: 0.2,
      transmission: 0.55,
      transparent: true,
      opacity: isDark ? 0.32 : 0.38,
      ior: 1.45,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const glassMesh = new THREE.Mesh(geodesicGeo, glassMat);
    coreMasterGroup.add(glassMesh);

    // --- B. Metallic / Chrome Structural Lattice Wireframe ---
    const wireframeGeo = new THREE.WireframeGeometry(geodesicGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x93c5fd : 0x334155,
      transparent: true,
      opacity: isDark ? 0.55 : 0.65
    });
    const latticeLines = new THREE.LineSegments(wireframeGeo, wireframeMat);
    coreMasterGroup.add(latticeLines);

    // --- C. Metallic Ball Joints at All Vertices ---
    const ballJointGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const ballJointMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x94a3b8 : 0x475569,
      metalness: 0.9,
      roughness: 0.15
    });

    uniqueVertices.forEach((v) => {
      const ball = new THREE.Mesh(ballJointGeo, ballJointMat);
      ball.position.copy(v);
      coreMasterGroup.add(ball);
    });

    // --- D. Active Emissive Glowing Nodes (Teal / Cyan) on Selected Vertices ---
    const activeIndices = [0, 2, 4, 7, 9, 11]; // ~15-20% of vertices
    const emissiveNodes = [];

    const emissiveMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x22d3ee : 0x0284c7
    });

    // Soft glow sprite texture generator
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(56, 189, 248, 1)');
      grad.addColorStop(0.35, 'rgba(6, 182, 212, 0.6)');
      grad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };
    const glowTexture = createGlowTexture();
    const glowSpriteMat = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      opacity: isDark ? 0.85 : 0.5,
      blending: THREE.AdditiveBlending
    });

    activeIndices.forEach((idx, i) => {
      if (idx < uniqueVertices.length) {
        const v = uniqueVertices[idx];
        const nodeGeo = new THREE.SphereGeometry(0.095, 16, 16);
        const nodeMesh = new THREE.Mesh(nodeGeo, emissiveMat);
        nodeMesh.position.copy(v);
        coreMasterGroup.add(nodeMesh);

        // Volumetric Glow Halo Sprite
        const sprite = new THREE.Sprite(glowSpriteMat);
        sprite.position.copy(v);
        sprite.scale.set(0.65, 0.65, 1);
        coreMasterGroup.add(sprite);

        emissiveNodes.push({
          mesh: nodeMesh,
          sprite,
          phase: i * 1.1,
          speed: 1.5 + (i % 3) * 0.4
        });
      }
    });

    // --- E. Internal Circuit Core & Glowing Octahedron ---
    const internalGeo = new THREE.OctahedronGeometry(0.9, 0);
    const internalMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.35
    });
    const internalCore = new THREE.Mesh(internalGeo, internalMat);
    coreMasterGroup.add(internalCore);

    // Inner glowing sphere kernel
    const kernelGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const kernelMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x22d3ee : 0x0ea5e9,
      transparent: true,
      opacity: isDark ? 0.75 : 0.55
    });
    const kernelMesh = new THREE.Mesh(kernelGeo, kernelMat);
    coreMasterGroup.add(kernelMesh);

    // --- F. Orbiting Planetary Rings ---
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    // Outer Primary Ring (Cyan Glowing Torus)
    const ring1Radius = 3.4;
    const ring1Geo = new THREE.TorusGeometry(ring1Radius, 0.015, 16, 128);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.65 : 0.75
    });
    const orbitRing1 = new THREE.Mesh(ring1Geo, ring1Mat);
    orbitRing1.rotation.x = Math.PI / 2.8;
    orbitRing1.rotation.y = Math.PI / 10;
    ringsGroup.add(orbitRing1);

    // Orbiting Satellite Dials / Pucks on Ring 1
    const satPucks = [];
    const puckCount = 3;
    const puckGeo = new THREE.TorusGeometry(0.12, 0.02, 12, 24);
    const puckMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x22d3ee : 0x2563eb
    });

    for (let i = 0; i < puckCount; i++) {
      const puck = new THREE.Mesh(puckGeo, puckMat);
      ringsGroup.add(puck);
      satPucks.push({
        mesh: puck,
        offset: (i * Math.PI * 2) / puckCount,
        speed: 0.22 + i * 0.05
      });
    }

    // Inner Secondary Ring (Soft Violet / Blue Torus)
    const ring2Radius = 3.05;
    const ring2Geo = new THREE.TorusGeometry(ring2Radius, 0.012, 16, 128);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x818cf8 : 0x4f46e5,
      transparent: true,
      opacity: isDark ? 0.45 : 0.55
    });
    const orbitRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
    orbitRing2.rotation.x = Math.PI / 3.2;
    orbitRing2.rotation.y = -Math.PI / 8;
    ringsGroup.add(orbitRing2);

    // --- G. Floating Holographic HUD Panels (Background Layer) ---
    const hudGroup = new THREE.Group();
    scene.add(hudGroup);

    const createHUDTexture = (type) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      ctx.strokeStyle = isDark ? '#38bdf8' : '#2563eb';
      ctx.fillStyle = isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(37, 99, 235, 0.1)';
      ctx.lineWidth = 1.5;

      // Card border
      ctx.strokeRect(4, 4, 120, 56);
      ctx.fillRect(4, 4, 120, 56);

      if (type === 'bars') {
        // Mini bar chart
        const heights = [18, 32, 24, 42, 28, 38];
        ctx.fillStyle = isDark ? '#22d3ee' : '#3b82f6';
        heights.forEach((h, i) => {
          ctx.fillRect(15 + i * 16, 52 - h, 10, h);
        });
      } else if (type === 'nodes') {
        // Mini node graph
        ctx.fillStyle = isDark ? '#38bdf8' : '#4f46e5';
        ctx.beginPath();
        ctx.arc(25, 32, 5, 0, Math.PI * 2);
        ctx.arc(64, 18, 4, 0, Math.PI * 2);
        ctx.arc(64, 46, 4, 0, Math.PI * 2);
        ctx.arc(100, 32, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(25, 32);
        ctx.lineTo(64, 18);
        ctx.lineTo(100, 32);
        ctx.lineTo(64, 46);
        ctx.lineTo(25, 32);
        ctx.stroke();
      } else {
        // Mini waveform line
        ctx.beginPath();
        ctx.moveTo(12, 32);
        ctx.lineTo(30, 32);
        ctx.lineTo(42, 14);
        ctx.lineTo(54, 48);
        ctx.lineTo(68, 20);
        ctx.lineTo(82, 38);
        ctx.lineTo(96, 32);
        ctx.lineTo(116, 32);
        ctx.stroke();
      }

      return new THREE.CanvasTexture(canvas);
    };

    const hudConfigs = [
      { pos: [3.8, 2.2, -1.5], rot: [-0.1, -0.3, 0.05], type: 'bars' },
      { pos: [-3.6, -1.8, -1.0], rot: [0.15, 0.4, -0.1], type: 'nodes' },
      { pos: [-3.4, 2.5, -2.0], rot: [-0.2, 0.35, 0.1], type: 'wave' },
      { pos: [3.5, -2.4, -1.2], rot: [0.2, -0.35, -0.05], type: 'bars' }
    ];

    const hudPanels = [];
    hudConfigs.forEach((cfg) => {
      const tex = createHUDTexture(cfg.type);
      const hudPlaneGeo = new THREE.PlaneGeometry(1.4, 0.7);
      const hudPlaneMat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: isDark ? 0.38 : 0.28,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const panel = new THREE.Mesh(hudPlaneGeo, hudPlaneMat);
      panel.position.set(...cfg.pos);
      panel.rotation.set(...cfg.rot);
      hudGroup.add(panel);
      hudPanels.push({ mesh: panel, basePos: new THREE.Vector3(...cfg.pos) });
    });

    // --- H. 4-Point Star-Flare Sparkle Accent ---
    const createStarGeometry = () => {
      const shape = new THREE.Shape();
      const rOuter = 0.32;
      const rInner = 0.05;
      for (let i = 0; i < 8; i++) {
        const radius = i % 2 === 0 ? rOuter : rInner;
        const angle = (i * Math.PI) / 4;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();
      return new THREE.ShapeGeometry(shape);
    };

    const starGeo = createStarGeometry();
    const starMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x93c5fd : 0x3b82f6,
      transparent: true,
      opacity: isDark ? 0.8 : 0.6,
      side: THREE.DoubleSide
    });
    const sparkleStar = new THREE.Mesh(starGeo, starMat);
    sparkleStar.position.set(3.8, -2.6, 0.5);
    scene.add(sparkleStar);

    // --- I. Ambient Volumetric Dust Particles ---
    const particleCount = window.innerWidth < 768 ? 140 : 260;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const r = 3.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      dustPositions[i3] = r * Math.sin(phi) * Math.cos(theta);
      dustPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dustPositions[i3 + 2] = r * Math.cos(phi) - 2.0;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      size: isDark ? 0.038 : 0.032,
      transparent: true,
      opacity: isDark ? 0.55 : 0.4,
      fog: true
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // 6. Interaction, Resize & Scroll
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

    let targetScroll = 0;
    let currentScroll = 0;

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 7. Render Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth interpolation for scroll and cursor parallax
      currentScroll += (targetScroll - currentScroll) * 0.065;
      mouseX += (targetMouseX - mouseX) * 0.045;
      mouseY += (targetMouseY - mouseY) * 0.045;

      // Dynamic Right-to-Left and Left-to-Right Horizontal Weaving along Scroll Journey
      const swayAmplitude = window.innerWidth >= 1024 ? 2.5 : 1.1;
      const horizontalSway = Math.sin(currentScroll * Math.PI * 4.0) * swayAmplitude;
      const targetCoreX = horizontalSway + mouseX * 0.25;
      const targetCoreY = -currentScroll * 4.0 + Math.cos(elapsed * 0.5) * 0.05 - mouseY * 0.25;
      const targetCoreZ = -currentScroll * 7.0;

      // A. Dual-Axis Continuous Rotation & Scroll-Driven Rolling of Geodesic Sphere
      if (coreMasterGroup) {
        if (!prefersReducedMotion) {
          // Dynamic multi-axis rolling driven directly by scroll progress
          const scrollRollX = currentScroll * Math.PI * 4.5;
          const scrollRollY = currentScroll * Math.PI * 3.5;
          const scrollRollZ = Math.sin(currentScroll * Math.PI * 2.0) * 0.35;

          coreMasterGroup.rotation.x = scrollRollX + Math.sin(elapsed * 0.08) * 0.18 - mouseY * 0.2;
          coreMasterGroup.rotation.y = scrollRollY + elapsed * 0.12 + mouseX * 0.3;
          coreMasterGroup.rotation.z = scrollRollZ + Math.cos(elapsed * 0.06) * 0.08;

          internalCore.rotation.x = -scrollRollX * 1.2;
          internalCore.rotation.y = -scrollRollY * 1.4 - elapsed * 0.22;
          internalCore.rotation.z = elapsed * 0.15;
          kernelMesh.rotation.y = scrollRollY * 1.8 + elapsed * 0.3;
        }

        coreMasterGroup.position.set(targetCoreX, targetCoreY, targetCoreZ);

        // Subtle breathing scale
        const breath = 1.0 + Math.sin(elapsed * 1.4) * 0.02;
        const scrollScale = Math.max(0.48, 1 - currentScroll * 0.52) * breath;
        coreMasterGroup.scale.set(scrollScale, scrollScale, scrollScale);

        // Independent Staggered Pulsing on Emissive Nodes
        emissiveNodes.forEach((n) => {
          const p = 0.8 + Math.sin(elapsed * n.speed + n.phase) * 0.35;
          n.mesh.scale.setScalar(p);
          n.sprite.scale.set(0.65 * p, 0.65 * p, 1);
        });
      }

      // B. Orbiting Planetary Rings and Pucks with Scroll Acceleration
      if (ringsGroup) {
        ringsGroup.position.set(targetCoreX, targetCoreY, targetCoreZ);
        const ringScale = coreMasterGroup.scale.x;
        ringsGroup.scale.set(ringScale, ringScale, ringScale);

        if (!prefersReducedMotion) {
          orbitRing1.rotation.z = elapsed * 0.07 + currentScroll * Math.PI * 2.5;
          orbitRing1.rotation.x = Math.PI / 2.8 + Math.sin(currentScroll * Math.PI) * 0.4;
          orbitRing2.rotation.z = -elapsed * 0.09 - currentScroll * Math.PI * 2.0;
        }

        // Move satellite pucks along Ring 1 track
        satPucks.forEach((puck) => {
          const angle = elapsed * puck.speed + puck.offset;
          const currentRadius = ring1Radius;
          const localPos = new THREE.Vector3(
            Math.cos(angle) * currentRadius,
            Math.sin(angle) * currentRadius,
            0
          );
          localPos.applyEuler(orbitRing1.rotation);
          puck.mesh.position.copy(localPos);
          puck.mesh.rotation.z = angle + Math.PI / 2;
        });
      }

      // C. Floating HUD Panels Motion
      if (hudGroup) {
        hudGroup.position.set(targetCoreX, targetCoreY, targetCoreZ);
        hudPanels.forEach((p, idx) => {
          const floatOffset = Math.sin(elapsed * 1.2 + idx * 1.5) * 0.08;
          p.mesh.position.y = p.basePos.y + floatOffset;
        });
      }

      // D. Sparkle Star Twinkle Animation
      if (sparkleStar && !prefersReducedMotion) {
        sparkleStar.rotation.z = elapsed * 0.2;
        const starTwinkle = 0.7 + Math.sin(elapsed * 2.5) * 0.3;
        sparkleStar.scale.setScalar(starTwinkle);
        starMat.opacity = (isDark ? 0.75 : 0.5) * starTwinkle;
      }

      // E. Ambient Dust Parallax
      if (dustParticles && !prefersReducedMotion) {
        dustParticles.rotation.y = elapsed * 0.015;
        dustParticles.rotation.x = Math.sin(elapsed * 0.01) * 0.04;
      }

      // F. Camera Smooth Tracking following the weaving core
      camera.position.x = mouseX * 0.2 + targetCoreX * 0.15;
      camera.position.y = -currentScroll * 3.4 - mouseY * 0.2;
      camera.position.z = 8.8 - currentScroll * 2.2;
      camera.lookAt(targetCoreX * 0.2, -currentScroll * 2.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup & Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geodesicGeo.dispose();
      glassMat.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      ballJointGeo.dispose();
      ballJointMat.dispose();
      emissiveMat.dispose();
      glowSpriteMat.dispose();
      glowTexture.dispose();
      internalGeo.dispose();
      internalMat.dispose();
      kernelGeo.dispose();
      kernelMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      puckGeo.dispose();
      puckMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();

      if (renderer) renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.96 }}
    />
  );
}

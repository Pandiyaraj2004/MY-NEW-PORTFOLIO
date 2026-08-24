import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Global3DCanvas({ theme = 'dark' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDark = theme === 'dark';

    // 1. Scene & Depth Fog
    const scene = new THREE.Scene();
    const fogColor = isDark ? 0x030712 : 0xf8fafc;
    scene.fog = new THREE.FogExp2(fogColor, 0.028);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

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
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL initialization failed", e);
      return;
    }

    // 4. Lighting System (Theme Aware)
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x1e1b4b : 0xffffff,
      isDark ? 1.4 : 2.2
    );
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(
      isDark ? 0x06b6d4 : 0x2563eb,
      isDark ? 3.5 : 2.0,
      20
    );
    pointLight1.position.set(2, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(
      isDark ? 0x8b5cf6 : 0x4f46e5,
      isDark ? 3.0 : 1.8,
      20
    );
    pointLight2.position.set(-3, -2, 3);
    scene.add(pointLight2);

    // 5. MASTER ARCHITECTURAL SIGNATURE CORE
    // Represents Full-Stack System Architecture, Payment Pipelines & AI Nodes
    const masterCoreGroup = new THREE.Group();
    scene.add(masterCoreGroup);

    // --- A. System Architecture Hubs (Full-Stack Layer) ---
    // Central Gateway Hub (Central Spherical Node)
    const centralGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const centralMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0f172a : 0x312e81,
      emissive: isDark ? 0x0284c7 : 0x4338ca,
      emissiveIntensity: isDark ? 0.6 : 0.4,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true
    });
    const centralHub = new THREE.Mesh(centralGeo, centralMat);
    masterCoreGroup.add(centralHub);

    // Inner glowing kernel
    const kernelGeo = new THREE.IcosahedronGeometry(0.35, 1);
    const kernelMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.9 : 0.7
    });
    const kernelMesh = new THREE.Mesh(kernelGeo, kernelMat);
    masterCoreGroup.add(kernelMesh);

    // Distributed Service Nodes (Frontend, API Gateway, Auth, Database, ML Engine, Payment Ledger)
    const serviceNodesData = [
      { pos: [2.2, 1.1, 0.4], color: isDark ? 0x38bdf8 : 0x0284c7, size: 0.22, name: "Frontend UI" },
      { pos: [-2.0, 1.3, -0.3], color: isDark ? 0x818cf8 : 0x4f46e5, size: 0.24, name: "API Gateway" },
      { pos: [1.8, -1.5, 0.6], color: isDark ? 0x10b981 : 0x059669, size: 0.20, name: "Database Ledger" },
      { pos: [-1.7, -1.4, -0.5], color: isDark ? 0xf59e0b : 0xd97706, size: 0.22, name: "Payment Webhook" },
      { pos: [0.0, 2.3, -0.6], color: isDark ? 0xc084fc : 0x7c3aed, size: 0.25, name: "AI Inference" },
      { pos: [0.0, -2.2, 0.8], color: isDark ? 0x06b6d4 : 0x0891b2, size: 0.20, name: "Cache / RAG" }
    ];

    const serviceNodeMeshes = [];
    serviceNodesData.forEach((node) => {
      const nodeGeo = new THREE.SphereGeometry(node.size, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: isDark ? 0.7 : 0.5,
        roughness: 0.3,
        metalness: 0.7
      });
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.set(...node.pos);
      masterCoreGroup.add(mesh);
      serviceNodeMeshes.push({ mesh, basePos: new THREE.Vector3(...node.pos), color: node.color });
    });

    // --- B. Architectural Pipeline Edges (Connecting Vectors) ---
    const edgePairs = [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 3], [2, 5], [4, 5],
      // Connect to central hub
      [-1, 0], [-1, 1], [-1, 2], [-1, 3], [-1, 4], [-1, 5]
    ];

    const pipelineLineMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x6366f1 : 0x3b82f6,
      transparent: true,
      opacity: isDark ? 0.35 : 0.45
    });

    const pipelineLinePositions = [];
    edgePairs.forEach(([from, to]) => {
      const p1 = from === -1 ? new THREE.Vector3(0, 0, 0) : serviceNodeMeshes[from].basePos;
      const p2 = to === -1 ? new THREE.Vector3(0, 0, 0) : serviceNodeMeshes[to].basePos;
      pipelineLinePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    });

    const pipelineLineGeo = new THREE.BufferGeometry();
    pipelineLineGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(pipelineLinePositions, 3)
    );
    const pipelineLines = new THREE.LineSegments(pipelineLineGeo, pipelineLineMat);
    masterCoreGroup.add(pipelineLines);

    // --- C. Payment & Transaction Flow Pulses (Fintech Layer) ---
    // Emissive packets that travel along pipeline edges
    const pulseCount = 8;
    const pulseGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      transparent: true,
      opacity: 0.95
    });

    const pulses = [];
    for (let i = 0; i < pulseCount; i++) {
      const pMesh = new THREE.Mesh(pulseGeo, pulseMat);
      const edge = edgePairs[i % edgePairs.length];
      masterCoreGroup.add(pMesh);
      pulses.push({
        mesh: pMesh,
        fromIdx: edge[0],
        toIdx: edge[1],
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008
      });
    }

    // --- D. AI Synaptic Mesh Layer ---
    // Neural connection ring surrounding the architecture
    const ringGeo = new THREE.TorusGeometry(3.2, 0.025, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x8b5cf6 : 0x6366f1,
      transparent: true,
      opacity: isDark ? 0.25 : 0.35,
      wireframe: true
    });
    const neuralRing = new THREE.Mesh(ringGeo, ringMat);
    neuralRing.rotation.x = Math.PI / 3;
    masterCoreGroup.add(neuralRing);

    // --- E. Data Science & Structured Coordinate Particles ---
    const particleCount = window.innerWidth < 768 ? 200 : 380;
    const dataParticleGeo = new THREE.BufferGeometry();
    const pPosArray = new Float32Array(particleCount * 3);
    const pColorArray = new Float32Array(particleCount * 3);

    const baseCoordinates = [];
    const gridCoordinates = [];
    const neuralCoordinates = [];

    const c1 = isDark ? new THREE.Color(0x38bdf8) : new THREE.Color(0x2563eb);
    const c2 = isDark ? new THREE.Color(0x818cf8) : new THREE.Color(0x7c3aed);
    const c3 = isDark ? new THREE.Color(0x34d399) : new THREE.Color(0x059669);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;

      // 1. Ambient Volumetric Cloud
      const radius = 3.5 + Math.random() * 10;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const bx = radius * Math.sin(phi) * Math.cos(theta);
      const by = radius * Math.sin(phi) * Math.sin(theta);
      const bz = radius * Math.cos(phi) - 3;

      pPosArray[idx] = bx;
      pPosArray[idx + 1] = by;
      pPosArray[idx + 2] = bz;
      baseCoordinates.push({ x: bx, y: by, z: bz });

      // 2. Structured Data Grid Formation (SQL Table / Matrix)
      const cols = 16;
      const gx = ((i % cols) - cols / 2) * 0.7;
      const gy = (Math.floor((i % 80) / cols) - 2.5) * 0.7;
      const gz = (Math.floor(i / 80) - 2) * 1.8;
      gridCoordinates.push({ x: gx, y: gy, z: gz });

      // 3. Neural Synapse Arc Formation
      const angle = (i / particleCount) * Math.PI * 6;
      const nx = Math.cos(angle) * (3.0 + (i % 5) * 0.3);
      const ny = Math.sin(angle) * (2.2 + (i % 5) * 0.2);
      const nz = (i / particleCount) * -10 + 2;
      neuralCoordinates.push({ x: nx, y: ny, z: nz });

      // Palette coloring
      const t = Math.random();
      const col = t < 0.5 ? c1.clone().lerp(c2, t * 2) : c2.clone().lerp(c3, (t - 0.5) * 2);
      pColorArray[idx] = col.r;
      pColorArray[idx + 1] = col.g;
      pColorArray[idx + 2] = col.b;
    }

    dataParticleGeo.setAttribute('position', new THREE.BufferAttribute(pPosArray, 3));
    dataParticleGeo.setAttribute('color', new THREE.BufferAttribute(pColorArray, 3));

    const dataParticleMat = new THREE.PointsMaterial({
      size: isDark ? 0.075 : 0.065,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.75 : 0.65,
      fog: true
    });
    const dataParticles = new THREE.Points(dataParticleGeo, dataParticleMat);
    scene.add(dataParticles);

    // 6. Interaction & Reactivity State
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

      // Smooth interpolation for scroll and mouse parallax
      currentScroll += (targetScroll - currentScroll) * 0.07;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // A. Multi-Axis Idle Rotation of Master Core
      if (masterCoreGroup) {
        if (!prefersReducedMotion) {
          masterCoreGroup.rotation.y = elapsed * 0.12 + mouseX * 0.3;
          masterCoreGroup.rotation.x = Math.sin(elapsed * 0.08) * 0.15 - mouseY * 0.2;
          masterCoreGroup.rotation.z = Math.cos(elapsed * 0.06) * 0.08;

          kernelMesh.rotation.y = -elapsed * 0.3;
          kernelMesh.rotation.z = elapsed * 0.2;
          neuralRing.rotation.z = elapsed * 0.05;
        }

        // Spatial Handoff on Scroll:
        // Hero: Center and prominent
        // Mid sections: Drifts and scales to frame content
        // Later sections: Recedes gracefully into ambient backdrop
        masterCoreGroup.position.x = Math.sin(currentScroll * Math.PI) * 1.8 + mouseX * 0.3;
        masterCoreGroup.position.y = -currentScroll * 4.5 + Math.cos(elapsed * 0.8) * 0.08 - mouseY * 0.3;
        masterCoreGroup.position.z = -currentScroll * 8.0;

        // Core opacity and scale modulation
        const coreScale = Math.max(0.45, 1 - currentScroll * 0.55);
        masterCoreGroup.scale.set(coreScale, coreScale, coreScale);

        // Breathing Node Light Pulsation
        const breath = 0.85 + Math.sin(elapsed * 2.0) * 0.15;
        centralMat.emissiveIntensity = (isDark ? 0.6 : 0.4) * breath;

        serviceNodeMeshes.forEach((node, i) => {
          const nodePulse = 0.8 + Math.sin(elapsed * 2.5 + i * 1.2) * 0.2;
          node.mesh.scale.set(nodePulse, nodePulse, nodePulse);
        });
      }

      // B. Update Payment & Transaction Pulses (Fintech Layer)
      pulses.forEach((pulse) => {
        // Accelerate pulse speed when scrolling past payments/fintech sections
        const isFintechSection = currentScroll >= 0.4 && currentScroll <= 0.75;
        const activeSpeed = isFintechSection ? pulse.speed * 2.2 : pulse.speed;

        pulse.progress = (pulse.progress + activeSpeed) % 1.0;

        const p1 = pulse.fromIdx === -1 ? new THREE.Vector3(0, 0, 0) : serviceNodeMeshes[pulse.fromIdx].basePos;
        const p2 = pulse.toIdx === -1 ? new THREE.Vector3(0, 0, 0) : serviceNodeMeshes[pulse.toIdx].basePos;

        pulse.mesh.position.lerpVectors(p1, p2, pulse.progress);
        pulse.mesh.scale.setScalar(isFintechSection ? 1.4 : 1.0);
      });

      // C. Morph Data Particles Across Scroll Journey Phases
      const positions = dataParticleGeo.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const base = baseCoordinates[i];
        const grid = gridCoordinates[i];
        const neural = neuralCoordinates[i];

        let targetX = base.x;
        let targetY = base.y;
        let targetZ = base.z;

        if (currentScroll < 0.25) {
          // Phase 1 (Hero / About): Ambient Organic Fluid
          targetX = base.x + Math.sin(elapsed * 0.4 + i * 0.1) * 0.15;
          targetY = base.y + Math.cos(elapsed * 0.4 + i * 0.1) * 0.15;
          targetZ = base.z;
        } else if (currentScroll < 0.55) {
          // Phase 2 (Education, Skills, Data Science): Structured 3D SQL / Matrix Grid
          const weight = (currentScroll - 0.25) / 0.3;
          const wave = Math.sin(elapsed * 1.5 + (i % 16) * 0.4) * 0.25;
          targetX = THREE.MathUtils.lerp(base.x, grid.x, weight);
          targetY = THREE.MathUtils.lerp(base.y, grid.y + wave, weight);
          targetZ = THREE.MathUtils.lerp(base.z, grid.z, weight);
        } else if (currentScroll < 0.8) {
          // Phase 3 (Payments, Projects, AI): Neural Synapse Arc
          const weight = (currentScroll - 0.55) / 0.25;
          const pulseWave = Math.cos(elapsed * 1.2 + i * 0.2) * 0.3;
          targetX = THREE.MathUtils.lerp(grid.x, neural.x, weight);
          targetY = THREE.MathUtils.lerp(grid.y, neural.y + pulseWave, weight);
          targetZ = THREE.MathUtils.lerp(grid.z, neural.z, weight);
        } else {
          // Phase 4 (Strengths, Certs, Horizon, Contact): Expansive Cosmic Horizon
          targetX = base.x * 1.3 + Math.sin(elapsed * 0.3 + i * 0.1) * 0.3;
          targetY = base.y * 1.3 + Math.cos(elapsed * 0.3 + i * 0.1) * 0.3;
          targetZ = base.z * 1.2;
        }

        // Smooth physical convergence
        positions[idx] += (targetX - positions[idx]) * 0.06;
        positions[idx + 1] += (targetY - positions[idx + 1]) * 0.06;
        positions[idx + 2] += (targetZ - positions[idx + 2]) * 0.06;
      }
      dataParticleGeo.attributes.position.needsUpdate = true;

      // D. Camera Drift and Focus
      camera.position.x = Math.sin(currentScroll * Math.PI * 0.8) * 1.2 + mouseX * 0.4;
      camera.position.y = -currentScroll * 3.8 - mouseY * 0.3;
      camera.position.z = 9.0 - currentScroll * 3.0;
      camera.lookAt(0, -currentScroll * 2.8, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Proper Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Geometries & Materials
      centralGeo.dispose();
      centralMat.dispose();
      kernelGeo.dispose();
      kernelMat.dispose();
      pipelineLineGeo.dispose();
      pipelineLineMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      dataParticleGeo.dispose();
      dataParticleMat.dispose();

      serviceNodeMeshes.forEach((node) => {
        node.mesh.geometry.dispose();
        node.mesh.material.dispose();
      });

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

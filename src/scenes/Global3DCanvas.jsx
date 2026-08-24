import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Global3DCanvas({ theme = 'dark' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDark = theme === 'dark';

    // 1. Scene & Deep Atmosphere Fog
    const scene = new THREE.Scene();
    // Deep navy/near-black in dark mode, clean warm slate in light mode
    const fogColor = isDark ? 0x040814 : 0xf8fafc;
    scene.fog = new THREE.FogExp2(fogColor, 0.024);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.5);

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
      renderer.toneMappingExposure = isDark ? 1.1 : 1.0;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL initialization failed", e);
      return;
    }

    // 4. Dramatic Directional & Ambient Lighting
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x0f172a : 0xffffff,
      isDark ? 1.6 : 2.4
    );
    scene.add(ambientLight);

    // Key Light from upper right side giving dramatic 3D shadows and specular highlights
    const keyLight = new THREE.DirectionalLight(
      isDark ? 0x38bdf8 : 0x3b82f6,
      isDark ? 2.8 : 1.8
    );
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    // Subtle Cyan/Teal Rim Point Light
    const rimLight = new THREE.PointLight(
      isDark ? 0x06b6d4 : 0x0284c7,
      isDark ? 3.2 : 2.0,
      25
    );
    rimLight.position.set(-4, -3, 3);
    scene.add(rimLight);

    // Secondary Violet Core Light
    const coreLight = new THREE.PointLight(
      isDark ? 0x8b5cf6 : 0x6366f1,
      isDark ? 2.5 : 1.5,
      15
    );
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // 5. MASTER 3D GEODESIC FACETED SPHERE OBJECT
    const coreMasterGroup = new THREE.Group();
    scene.add(coreMasterGroup);

    // Base Geodesic Sphere Geometry (Detail level 2 for optimal faceted triangulated lattice)
    const sphereRadius = 2.1;
    const geodesicGeo = new THREE.IcosahedronGeometry(sphereRadius, 2);

    // Extract unique vertices for nodes and traversal
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

    // --- A. Translucent Dark Glass / Faceted Panels ---
    // Creates the semi-solid faceted glass gem look from reference
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x0a1628 : 0xe0e7ff,
      emissive: isDark ? 0x03213a : 0x312e81,
      emissiveIntensity: isDark ? 0.35 : 0.15,
      roughness: 0.15,
      metalness: 0.6,
      transmission: 0.45,
      transparent: true,
      opacity: isDark ? 0.28 : 0.32,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const glassMesh = new THREE.Mesh(geodesicGeo, glassMat);
    coreMasterGroup.add(glassMesh);

    // --- B. Crisp Glowing Triangulated Lattice Edges ---
    const wireframeGeo = new THREE.WireframeGeometry(geodesicGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x2563eb,
      transparent: true,
      opacity: isDark ? 0.42 : 0.55
    });
    const latticeLines = new THREE.LineSegments(wireframeGeo, wireframeMat);
    coreMasterGroup.add(latticeLines);

    // --- C. Glowing Emissive Nodes (Teal / Cyan) at Lattice Junctions ---
    // Prominent Anchor Nodes (Varying in scale and brightness)
    const anchorIndices = [0, 4, 11, 15, 22, 28, 35, 42, 50, 58];
    const anchorNodes = [];

    const anchorNodeMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x22d3ee : 0x0284c7,
      emissive: isDark ? 0x06b6d4 : 0x2563eb,
      emissiveIntensity: isDark ? 1.4 : 0.8,
      roughness: 0.2,
      metalness: 0.8
    });

    anchorIndices.forEach((idx, i) => {
      if (idx < uniqueVertices.length) {
        const v = uniqueVertices[idx];
        const size = (i % 3 === 0 ? 0.085 : 0.06) * (1 + (i % 2) * 0.2);
        const nodeGeo = new THREE.SphereGeometry(size, 16, 16);
        const nodeMesh = new THREE.Mesh(nodeGeo, anchorNodeMat);
        nodeMesh.position.copy(v);
        coreMasterGroup.add(nodeMesh);
        anchorNodes.push({ mesh: nodeMesh, baseScale: size, phase: i * 0.7 });
      }
    });

    // Secondary Minor Junction Dots (Instanced points cloud on all vertices)
    const junctionGeo = new THREE.BufferGeometry();
    const junctionPositions = new Float32Array(uniqueVertices.length * 3);
    for (let i = 0; i < uniqueVertices.length; i++) {
      junctionPositions[i * 3] = uniqueVertices[i].x;
      junctionPositions[i * 3 + 1] = uniqueVertices[i].y;
      junctionPositions[i * 3 + 2] = uniqueVertices[i].z;
    }
    junctionGeo.setAttribute('position', new THREE.BufferAttribute(junctionPositions, 3));

    const junctionMat = new THREE.PointsMaterial({
      color: isDark ? 0x38bdf8 : 0x1d4ed8,
      size: isDark ? 0.045 : 0.04,
      transparent: true,
      opacity: isDark ? 0.85 : 0.75
    });
    const junctionPoints = new THREE.Points(junctionGeo, junctionMat);
    coreMasterGroup.add(junctionPoints);

    // --- D. Thin Planetary Orbiting Ring ---
    // Encircling the faceted sphere at an offset planetary angle
    const ringRadius = 3.35;
    const ringGeo = new THREE.TorusGeometry(ringRadius, 0.016, 16, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x06b6d4 : 0x4338ca,
      transparent: true,
      opacity: isDark ? 0.45 : 0.55
    });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 2.7;
    orbitRing.rotation.y = Math.PI / 8;
    scene.add(orbitRing);

    // Faint dashed satellite companion track on the ring
    const satMarkerGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const satMarkerMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x2563eb
    });
    const satelliteMarker = new THREE.Mesh(satMarkerGeo, satMarkerMat);
    scene.add(satelliteMarker);

    // --- E. Internal AI/ML Breathing Core ---
    const innerCoreGeo = new THREE.OctahedronGeometry(0.7, 1);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x8b5cf6 : 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.35
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreMasterGroup.add(innerCoreMesh);

    // --- F. Payment / Fintech Flow Pulse ---
    // A single clean light pulse traveling along specific geodesic lattice edges
    const pulseTrailGeo = new THREE.SphereGeometry(0.065, 12, 12);
    const pulseTrailMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x22d3ee : 0x0284c7,
      transparent: true,
      opacity: 0.95
    });
    const paymentPulse = new THREE.Mesh(pulseTrailGeo, pulseTrailMat);
    coreMasterGroup.add(paymentPulse);

    // Sequence of connected vertices for smooth continuous loop traversal
    const pathIndices = [0, 4, 12, 28, 35, 42, 50, 22, 15, 11, 0];
    let pulseSegmentProgress = 0;
    let currentPathIndex = 0;

    // --- G. Soft Ambient Depth Particles ---
    // Scattered behind and around the sphere for depth & volume parallax
    const ambientParticleCount = window.innerWidth < 768 ? 160 : 280;
    const ambientGeo = new THREE.BufferGeometry();
    const ambientPosArray = new Float32Array(ambientParticleCount * 3);

    for (let i = 0; i < ambientParticleCount; i++) {
      const i3 = i * 3;
      const r = 4.0 + Math.random() * 9.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      ambientPosArray[i3] = r * Math.sin(phi) * Math.cos(theta);
      ambientPosArray[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      ambientPosArray[i3 + 2] = r * Math.cos(phi) - 2.5;
    }

    ambientGeo.setAttribute('position', new THREE.BufferAttribute(ambientPosArray, 3));
    const ambientMat = new THREE.PointsMaterial({
      color: isDark ? 0x38bdf8 : 0x3b82f6,
      size: isDark ? 0.038 : 0.032,
      transparent: true,
      opacity: isDark ? 0.45 : 0.35,
      fog: true
    });
    const ambientParticles = new THREE.Points(ambientGeo, ambientMat);
    scene.add(ambientParticles);

    // 6. Interaction & Scroll Reactivity
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

    // 7. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth interpolation for scroll and cursor parallax
      currentScroll += (targetScroll - currentScroll) * 0.065;
      mouseX += (targetMouseX - mouseX) * 0.045;
      mouseY += (targetMouseY - mouseY) * 0.045;

      // A. Dual-Axis Idle Rotation of the Core
      if (coreMasterGroup) {
        if (!prefersReducedMotion) {
          coreMasterGroup.rotation.y = elapsed * 0.14 + mouseX * 0.35;
          coreMasterGroup.rotation.x = Math.sin(elapsed * 0.09) * 0.2 - mouseY * 0.25;
          coreMasterGroup.rotation.z = Math.cos(elapsed * 0.07) * 0.06;

          innerCoreMesh.rotation.y = -elapsed * 0.25;
          innerCoreMesh.rotation.z = elapsed * 0.18;
        }

        // Spatial Drift on Scroll (Drifts gracefully down & back to frame section content)
        coreMasterGroup.position.x = Math.sin(currentScroll * Math.PI) * 1.6 + mouseX * 0.25;
        coreMasterGroup.position.y = -currentScroll * 4.2 + Math.cos(elapsed * 0.6) * 0.06 - mouseY * 0.25;
        coreMasterGroup.position.z = -currentScroll * 7.5;

        // Subtle scale transition across page depth
        const sphereScale = Math.max(0.48, 1 - currentScroll * 0.52);
        coreMasterGroup.scale.set(sphereScale, sphereScale, sphereScale);

        // Breathing Pulse on Anchor Nodes (opacity/intensity)
        anchorNodes.forEach((node) => {
          const pulse = 0.85 + Math.sin(elapsed * 2.2 + node.phase) * 0.2;
          node.mesh.scale.setScalar(pulse);
        });

        // AI Inner Core Breathing
        const coreBreath = 0.35 + Math.sin(elapsed * 1.8) * 0.15;
        innerCoreMat.opacity = isDark ? coreBreath : coreBreath * 0.8;
      }

      // B. Independent Planetary Ring Rotation & Satellite Motion
      if (orbitRing) {
        if (!prefersReducedMotion) {
          orbitRing.rotation.z = elapsed * 0.08;
          orbitRing.rotation.x = Math.PI / 2.7 + Math.sin(elapsed * 0.05) * 0.08;
        }

        orbitRing.position.copy(coreMasterGroup.position);
        orbitRing.scale.copy(coreMasterGroup.scale);

        // Satellite position along the orbit ring
        const satAngle = elapsed * 0.35;
        const currentRingRadius = ringRadius * coreMasterGroup.scale.x;
        const satLocal = new THREE.Vector3(
          Math.cos(satAngle) * currentRingRadius,
          Math.sin(satAngle) * currentRingRadius,
          0
        );
        satLocal.applyEuler(orbitRing.rotation);
        satelliteMarker.position.copy(coreMasterGroup.position).add(satLocal);
        satelliteMarker.scale.copy(coreMasterGroup.scale);
      }

      // C. Payment & Transaction Flow Pulse Traversal
      if (uniqueVertices.length > 0) {
        const fromIdx = pathIndices[currentPathIndex % pathIndices.length];
        const toIdx = pathIndices[(currentPathIndex + 1) % pathIndices.length];

        const isPaymentSection = currentScroll >= 0.35 && currentScroll <= 0.7;
        const pulseSpeed = isPaymentSection ? 0.035 : 0.016;

        pulseSegmentProgress += pulseSpeed;

        if (pulseSegmentProgress >= 1.0) {
          pulseSegmentProgress = 0;
          currentPathIndex = (currentPathIndex + 1) % pathIndices.length;
        }

        if (fromIdx < uniqueVertices.length && toIdx < uniqueVertices.length) {
          paymentPulse.position.lerpVectors(
            uniqueVertices[fromIdx],
            uniqueVertices[toIdx],
            pulseSegmentProgress
          );
        }
      }

      // D. Slow Ambient Particle Parallax
      if (ambientParticles && !prefersReducedMotion) {
        ambientParticles.rotation.y = elapsed * 0.02;
        ambientParticles.rotation.x = Math.sin(elapsed * 0.015) * 0.05;
      }

      // E. Camera Framing
      camera.position.x = Math.sin(currentScroll * Math.PI * 0.75) * 1.1 + mouseX * 0.3;
      camera.position.y = -currentScroll * 3.5 - mouseY * 0.25;
      camera.position.z = 8.5 - currentScroll * 2.5;
      camera.lookAt(0, -currentScroll * 2.6, 0);

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
      anchorNodeMat.dispose();
      junctionGeo.dispose();
      junctionMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      satMarkerGeo.dispose();
      satMarkerMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      pulseTrailGeo.dispose();
      pulseTrailMat.dispose();
      ambientGeo.dispose();
      ambientMat.dispose();

      anchorNodes.forEach((n) => {
        n.mesh.geometry.dispose();
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

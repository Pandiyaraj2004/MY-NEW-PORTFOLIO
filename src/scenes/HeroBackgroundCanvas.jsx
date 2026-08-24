import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroBackgroundCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    // Group for mouse interaction
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Icosahedron Wireframe Structure
    const icoGeometry = new THREE.IcosahedronGeometry(10, 2);
    const icoWireframe = new THREE.WireframeGeometry(icoGeometry);
    const icoLineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });
    const icoMesh = new THREE.LineSegments(icoWireframe, icoLineMaterial);
    mainGroup.add(icoMesh);

    // 2. Inner Concentric Ring
    const innerRingGeo = new THREE.TorusGeometry(6, 0.08, 16, 100);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 3;
    mainGroup.add(innerRing);

    // 3. Floating Orbital Ring
    const outerRingGeo = new THREE.TorusGeometry(14, 0.05, 16, 120);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.25,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.y = Math.PI / 4;
    mainGroup.add(outerRing);

    // 4. Background Particle Field
    const particleCount = window.innerWidth < 768 ? 400 : 900;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 90;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 90;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      particleScales[i] = Math.random() * 2 + 0.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.35,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (e.clientX / innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      mainGroup.rotation.y = elapsedTime * 0.08 + currentMouseX * 0.5;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.05) * 0.2 - currentMouseY * 0.4;
      mainGroup.rotation.z = Math.cos(elapsedTime * 0.06) * 0.1;

      innerRing.rotation.z = elapsedTime * 0.2;
      outerRing.rotation.x = elapsedTime * 0.12;

      particles.rotation.y = -elapsedTime * 0.02 + currentMouseX * 0.1;
      particles.rotation.x = Math.sin(elapsedTime * 0.01) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeometry.dispose();
      icoLineMaterial.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
      aria-hidden="true"
    />
  );
}

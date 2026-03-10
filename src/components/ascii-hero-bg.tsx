"use client";

import React, { useRef, useEffect, useState } from "react";

export default function ParticleHeroBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let animFrameId: number;
    let renderer: any;
    let controls: any;

    const init = async () => {
      try {
        // Skip loading Three.js if user prefers reduced motion
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        // Only initialize Three.js if container is in viewport
        if (!containerRef.current) return;

        const THREE = await import("three");
        const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
        const { PCDLoader } = await import("three/addons/loaders/PCDLoader.js");

        const isMobile = window.innerWidth < 768;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
          45,
          containerRef.current!.clientWidth / containerRef.current!.clientHeight,
          0.1,
          1000
        );
        camera.position.set(0.0, 0.08, 0.48);

        renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: "low-power" });
        renderer.setSize(
          containerRef.current!.clientWidth,
          containerRef.current!.clientHeight
        );
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
        containerRef.current!.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xfff5e1, 0.6);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xff7f50, 0.8);
        directionalLight.position.set(5, 10, 5);
        scene.add(directionalLight);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enabled = false;
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = false;

        const createFallback = () => {
          const isMobile = window.innerWidth < 768;
          const particleCount = isMobile ? 4000 : 12000;
          const positions = new Float32Array(particleCount * 3);
          const colors = new Float32Array(particleCount * 3);
          const orangeColor = new THREE.Color(0xe67e22);

          for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const radius = 0.35 + Math.random() * 0.08;
            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);
            colors[i3] = orangeColor.r;
            colors[i3 + 1] = orangeColor.g;
            colors[i3 + 2] = orangeColor.b;
          }

          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
          geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

          const material = new THREE.PointsMaterial({
            size: 0.005,
            vertexColors: true,
            transparent: true,
            opacity: 0.25,
            sizeAttenuation: true,
          });

          const particles = new THREE.Points(geometry, material);
          scene.add(particles);
        };

        const loader = new PCDLoader();
        loader.load(
          "https://threejs.org/examples/models/pcd/binary/Zaghetto.pcd",
          (points: any) => {
            points.geometry.center();
            points.geometry.rotateX(Math.PI);
            points.material.size = 0.004;
            points.material.color.setHex(0xe67e22);
            points.material.transparent = true;
            points.material.opacity = 0.25;
            scene.add(points);
          },
          undefined,
          () => {
            console.warn("PCD model failed to load, using fallback particles");
            createFallback();
          }
        );

        const handleResize = () => {
          const width = containerRef.current?.clientWidth || 1;
          const height = containerRef.current?.clientHeight || 1;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };
        window.addEventListener("resize", handleResize);

        const animate = () => {
          animFrameId = requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();

        return () => {
          window.removeEventListener("resize", handleResize);
          cancelAnimationFrame(animFrameId);

          // Properly dispose geometries and materials
          scene.traverse((obj: any) => {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
              if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
              else obj.material.dispose();
            }
          });

          controls.dispose();
          renderer.dispose();
          if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
            containerRef.current.removeChild(renderer.domElement);
          }
        };
      } catch (e) {
        console.warn("Three.js failed to load:", e);
      }
    };

    const cleanup = init();

    return () => {
      cleanup?.then((fn) => fn?.());
      cancelAnimationFrame(animFrameId);
    };
  }, [mounted]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: "transparent", touchAction: "none" }}
    />
  );
}

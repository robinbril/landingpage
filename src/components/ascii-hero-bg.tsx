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
        const THREE = await import("three");
        const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
        const { PCDLoader } = await import("three/addons/loaders/PCDLoader.js");

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xfdf2e9);

        const camera = new THREE.PerspectiveCamera(
          30,
          containerRef.current!.clientWidth / containerRef.current!.clientHeight,
          0.1,
          1000
        );
        camera.position.set(0.15, 0.05, 2);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize(
          containerRef.current!.clientWidth,
          containerRef.current!.clientHeight
        );
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current!.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xfff5e1, 0.6);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xff7f50, 0.8);
        directionalLight.position.set(5, 10, 5);
        scene.add(directionalLight);

        // OrbitControls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 0.5;
        controls.maxDistance = 10;
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.8;

        // Fallback: create sphere particles if PCD fails
        const createFallback = () => {
          const particleCount = 10000;
          const positions = new Float32Array(particleCount * 3);
          const colors = new Float32Array(particleCount * 3);
          const orangeColor = new THREE.Color(0xe67e22);

          for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const radius = 0.4 + Math.random() * 0.1;
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
            size: 0.004,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
          });

          const particles = new THREE.Points(geometry, material);
          scene.add(particles);
        };

        // Load PCD 3D face model
        const loader = new PCDLoader();
        loader.load(
          "https://threejs.org/examples/models/pcd/binary/Zaghetto.pcd",
          (points: any) => {
            points.geometry.center();
            points.geometry.rotateX(Math.PI);
            points.material.size = 0.0025;
            points.material.color.setHex(0xe67e22);
            points.material.transparent = true;
            points.material.opacity = 0.55;
            scene.add(points);
          },
          undefined,
          () => {
            console.warn("PCD model failed to load, using fallback particles");
            createFallback();
          }
        );

        // Handle resize
        const handleResize = () => {
          const width = containerRef.current?.clientWidth || 1;
          const height = containerRef.current?.clientHeight || 1;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };
        window.addEventListener("resize", handleResize);

        // Animation loop
        const animate = () => {
          animFrameId = requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();

        return () => {
          window.removeEventListener("resize", handleResize);
          cancelAnimationFrame(animFrameId);
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
      className="absolute inset-0 w-full h-full"
      style={{ background: "#fdf2e9" }}
    />
  );
}

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import vertexShader from "../shaders/vertexShader.glsl?raw";
import fragmentShader from "../shaders/fragmentShader.glsl?raw";
import { generatePoints } from "../utils/generatePoints";
import { pointer, updatePointer } from "../utils/pointer";

const MODEL_URL = "/models/my-portrait.glb";
const FRONT_URL = "/textures/front-tone.jpg";
const SIDE_URL = "/textures/side-tone.jpg";
const INTRO_SECONDS = 3.6;

useGLTF.preload(MODEL_URL);

/**
 * The portrait: ~66k points sampled on the reconstructed GLB surface and drawn
 * with a custom ShaderMaterial. Everything that changes per frame is a uniform
 * mutated inside useFrame — React never re-renders for animation.
 */
export default function ParticlePortrait({ count, play, reducedMotion, onReady }) {
  const gltf = useGLTF(MODEL_URL);
  const frontImg = useLoader(THREE.ImageLoader, FRONT_URL);
  const sideImg = useLoader(THREE.ImageLoader, SIDE_URL);
  const { size, gl } = useThree();
  const startRef = useRef(null);
  const matRef = useRef();

  const geometry = useMemo(() => {
    let source = null;
    gltf.scene.traverse((o) => {
      if (!source && o.isMesh) source = o.geometry;
    });
    if (!source) throw new Error("my-portrait.glb contains no mesh");
    return generatePoints({ geometry: source, frontImg, sideImg, count });
  }, [gltf, frontImg, sideImg, count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uViewH: { value: 800 },
          uAspect: { value: 1 },
          uSize: { value: 0.0046 },
          uMouse: { value: new THREE.Vector2(10, 10) },
          uMouseActive: { value: 0 },
          uRadius: { value: 0.3 },
          uStrength: { value: 0.16 },
          uMotion: { value: 1 },
          uOpacity: { value: 0.5 },
          uColorLow: { value: new THREE.Color("#6f7dff") },
          uColorHigh: { value: new THREE.Color("#dff8ff") },
          uRimColor: { value: new THREE.Color("#b855ff") },
          uLightColor: { value: new THREE.Color("#00f5ff") },
        },
      }),
    []
  );

  useEffect(() => {
    matRef.current = material;
    onReady?.();
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material, onReady]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    updatePointer(t, Math.min(dt, 0.05));

    if (play && startRef.current === null) startRef.current = t + 0.25;
    let progress = 0;
    if (startRef.current !== null) {
      progress = reducedMotion ? 1 : Math.min(Math.max((t - startRef.current) / INTRO_SECONDS, 0), 1);
    }

    const u = material.uniforms;
    u.uTime.value = t;
    u.uProgress.value = progress;
    u.uViewH.value = size.height * gl.getPixelRatio();
    u.uAspect.value = size.width / size.height;
    u.uMouse.value.set(pointer.sx, pointer.sy);
    u.uMouseActive.value = reducedMotion ? 0 : pointer.active;
    u.uMotion.value = reducedMotion ? 0.25 : 1;
    const small = size.width < 768;
    u.uRadius.value = small ? 0.15 : 0.3;     // cursor reach, as a fraction of screen height
    u.uStrength.value = small ? 0.09 : 0.16;
    // slightly larger points on small screens so the portrait stays solid
    u.uSize.value = (size.width < 768 ? 0.0066 : 0.0046) * (66000 / count) ** 0.35;
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}

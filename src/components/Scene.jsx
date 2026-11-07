import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import ParticlePortrait from "./ParticlePortrait";
import CursorGlow from "./CursorGlow";
import { attachPointer, pointer } from "../utils/pointer";

/**
 * Positions the bust for the current viewport (right-hand side on desktop,
 * upper half on phones), keeps the camera distance so the head always fits, and
 * rotates the head gently towards the cursor.
 */
function Rig({ children }) {
  const group = useRef();
  const { camera, size } = useThree();

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const aspect = size.width / size.height;
    const mobile = size.width < 768;
    const tanHalf = Math.tan((camera.fov * Math.PI) / 360);

    // Visible portrait window (world units): top of hair .. upper chest.
    const wantH = mobile ? 2.3 : 2.45;
    const wantW = mobile ? 1.85 : 1.6;
    const dist = Math.max(wantH / (2 * tanHalf), wantW / (2 * tanHalf * aspect));
    camera.position.z += (dist - camera.position.z) * (1 - Math.exp(-dt * 6));

    const viewH = 2 * tanHalf * camera.position.z;
    const viewW = viewH * aspect;
    const targetX = mobile ? 0 : viewW * 0.21;
    const targetY = mobile ? -0.02 : -0.12;
    g.position.x += (targetX - g.position.x) * (1 - Math.exp(-dt * 6));
    g.position.y += (targetY - g.position.y) * (1 - Math.exp(-dt * 6));

    // Head follows the cursor, measured from the portrait's own screen position.
    const ndcCenterX = viewW > 0 ? (g.position.x / viewW) * 2 : 0;
    const k = 1 - Math.exp(-dt * 4);
    const ry = Math.max(-0.5, Math.min(0.5, (pointer.sx - ndcCenterX) * 0.32)) * (0.4 + 0.6 * pointer.active);
    const rx = -pointer.sy * 0.11 * (0.4 + 0.6 * pointer.active);
    g.rotation.y += (ry - g.rotation.y) * k;
    g.rotation.x += (rx - g.rotation.x) * k;
  });

  return <group ref={group}>{children}</group>;
}

export default function Scene({ count, play, active, reducedMotion, onReady }) {
  const wrapRef = useRef(null);
  const [dprMax, setDprMax] = useState(() => (window.innerWidth < 768 ? 1.5 : 2));

  useEffect(() => attachPointer(() => wrapRef.current?.getBoundingClientRect()), []);

  return (
    <div ref={wrapRef} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, dprMax]}
        camera={{ fov: 30, position: [0, 0, 6], near: 0.1, far: 40 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <PerformanceMonitor onDecline={() => setDprMax(1)} />
        <CursorGlow />
        <Suspense fallback={null}>
          <Rig>
            <ParticlePortrait count={count} play={play} reducedMotion={reducedMotion} onReady={onReady} />
          </Rig>
        </Suspense>
      </Canvas>
    </div>
  );
}

import { COLORS } from "../theme";

/** Detect WebGL support without throwing. */
export function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Static portrait for devices that cannot run WebGL (or if the 3D asset fails
 * to load): the clay reference photo in the same cyan/violet ring as the
 * original portfolio avatar.
 */
export default function WebGLFallback({ compact = false }) {
  const s = compact ? 240 : 340;
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: compact ? "center" : "flex-end", paddingRight: compact ? 0 : "8%" }}>
      <div style={{ position: "relative", width: s, height: s }}>
        <div style={{ position: "absolute", inset: -3, borderRadius: "50%", background: "linear-gradient(135deg, #00f5ff, #b855ff, #4f8ef7)", animation: "spin 8s linear infinite" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", background: COLORS.dark }}>
          <img
            src="/textures/front-tone.jpg"
            alt="Othmane Hamadellah — clay portrait"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 12%", filter: "grayscale(1) contrast(1.1) brightness(0.85)", mixBlendMode: "screen", opacity: 0.9 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,245,255,0.18), rgba(184,85,255,0.18))", mixBlendMode: "color" }} />
        </div>
      </div>
    </div>
  );
}

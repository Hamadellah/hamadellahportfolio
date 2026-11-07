# Othmane Hamadellah — Interactive 3D Particle Portfolio

React + Vite + Three.js + React Three Fiber. The hero is a ~66,000-particle portrait of you
that assembles on load, glows under the cursor, pushes particles away from it and turns its head
towards it. All sections of the original portfolio (`all.jsx`) are kept.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

Needs Node 18+. Try `http://localhost:5173/?particles=100000` to test other particle counts.

## Two things you need to add

1. **Your CV** → `public/othmane-cv.pdf` (the "Download CV" buttons point to `/othmane-cv.pdf`).
2. Nothing else. The original `othmane12.webp`, `othmane-photo.jpg` and `othmane-bg.mp4` were not
   supplied, and the particle portrait replaces them (see "What changed").

## How the 3D portrait is made (and what it is not)

No image-to-3D service was available while building this, so **this is not an AI-generated
mesh**. It is a local, two-view reconstruction from `assets/front-view.png` and
`assets/side-view.png` — `tools/reconstruct.py`:

1. Both views are aligned on shared landmarks (hair top, eyes, mouth, chin, bust base).
2. For each height, the front silhouette gives the width and the side silhouette gives the depth
   (nose, lips, chin, back of the head, shoulders). Each row is a superellipse in that box.
3. The rows are meshed with marching cubes → `public/models/my-portrait.glb`.
4. Both clay photos are saved as tone maps (`public/textures/*-tone.jpg`). In the browser every
   particle samples them, so the real eyes, brows, lips and hair curls appear on the surface.

Result: your real proportions, profile and hairstyle, but a smoothed head shape. Fine geometry
(individual curls, ears, nostrils) comes from the photo tones, not from geometry, so it is best seen
within roughly ±30° of the front. Head rotation is limited for that reason.

Re-run after changing the images: `npm run reconstruct`
(needs `pip install numpy scipy opencv-python scikit-image trimesh`).

**For a true mesh**: generate a GLB from the two images with an image-to-3D tool (Meshy, Tripo,
Rodin, Hunyuan3D …), put it at `public/models/my-portrait.glb` (head at the origin, ~2 units tall,
face towards +Z), and update `src/data/portrait-meta.json` / `src/utils/generatePoints.js` if you
want to bake colour from the mesh instead of projecting the two photos.

## Interactions (src/shaders/vertexShader.glsl)

| Effect | Where |
| --- | --- |
| Intro: scattered cloud → portrait, staggered | `uProgress`, `INTRO_SECONDS` in `ParticlePortrait.jsx` |
| Cursor push + soft attraction ring | `uRadius`, `uStrength` |
| Cursor light + glow | `vLight` (vertex/fragment), `CursorGlow.jsx` |
| Head follows cursor | `Rig` in `Scene.jsx` |
| Breathing / floating (never static) | `uMotion` |
| Touch screens | a ghost cursor drifts over the portrait when idle (`utils/pointer.js`) |

## Performance and fallbacks

- One `THREE.Points` draw call; `BufferGeometry` + `ShaderMaterial`; all animation lives in uniforms (no React re-renders).
- Particle budget by device: 66k desktop, 48k on weaker desktops, 30–40k on phones.
- DPR capped (2 desktop, 1.5 mobile) and dropped to 1 by `PerformanceMonitor` if frames are slow.
- Render loop pauses when the hero is off-screen.
- `prefers-reduced-motion`: no intro, minimal idle motion, no cursor push.
- No WebGL, or the GLB fails to load: the static clay portrait in the original avatar ring is shown.
- Loader uses real byte progress from the three.js loaders.

## What changed from all.jsx

All content (text, projects, skills, education, services, contact details) is unchanged and split
into components under `src/components/`. The hero avatar photo is replaced by the particle portrait.
I removed the full-page video backdrop and the code-rain canvas (and the unused photo import): they
competed with the portrait and need assets that were not provided. `AmbientBackground.jsx` is the
quiet replacement; they can be restored from `all.jsx` if you want them back.

## Structure

```
assets/                 your two reference images
tools/reconstruct.py    two-view reconstruction (GLB + tone textures)
public/models/          my-portrait.glb
public/textures/        front-tone.jpg, side-tone.jpg
src/components/         Hero, Scene, ParticlePortrait, CursorGlow, Loader, WebGLFallback, Navbar, sections…
src/shaders/            vertexShader.glsl, fragmentShader.glsl
src/utils/              generatePoints.js (surface sampling), pointer.js
src/data/               portrait-meta.json (mapping from the reconstruction)
all.jsx                 your original single-file portfolio (reference only, not imported)
```

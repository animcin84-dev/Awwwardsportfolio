# Identity asset provenance

The first-viewport identity assets were supplied by the portfolio owner and are used as authored identity material, not third-party stock imagery.

- `background.mp4` — copied from the owner-supplied `background.mp4`; SHA-256 begins `80358A81E5C45D67`; 3,069,023 bytes.
- `background-mobile.mp4` — art-directed 404×720 centre crop of the same owner-supplied film; H.264 High, 24fps, no audio stream, fast-start, 516,789 bytes. The encode retains SSIM 0.989838 against the exact source crop and is selected only through the phone breakpoint.
- `d-mark.png` / `d-mark.webp` — owner-supplied chrome D identity artwork and its optimized web derivative.
- `daniyal-wordmark.png` / `daniyal-wordmark.webp` — owner-supplied chrome Daniyal wordmark and its optimized web derivative.
- `hero-poster.webp` — authored static fallback derived for the same hero composition.

The deterministic `scripts/generate-launch-assets.mjs` process combines only these owner-supplied identity assets to create the Open Graph card, Twitter card, favicon, Apple icon, and manifest icons. It does not introduce stock imagery, third-party marks, clients, awards, or endorsement claims.

The hero falls back to `hero-poster.webp` when motion is reduced, data saving is enabled, a sub-4g connection is reported, or the video cannot be presented. Desktop retains the full 1280×720 master; phones receive the dedicated portrait encode instead of downloading and discarding most of the landscape frame.

## Authored chapter-transition artwork

- `material-signal.webp` — an original raster artwork generated with the built-in OpenAI image-generation tool on 2026-08-27 for the Selected Work transition. The prompt requested an abstract liquid-chrome membrane opening into a paper evidence field with one cobalt seam; it explicitly excluded text, logos, people, copied Lusion imagery, existing hero waves, and generic 3D objects. The production WebP is a 1,672×941 conversion of the generated PNG and weighs 130,048 bytes.

This asset is used as a flat pre-rendered image. It introduces no Three.js, WebGL, canvas, copied reference asset, client claim, or endorsement.

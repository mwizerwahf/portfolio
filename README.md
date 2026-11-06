# ⚡ Tech Superpowers — Personal Portfolio

My entry for the **AWS Student Builder Challenge: Build Your Tech Superpower**.

**Live site:**  https://main.dq2wu3xall9cs.amplifyapp.com/

## The creative feature: Pull My Superpower Card 🃏
A sealed booster pack floats on the home page (with a visible "Click to rip it open" hint, plus a **Pull my card** button in the nav).
Click it and:
1. The pack shakes and rips open
2. A **holographic trading card of me** flies out with confetti
3. The holo foil and glare follow your mouse — or your phone's gyroscope
4. Flip the card for my base stats and a randomly unlocked **secret fun fact**
5. Each pull rolls a rarity (Rare / Epic / Legendary) — pull again for another secret

Shareable deep link: `/#card` opens the pack directly.

## Tech
- Plain HTML, CSS, JavaScript — no framework, no build step, fast load
- All content lives in `data.js` (one file to edit)
- 3D CSS transforms + `mix-blend-mode` for the holographic effect
- DeviceOrientation API for tilt on mobile
- Accessible: keyboard operable (Enter/Space/Escape), focus trap in dialog, `prefers-reduced-motion` support, skip link

## AWS
- **AWS Amplify Hosting** — hosting, global CDN (CloudFront), free HTTPS
- **CI/CD** — Amplify auto-deploys on every `git push` to `main`
- `amplify.yml` defines the build settings

## Run locally
Open `index.html` in a browser, or: `python3 -m http.server 8000`

## Files
| File | Purpose |
|---|---|
| `index.html` | Page structure |
| `styles.css` | All styling + card/pack animations |
| `data.js` | ✏️ Personal content |
| `app.js` | Renders sections, scroll effects |
| `card.js` | The booster pack + holo card feature |
| `amplify.yml` | Amplify build config |

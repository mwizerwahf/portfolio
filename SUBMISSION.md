# Pull My Superpower Card: a holographic trading-card portfolio on AWS Amplify

**🔗 Live site:** 
**💻 GitHub:** https://github.com/mwizerwahf/portfolio
**🃏 Jump straight to the feature:** 

---

## The idea
Everyone growing up had a favourite trading card: the shiny one you protected in a sleeve. So I asked myself: *what if my portfolio handed you a card of me?*

My site has the three core sections (**About Me**, **Tech Superpowers** and **Projects & Achievements**). Floating next to my name, though, is a **sealed booster pack**.

<!--  -->

## The creative feature: "Pull My Superpower Card"
**How visitors find it:** the pack floats and shimmers in the hero, with a glowing hint that says *"A sealed booster pack! Click to rip it open."* There's also a **🃏 Pull my card** button in the nav bar and a reminder in the Contact section. Normal navigation is never blocked. The feature opens in its own layer and closes with ✕, Escape, or "Back to portfolio".

**What happens:**
1. The pack **shakes and rips open**, and the card flies out with a burst of confetti.
2. It's a **holographic trading card of me**. As you move your mouse, or tilt your phone, the rainbow foil and light glare follow you, just like a real holo card.
3. The front shows my class (*Cloud Builder*), my HP, my superpower, my signature move and my weakness: *an unlabeled cable (must trace it)*. As a network engineer, my card has **1500 HP**, a nod to the Ethernet MTU, and my superpower is finding the root cause of any outage. (It's usually DNS.)
4. **Flip it** to see my base stats (Networking, Security, Code and Music) and a **secret fun fact** about me.
5. Every pull rolls a **rarity** (Rare, Epic or Legendary) and unlocks a different secret, so visitors are tempted to pull again. *(The first pull is always Legendary, because first impressions matter.)*

<!--  -->

**Why it reveals something unique about me:** the fun facts, stats and weakness are personal. They're the things I'd tell you over coffee, not the things on my CV. I'm a network engineer doing an MSc at Carnegie Mellon University Africa, and I also play guitar and piano. A CV can't show both sides of that, but a character card can.

## How I built it
- **Plain HTML, CSS and JavaScript.** There's no framework and no build step, so it loads fast and I understand every line.
- **The holographic effect** uses only CSS: 3D `rotateX/rotateY` transforms driven by CSS variables, a rainbow gradient layer with `mix-blend-mode: color-dodge`, and a radial "glare" that follows the pointer.
- **Phone tilt** uses the DeviceOrientation API, with the permission prompt iOS requires.
- **All my content lives in one `data.js` file**, so updating the site means editing text, not HTML.
- **Accessibility:** the pack and card work with the keyboard (Enter/Space to rip and flip, Escape to close). Focus stays inside the dialog, there's a skip link, and animations switch off for people who set "reduce motion".

## AWS services used
| Service | What it does for me |
|---|---|
| **AWS Amplify Hosting** | Hosts the site on a global CDN with free HTTPS |
| **Amplify CI/CD (GitHub integration)** | Every `git push` to `main` automatically builds and redeploys the site |
| **Amazon CloudFront** (via Amplify) | Serves the site quickly from edge locations. As a network engineer I care about latency, and that includes visitors in Africa |
| **AWS IAM** | Amplify's service role, which grants only the permissions it needs to deploy |

<!--  -->

**Deployment flow:** `git push` → Amplify detects the commit → reads `amplify.yml` → deploys → live in about a minute.

## What I learned
- **Managed hosting vs. running my own.** I'm used to setting up Nginx on Linux by hand. Amplify gave me HTTPS, a CDN and CI/CD from a single GitHub connection, which made the trade-off between control and speed very concrete.
- **3D CSS transforms and blend modes.** The "holo" effect is just layered gradients moving with the pointer, with no images and no libraries.
- [Designing an "easter egg" that's fun but never gets in the way of someone who just wants to see my projects.]
- **Telling my own story.** Turning networking and security work into something a non-engineer enjoys clicking on was harder than writing the code.

## Challenges I faced
- **Making the holo shine feel real.** My first version just rotated the card and looked flat. Moving the gradient position *and* a glare spotlight with the pointer is what made it click.
- **Phone tilt on iPhone.** iOS blocks motion sensors until the user grants permission. I had to request it during the "rip" tap, because it only works inside a user gesture.
- **Keeping the site usable.** It was tempting to make the whole site the game. I kept the feature in its own dialog, so judges and recruiters can still get to my projects in one click.
- [Add one real problem from your deployment, e.g. a build setting, the branch name, or waiting for the domain to propagate. Of course it was DNS.]

## What's next
Publish my Python chat app and DNS telemetry lab on GitHub and link them here, add a contact form with Amazon SES, and add a serverless visitor counter with Lambda and DynamoDB.

Thanks for pulling my card! ⚡

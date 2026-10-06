# Tejashwini R – Developer Portfolio

A lightweight, dark-mode portfolio built with **HTML5, CSS3 and vanilla JavaScript**. No build step, backend or environment variables.
Content comes only from the resume: career objective, education (BCA, 3rd year), skills, languages, strengths.

## Folder structure
```
index.html          page content
css/style.css       styles, colours (top :root), animations
js/script.js        menu, scroll reveal, counters, typing effect
assets/images/      profile-photo.jpg
assets/resume/      Tejashwini_R_Resume.pdf
favicon/favicon.svg
vercel.json
```

## Run locally
```
git clone <repository-url>
cd portfolio
python3 -m http.server 8000
```
Open http://localhost:8000 (or just open `index.html`).

## Customize
- **Text**: edit `index.html`. To add Projects, Certifications or Contact later, copy a `<section class="sec">` block and add a nav link in `<nav id="menu">`.
- **Email / LinkedIn / GitHub**: none were in the resume, so none are shown. Add e.g. `<a class="btn ghost" href="mailto:you@example.com">Email me</a>`.
- **Photo**: replace `assets/images/profile-photo.jpg` (portrait 4:5 works best), keep the filename or update `index.html`.
- **Resume**: replace `assets/resume/Tejashwini_R_Resume.pdf` with your own PDF using the same filename (the PDF here was generated from the resume text).
- **Colours**: edit the variables in `:root` at the top of `css/style.css`.
- **Animations**: reveal timing is `.reveal` in the CSS (`--d` sets per-element delay); background motion is `@keyframes grid` and `float`. Animations turn off automatically for visitors with reduced-motion enabled.
- **Canonical/Open Graph URL**: replace `https://your-domain.vercel.app/` in `index.html` after deploying.

## Deploy to Vercel
```
npm i -g vercel
cd portfolio
vercel --prod
```
Or push to GitHub, then Vercel → Add New Project → import repo → Framework Preset "Other" → Deploy.

## Custom domain
Vercel project → Settings → Domains → Add your domain, then set the DNS records Vercel shows (A record for the apex domain, CNAME for `www`).

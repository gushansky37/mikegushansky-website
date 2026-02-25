# CLAUDE.md — Mike Gushansky Personal Website
## mikegushansky.com

Read this entire file before writing a single line of code. Follow all instructions precisely. Make no assumptions not covered here — use the defaults specified.

---

## 1. PROJECT OVERVIEW

Build a clean, minimal, modern personal portfolio website for Mike Gushansky — a DJ and photographer. The aesthetic is premium, editorial, and confident. Lots of white space, sharp typography, and zero clutter.

**Visual reference:** The homepage is directly inspired by jayceduarte.com — a full-screen composition with the owner's name dead-center and navigation links placed in the four corners of the viewport. Clean, bold, unforgettable.

**Domain:** mikegushansky.com
**Hosting target:** Netlify (static site — no backend required)
**Tech stack:** Vanilla HTML, CSS, JavaScript only. No frameworks, no build tools, no npm. Every page is a plain `.html` file. This keeps deployment dead simple — just drag the folder to Netlify.

---

## 2. SITE STRUCTURE

```
/
├── index.html            (Homepage — full-screen corner nav)
├── photos.html           (Photo Gallery)
├── sounds.html           (DJ Mixes / Sounds)
├── me.html               (About Me)
├── contact.html          (Contact)
├── admin/
│   ├── index.html        (Decap CMS admin UI)
│   └── config.yml        (Decap CMS configuration)
├── css/
│   └── styles.css        (Single global stylesheet)
├── js/
│   └── main.js           (Single global JS file)
├── images/
│   └── placeholder/      (See section 6)
├── _redirects            (Netlify redirect rules — needed for CMS)
└── README.md             (Plain-English instructions for Mike)
```

---

## 3. DESIGN SYSTEM

Apply this system consistently across every page.

### Colors
```css
--color-bg:          #FFFFFF;
--color-bg-soft:     #F7F7F5;
--color-text:        #1A1A1A;
--color-text-muted:  #888888;
--color-border:      #E8E8E8;
--color-hover:       #000000;
```

### Typography
Include in the `<head>` of every page:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

- **Hero name / Page titles / H1:** `Playfair Display 400` — elegant serif, used with confidence
- **Section headings H2:** `Playfair Display 400`
- **All UI, nav, body, labels:** `Inter` — clean modern sans-serif
- **Base font size:** 16px
- **Line height:** 1.7 for body text

### Spacing
Generous whitespace everywhere. Section padding: `80px 0` desktop, `48px 0` mobile.

### Max content width
`1200px` centered with `margin: 0 auto` and `padding: 0 48px` (desktop), `padding: 0 24px` (mobile).

### Animations
Subtle fade-in-up on scroll for all content sections:
```css
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```
Trigger `.visible` via IntersectionObserver in `main.js`. Apply to every major content section on inner pages.

---

## 4. NAVIGATION

### Homepage (index.html) — Corner Navigation
The homepage uses a full-screen corner navigation layout. There is NO traditional nav bar on this page.

Four links are fixed to the four corners of the viewport:
- **Top-left:** `Photos` → photos.html
- **Top-right:** `Sounds` → sounds.html
- **Bottom-left:** `Me` → me.html
- **Bottom-right:** `Contact` → contact.html

Each corner link:
- Position: `fixed`, inset `32px` from edges on desktop, `24px` on mobile
- Font: `Inter 400`, uppercase, letter-spacing `0.15em`, font-size `12px`
- Color: `var(--color-text-muted)`
- Hover: color transitions to `var(--color-text)`, no underline
- No background, no border, no button styling — just text

### Inner Pages (photos, sounds, me, contact) — Top Navigation Bar
All inner pages use a minimal fixed top nav bar:
- White background, `border-bottom: 1px solid var(--color-border)`
- Height: `60px`
- Left side: `Mike Gushansky` in `Playfair Display 400`, font-size `18px` — links to index.html
- Right side: `Photos`, `Sounds`, `Me`, `Contact` in `Inter 400`, uppercase, letter-spacing `0.1em`, font-size `12px`
- Active page link: `color: var(--color-text)` with a `2px` underline; inactive: `var(--color-text-muted)`
- Mobile: hamburger icon (☰) on the right, clicking opens a full-screen overlay menu with the four links centered vertically

### Footer (all inner pages)
- `border-top: 1px solid var(--color-border)`, padding `32px 0`
- Centered: `© 2025 Mike Gushansky` in `Inter 300`, `var(--color-text-muted)`, font-size `13px`
- Below that: a row of social icon links (SVG icons): Instagram, YouTube, SoundCloud — each links to `#` as placeholder, opens in new tab

---

## 5. PAGE SPECIFICATIONS

---

### 5.1 HOMEPAGE (index.html)

Full-screen, full-viewport-height composition. This is a statement page — nothing but the name and the four corner links.

**Layout:**
- `body` and `html`: `height: 100%; margin: 0; overflow: hidden`
- Background: `#FFFFFF`
- The four corner nav links (see Section 4)
- Centered content (absolutely centered both axes):
  - Name: `Mike Gushansky` in `Playfair Display 400`, font-size `clamp(36px, 6vw, 72px)`, color `var(--color-text)`, no bold, elegant
- Nothing else on this page. No hero image, no scroll, no CTA buttons.
- No footer on this page.

---

### 5.2 PHOTOS (photos.html)

**Purpose:** Immersive, full-width photography showcase with a scrollable gallery below.

**Section 1 — Full-page image carousel:**
- Full viewport width and full viewport height (`100vh`) — edge to edge, no margins, no padding
- Image: `object-fit: cover`, fills entire viewport
- Subtle dark gradient overlay at bottom for caption readability
- Caption (bottom-left, inside gradient): photo title in `Inter 400` white, location/date in `Inter 300` white muted, font-size `13px`
- Left/right arrow buttons: vertically centered on sides, `48px` diameter circle, `rgba(255,255,255,0.15)` background, white arrow SVG, hover: `rgba(255,255,255,0.3)`. Keyboard left/right arrow keys also navigate.
- Dot indicators: centered at very bottom, `8px` dots, active dot white, inactive `rgba(255,255,255,0.4)`
- Auto-advance: every 5 seconds, pauses on hover or user interaction
- Smooth CSS slide transition (`transition: transform 0.5s ease`)
- No thumbnail strip — removed entirely

**Section 2 — Tumblr-style scrolling gallery (below carousel):**
- Begins immediately when user scrolls past the carousel
- Masonry-style column layout: 2 columns on desktop, 1 column on mobile, `gap: 12px`, no outer padding (full bleed to edges)
- Each image:
  - Full column width, variable natural height (`object-fit: cover`, no cropping — let each photo breathe at its natural aspect ratio)
  - No border, no border-radius, no shadow — raw images edge to edge
  - No hover effect
  - Clicking an image opens it fullscreen in a lightbox (see below)
- Images load with a fade-in as they enter the viewport (IntersectionObserver)

**Lightbox:**
- Full-screen black overlay (`background: #000`)
- Image centered, max-width and max-height `95vw`/`95vh`, `object-fit: contain` — photo shown at largest possible size without cropping
- Left/right arrow buttons to navigate to prev/next photo in the gallery
- Close button `×` top-right corner, white, font-size `24px`
- Close on: × click, clicking outside the image, or ESC key
- No captions inside the lightbox — just the photo
- Use 12 placeholder images from `https://picsum.photos/` with varying dimensions to simulate real photos:
  - Mix of landscape (`1200/800`), portrait (`800/1100`), and square (`900/900`) with random seeds 10–21
- Comment on each image: `<!-- GALLERY IMAGE: replace src, title, location -->`

**Photos used in carousel:** First 6 of the same placeholder images (seeds 10–15)
**Photos used in gallery:** All 12 placeholder images (seeds 10–21)

---

### 5.3 SOUNDS (sounds.html)

**Purpose:** Let visitors discover and listen to DJ sets via YouTube embeds.

**Page header:**
- Title: `Sounds` in `Playfair Display 400`, font-size `48px`, centered
- Tagline: placeholder in `Inter 300`, muted

**Featured Mix (top section):**
- Full-width responsive YouTube embed (16:9 ratio) using the standard iframe
- `max-width: 900px`, centered, `border-radius: 4px`, subtle `box-shadow`
- Below embed: Mix title in `Playfair Display 400`, font-size `32px`; genre and date in `Inter 300` muted; short description paragraph in `Inter 300`
- Placeholder video ID: `dQw4w9WgXcQ`
- Comment: `<!-- FEATURED MIX: replace VIDEO_ID in the src below -->`

**Mix Grid (below featured):**
- Section heading: `Slab City` in `Playfair Display 400`
- 2-column grid on desktop, 1-column on mobile, `gap: 32px`
- Each mix card:
  - YouTube thumbnail: `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`, full width, `aspect-ratio: 16/9`, `object-fit: cover`, `border-radius: 4px`
  - Mix title in `Inter 500`, font-size `16px`, margin-top `12px`
  - Date + duration in `Inter 300`, muted, font-size `13px`
  - Genre pill: small tag, `border: 1px solid var(--color-border)`, `border-radius: 100px`, padding `4px 10px`, `Inter 400`, font-size `11px`, uppercase, letter-spacing `0.1em`
  - Card hover: thumbnail scales `1.02`, `transition: transform 0.3s ease`
  - Clicking card opens mix modal
  - `data-video-id="VIDEO_ID"` attribute on each card for JS to read
- Start with 4 placeholder cards using video ID `dQw4w9WgXcQ`
- Comment on each card: `<!-- MIX CARD: replace VIDEO_ID in data-video-id and thumbnail src -->`

**Mix Modal:**
- Full-screen dark overlay (`rgba(0,0,0,0.85)`)
- Centered white container, max-width `800px`, padding `24px`, `border-radius: 4px`
- YouTube iframe embed inside (16:9, full width of container)
- Close button `×` top-right, `font-size: 24px`, hover color change
- Close on: × button click, outside click, ESC key
- On close: remove iframe src to stop video playback

---

### 5.4 ME (me.html)

**Purpose:** Tell Mike's story. Personal and human.

**Layout: Full-width photo header, single column text below.**

**Hero Photo:**
- Full viewport width, `70vh` height, no side margins — edge to edge
- Image: `object-fit: cover`, `object-position: center top` (so a portrait shows the face)
- Placeholder: `https://picsum.photos/1600/900?random=20`
- No caption, no overlay, no text on top — just the image
- Comment: `<!-- ME PAGE PHOTO: replace src with your photo path -->`

**Content below photo — single centered column, max-width `640px`, centered:**
- `margin-top: 64px`
- Title: `Me` in `Playfair Display 400`, font-size `48px`, margin-bottom `8px`
- Thin horizontal rule: `border-top: 1px solid var(--color-border)`, margin-bottom `40px`
- Bio in 4 paragraphs of realistic placeholder copy (`Inter 300`, font-size `17px`, line-height `1.9`):
  1. How Mike got into music and photography
  2. His DJ style, influences, and types of events he plays
  3. His photography — what he shoots, his visual style, his approach
  4. What he's working on now
- All placeholder text should sound like real copy, with `[City]`, `[Year]`, `[Genre]` etc. as editable markers

**Facts block** (below bio, same column):
- `margin-top: 48px`, `border-top: 1px solid var(--color-border)`, `padding-top: 32px`
- Clean two-column definition list:
  ```
  Based in     [City]
  DJ since     [Year]
  Camera       [Camera]
  Genres       [Genres]
  ```
  Label: `Inter 400`, muted, `12px`, uppercase, letter-spacing `0.1em`. Value: `Inter 400`, `14px`, normal color.

**Press & Features** (below facts, same column):
- `margin-top: 48px`, `border-top: 1px solid var(--color-border)`, `padding-top: 32px`
- Heading: `Press & Features` in `Inter 500`, `13px`, uppercase, muted
- Placeholder comment: `<!-- Add press mentions here as <p> tags -->`

---

### 5.5 CONTACT (contact.html)

**Purpose:** Bookings, collaborations, and general hellos.

**Page header:**
- Title: `Get in Touch` in `Playfair Display 400`, font-size `48px`, centered
- Subheading: `"For bookings, collaborations, or just to say hello."` in `Inter 300`, muted

**Single column layout, max-width `600px`, centered on page:**

Contact Form:
- Fields:
  - Name: `<input type="text">`, placeholder `"Your name"`
  - Email: `<input type="email">`, placeholder `"your@email.com"`
  - Subject: `<select>` with options: `Booking`, `Collaboration`, `Photography`, `Other`
  - Message: `<textarea rows="6">`, placeholder `"What's on your mind?"`
- Field styling: full-width, `border: 1px solid var(--color-border)`, `border-radius: 4px`, padding `12px 16px`, `Inter 400`, font-size `15px`, focus: `border-color: var(--color-text)`, `outline: none`
- Submit button: full-width, black background, white text, `Inter 500`, uppercase, letter-spacing `0.1em`, height `52px`, `border-radius: 4px`, hover: `background: #333`
- **Netlify form handling:** Add `data-netlify="true"` and `netlify` attributes to the `<form>` tag. Add a hidden input `<input type="hidden" name="form-name" value="contact">`. Add a comment `<!-- Netlify handles this form for free — no backend needed. Submissions appear in your Netlify dashboard. -->`
- Success state: a hidden `<div id="form-success">` that says `"Thanks! I'll be in touch soon."` in `Inter 300`. JS shows this div and hides the form after submit event.

Social Logos (one line, directly below the form):
- A single horizontal row of 4 social platform logo icons (SVG), centered
- Icons only — no text labels, no handles
- Platforms: Instagram, YouTube, SoundCloud, Mixcloud
- Icon size: `28px`, color `var(--color-text-muted)`, hover: `var(--color-text)`
- Spacing: `gap: 24px` between icons
- All link to `#` as placeholders, `target="_blank"`, `aria-label` set to platform name for accessibility
- `margin-top: 32px` to sit cleanly below the submit button

---

## 6. DECAP CMS (Content Management System)

Add Decap CMS so Mike can edit his site content without touching code. Decap CMS is free, open-source, and works perfectly with Netlify.

### admin/index.html
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager — Mike Gushansky</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

### admin/config.yml
```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "images/uploads"
public_folder: "/images/uploads"

collections:
  - name: "settings"
    label: "Site Settings"
    files:
      - label: "About Me"
        name: "about"
        file: "_data/about.json"
        fields:
          - { label: "Your Name", name: "name", widget: "string" }
          - { label: "Tagline", name: "tagline", widget: "string" }
          - { label: "City", name: "city", widget: "string" }
          - { label: "DJ Since (year)", name: "dj_since", widget: "string" }
          - { label: "Camera", name: "camera", widget: "string" }
          - { label: "Genres", name: "genres", widget: "string" }
          - { label: "Bio Paragraph 1", name: "bio1", widget: "text" }
          - { label: "Bio Paragraph 2", name: "bio2", widget: "text" }
          - { label: "Bio Paragraph 3", name: "bio3", widget: "text" }
          - { label: "Bio Paragraph 4", name: "bio4", widget: "text" }

  - name: "sounds"
    label: "Sounds / Mixes"
    folder: "_data/sounds"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "YouTube Video ID", name: "video_id", widget: "string", hint: "Just the ID from the YouTube URL, e.g. dQw4w9WgXcQ" }
      - { label: "Date", name: "date", widget: "date" }
      - { label: "Duration", name: "duration", widget: "string", hint: "e.g. 1:02:34" }
      - { label: "Genre", name: "genre", widget: "string" }
      - { label: "Description", name: "description", widget: "text" }
      - { label: "Featured Mix?", name: "featured", widget: "boolean", default: false }

  - name: "photos"
    label: "Photos"
    folder: "_data/photos"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Photo", name: "image", widget: "image" }
      - { label: "Location", name: "location", widget: "string" }
      - { label: "Date", name: "date", widget: "date" }
```

### _redirects file
```
/admin/*  /admin/index.html  200
```

### Also add to every page `<head>`:
```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

And add this script before `</body>` on every page:
```html
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

---

## 7. PLACEHOLDER CONTENT

**Images:** Use `https://picsum.photos/` — different random numbers for each:
- Landscape: `https://picsum.photos/1600/900?random=N`
- Portrait: `https://picsum.photos/480/640?random=N`
- Square: `https://picsum.photos/600/600?random=N`

**Text:** Write realistic placeholder copy — not Lorem Ipsum. Sound like a real person. Use `[City]`, `[Year]`, `[Genre]`, `[Camera]` as editable placeholders.

**YouTube:** Use video ID `dQw4w9WgXcQ` everywhere as placeholder.

---

## 8. RESPONSIVENESS

Breakpoints:
- Mobile: `< 768px`
- Tablet: `768px–1024px`
- Desktop: `> 1024px`

Key mobile rules:
- Homepage corner nav: reduce inset to `20px`, font-size to `10px`
- Two-column layouts → single column
- Top nav → hamburger menu
- Gallery slideshow → full-width, arrows smaller
- Mix grid → single column
- Contact form + social → stacked

Use `clamp()` for fluid type scaling throughout.

---

## 9. SEO & META

Add to every page `<head>`:
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="[page-specific description]">
<meta property="og:title" content="Mike Gushansky — DJ & Photographer">
<meta property="og:description" content="Music and photography by Mike Gushansky.">
<title>Mike Gushansky — [Page Name]</title>
```

Use semantic HTML throughout: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`. All images need descriptive `alt` attributes.

---

## 10. README.md

Write a plain-English `README.md` for Mike. Assume he has never touched code. Include:

1. **How to add a new photo** — step by step (use the CMS at /admin)
2. **How to add a new mix** — step by step (use the CMS, just paste a YouTube video ID)
3. **How to update bio text** — via the CMS
4. **How to access the CMS** — go to mikegushansky.com/admin, log in with Netlify Identity
5. **How to deploy updates to Netlify** — drag and drop the folder, or through GitHub
6. **How the contact form works** — Netlify forms, where to see submissions

Write it warmly and simply. Use numbered steps. No jargon.

---

## 11. WHAT NOT TO DO

- Do NOT use React, Vue, Angular, or any JS framework
- Do NOT use Bootstrap, Tailwind, or any CSS framework
- Do NOT use npm, node_modules, or any build process
- Do NOT use a backend, database, or server-side code
- Do NOT add cookies, localStorage, or any tracking
- Do NOT use Lorem Ipsum — write real-sounding placeholder copy
- Do NOT add unnecessary animations, gradients, or decorative elements
- Do NOT add anything not specified in this document

---

## 12. DEFINITION OF DONE

- [ ] All 5 pages exist and are fully styled per spec
- [ ] Homepage has full-screen corner navigation, name centered, no scroll
- [ ] Inner pages have top nav bar with hamburger on mobile
- [ ] Photo gallery slideshow works: arrows, dots, keyboard nav, auto-advance, thumbnails
- [ ] Sounds page: featured mix embed + grid of cards + modal (opens, closes, stops video)
- [ ] Contact form has Netlify attributes and success message
- [ ] Decap CMS files exist: `admin/index.html`, `admin/config.yml`, `_redirects`
- [ ] Site is fully responsive on mobile
- [ ] README.md exists with plain-English instructions
- [ ] No console errors in browser developer tools
- [ ] Folder structure matches Section 2 exactly

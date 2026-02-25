# Mike Gushansky — Personal Website

Your portfolio site: music, photos, and everything in between.

---

## How to Access the CMS (Content Manager)

The CMS is where you add photos, mixes, and update your bio — no code required.

1. Go to **mikegushansky.com/admin**
2. Log in with your Netlify Identity account
3. If you don't have an account yet, ask whoever set up Netlify to invite you via the Netlify dashboard (Identity tab)

---

## How to Add a New Photo

1. Log into the CMS at **mikegushansky.com/admin**
2. Click **Photos** in the left sidebar
3. Click **New Photos** at the top
4. Fill in the fields:
   - **Title** — name of the photo (e.g., "Sunset at the Harbor")
   - **Photo** — click to upload your image file
   - **Location** — where the photo was taken (e.g., "Tel Aviv")
   - **Date** — when the photo was taken
5. Click **Publish** in the top right

---

## How to Add a New Mix

1. Log into the CMS at **mikegushansky.com/admin**
2. Click **Sounds / Mixes** in the left sidebar
3. Click **New Sounds / Mixes** at the top
4. Fill in the fields:
   - **Title** — name of your mix (e.g., "Sunset Sessions Vol. 2")
   - **YouTube Video ID** — the part of the YouTube URL after `v=`. For example, if your video link is `https://youtube.com/watch?v=abc123`, the ID is `abc123`
   - **Date** — when the mix was recorded or uploaded
   - **Duration** — how long the mix is (e.g., "1:02:34")
   - **Genre** — the style of the mix (e.g., "Deep House")
   - **Description** — a short description of the mix
   - **Featured Mix?** — toggle this on if you want it to be the big featured mix at the top of the Sounds page
5. Click **Publish** in the top right

---

## How to Update Your Bio

1. Log into the CMS at **mikegushansky.com/admin**
2. Click **Site Settings** in the left sidebar
3. Click **About Me**
4. Edit any of the fields — your name, tagline, city, bio paragraphs, etc.
5. Click **Publish** in the top right

---

## How the Contact Form Works

When someone fills out the contact form on your site, the submission goes straight to your Netlify dashboard.

To see submissions:
1. Log into **app.netlify.com**
2. Select your site
3. Go to **Forms** in the top navigation
4. Click on the **contact** form to see all submissions

You'll see the person's name, email, subject, and message. Netlify can also email you notifications — set that up under **Forms > Notifications** in the Netlify dashboard.

---

## How to Deploy Updates

### Option A: Drag and Drop (simplest)
1. Make your changes to the files on your computer
2. Go to **app.netlify.com** and select your site
3. Go to **Deploys**
4. Drag and drop your entire project folder onto the deploy area
5. Your site will be live in seconds

### Option B: Through GitHub (automatic)
If your site is connected to a GitHub repository:
1. Any changes pushed to the `main` branch will automatically deploy
2. CMS edits are automatically pushed to GitHub, so they deploy on their own

---

## Project Structure (for reference)

```
index.html        — Homepage
photos.html       — Photo gallery
sounds.html       — DJ mixes
me.html           — About page
contact.html      — Contact form
css/styles.css    — All the styling
js/main.js        — Interactive features
admin/            — CMS files (don't edit these)
images/uploads/   — Where CMS-uploaded images go
```

---

## Need Help?

If something breaks or you need changes, reach out to your developer. The site is built with plain HTML, CSS, and JavaScript — no complicated frameworks — so any web developer can pick it up.

# IEEE SB NSSCE Website - Maintenance & Contribution Rules

Welcome to the official repository for the IEEE SB NSSCE website! This website is built using modern web technologies like Next.js, React, and Tailwind CSS. 

Since this website will be maintained and updated by successive executive committees over the coming years, we have established a strict set of rules and conventions to ensure the codebase remains clean, organized, and error-free.

---

## 🚀 1. Workflow for Making Changes

Do **NOT** push or commit directly to the `main` branch. All updates (adding new events, members, galleries, or features) must follow this workflow:

1. **Fork the Repository**: Create a fork of this repository on your own personal GitHub account.
2. **Clone Locally**: Clone your forked repository to your local machine.
3. **Create a Branch**: Create a new branch for your specific update (see Naming Conventions below).
4. **Make Changes**: Add your data or code updates locally.
5. **Test Locally**: Always run `npm run dev` and test the website on `localhost:3000` to ensure there are no compilation or visual errors. Check for broken links and layout bugs.
6. **Commit & Push**: Commit your changes with a clear, descriptive message and push the branch to your fork.
7. **Create a Pull Request (PR)**: Open a PR against the `main` branch of the original IEEE SB NSSCE repository. Wait for the Webmaster or Lead Developer to review, approve, and merge it.

---

## 🌿 2. Branch Naming Conventions

Always use descriptive branch names. Prefix your branch name based on the type of update you are making:

*   **`data/...`**: Use this for routine website data updates (adding events, gallery images, new execom members, achievements).
    *   *Example*: `data/add-execom-2027`
    *   *Example*: `data/cs-encrypta-4`
*   **`feature/...`**: Use this if you are adding new UI components, pages, or features.
    *   *Example*: `feature/dark-mode`
*   **`fix/...`**: Use this for bug fixes, fixing broken links, or correcting typos.
    *   *Example*: `fix/gallery-image-spans`

---

## 📂 3. Data Structure & Conventions

All dynamic data for the website is stored in the `src/data/` directory. You will rarely need to touch the `.tsx` component files unless you are modifying the UI. 

### A. Team Members (`src/data/members.ts`)
When a new Execom takes charge, **do not delete the old members**. 
Instead, append the new members to the existing array and specify the new `year`. The website is designed to automatically filter and archive members based on their active year.

**Required Fields:**
*   `id`: A unique string (e.g., `"john-doe-2027"`).
*   `name`: Full name.
*   `position`: Their exact role (e.g., `"Chairperson"`, `"Webmaster"`).
*   `societyId`: Matches the society (e.g., `"sb"`, `"cs"`, `"ras"`, `"wie"`).
*   `year`: The year their term started (e.g., `2027`).
*   `photo`: An absolute URL to their image.

### B. Events (`src/data/events/*.ts`)
Events are compartmentalized by society inside the `src/data/events/` folder (e.g., `cs.ts`, `pes.ts`, `wie.ts`). 
To add an event, simply append a new object to the respective society's array.

**Required Fields:**
*   `id` & `slug`: Must be unique (e.g., `"cs-encrypta-4"`).
*   `societyId`: The ID of the organizing society.
*   `date`: Use standard ISO string format (e.g., `"2026-09-27T09:30:00"`). The website will auto-sort events based on this date!
*   `gallery`: An array of image URLs specific to this event.

### C. Main Gallery (`src/data/gallery.ts`)
To add general images to the main Gallery page (`/gallery`), simply append new objects to the `galleryData` array in `src/data/gallery.ts`.

**Required Fields:**
*   `id`: A unique identifier (e.g., `"img-141"`).
*   `url`: The direct absolute URL to the image.

*Note: The website automatically handles the Bento Box layout sizing. You do not need to provide titles, categories, or manual span classes.*

### D. Achievements (`src/data/achievements.ts`)
Append new achievements to this file. Always provide a clear `title`, `description`, `date`, and `image`.

---

## 🖼️ 4. Image Hosting Rules

To keep the repository lightweight and fast to clone:
1. **DO NOT** upload high-resolution `.png` or `.jpg` files directly into the `/public` folder of this repository. Over time, this will massively bloat the git history.
2. **DO** use an external image hosting service (like an AWS S3 bucket, Cloudinary, Imgur, or your dedicated Vercel dataset like `sb-dataset.vercel.app`).
3. Always link to these externally hosted images via absolute URLs in the `src/data/` files.

---

## 🛠️ 5. Development Reminders

*   **TypeScript**: This project uses TypeScript interfaces (found in `src/data/types.ts`). If you add a new property to a data object, make sure you update the corresponding interface, otherwise the build will fail!
*   **Tailwind CSS**: Do not use inline styles. Always utilize Tailwind utility classes if you need to modify the UI.

By strictly following these conventions, the IEEE SB NSSCE website will remain a premier, state-of-the-art platform for all future student branches. Happy coding!

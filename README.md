# Developer Portfolio

A modern, highly interactive full-stack developer portfolio focusing on fluid animations, 3D elements, and clean design. Built for creative developers who want to showcase their skills, projects, and experience with a "wow" factor.

## 🚀 Tech Stack & Tools

This portfolio is built using the following modern web technologies:

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Directory)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## 📂 Project Structure

Here's an overview of the important directories for when you want to customize this portfolio:

\`\`\`text
src/
├── app/                  # Next.js App Router (pages and global layouts)
│   ├── globals.css       # Global styles and Tailwind imports
│   ├── layout.tsx        # Main application layout
│   └── page.tsx          # Homepage where all sections are assembled
├── components/
│   ├── dom/              # Standard React components (Sections of the site)
│   │   ├── HeroBackground.tsx  # The 3D background shader
│   │   ├── AboutMe.tsx         # About section
│   │   ├── MySkills.tsx        # Skills bento grid
│   │   ├── Certificates.tsx    # Certificates showcase
│   │   ├── Projects.tsx        # (Add your projects here)
│   │   └── Contact.tsx         # Contact section
│   └── ui/               # Reusable UI elements (buttons, text reveals, etc.)
└── public/               # Static assets (images, icons, resumes)
\`\`\`

## 🛠️ How to Setup & Run Locally

Follow these steps to get your own version of this portfolio running on your local machine:

**1. Fork and Clone the repository**
Fork this repo on GitHub, then clone it to your local machine:
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
\`\`\`

**2. Install Dependencies**
Make sure you have Node.js installed. Then, run:
\`\`\`bash
npm install
\`\`\`
*(This will install Next.js, Three.js, GSAP, Tailwind, and all other required packages listed in `package.json`)*

**3. Run the Development Server**
Start the local development server:
\`\`\`bash
npm run dev
\`\`\`

**4. View the App**
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🎨 How to Customize for Yourself

This portfolio is meant to be a template for you! Here is where you should go to change the content to match your own experience:

1. **Change Your Name & Intro**: Go to `src/components/dom/HeroTitle.tsx` or `src/app/page.tsx` depending on where the main text is rendered.
2. **Update the "About Me"**: Edit `src/components/dom/AboutMe.tsx` to include your own bio, philosophy, and stats (Years of Experience, Projects Completed).
3. **Modify Skills**: To add or remove skills, edit the grid items array inside `src/components/dom/MySkills.tsx`.
4. **Add Projects & Certificates**: Edit the `src/components/dom/Certificates.tsx` to include your actual achievements and links.
5. **Theme Colors**: If you want to change the dark teal/cyan theme, look for the `radial-gradient` backgrounds in specific components (like `LivingParticleBackground.tsx`) or Tailwind color classes (`cyan-500`, `teal-500`) used throughout the `dom` components.

## 📜 License

Feel free to fork and use this template for your own personal portfolio! If you found it helpful, a star on the repository is always appreciated.

# 🌟 Premium Interactive Developer Portfolio & Showcase

> A beautiful, responsive, and highly interactive developer portfolio built for **Muhammad Riszky Wibowo** (`anYoneo`) using modern HTML5, vanilla CSS3 gradients, glassmorphic card layouts, and vanilla JavaScript.
>
> This portfolio is designed to highlight GitHub stats and directly simulate interactive features from Riszky's three primary repositories.

---

## ✨ Features

### 1. 🎨 Premium Glassmorphism Design
- Sleek dark theme using a radial gradient background and backdrop blur filters.
- Responsive design tailored to work seamlessly across mobile, tablet, and desktop screens.
- Morphing avatar animations and neon glow effects for hover interaction states.

### 2. ⚡ GitHub Live Integration
- Live statistics cards mapping total stars, commits, PRs, and language percentages.
- Live GitHub contribution streak visualizer.

### 3. 🔍 Interactive Showcases (Live Simulators)
- **PSB Online Database Visualizer**: Interactive schema table where users can click database fields (e.g. `pendaftarans.nomor_pendaftaran`, `admins.password`) to see column constraints (type, key, default) and explanatory notes (e.g. Bcrypt hashing explanations).
- **NLP Chatbot Simulator**: Fully working mockup client-side chatbot responding to inquiries about the developer, skills, projects, and contact info, matching intent keywords in NLTK model style.
- **Data Analysis Insights**: Interactive payment method distributions visualizer powered by **Chart.js** displaying Brazilian Olist e-commerce insights.

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Structuring | HTML5 Semantic Markup |
| Styling | Vanilla CSS3 (Custom Variables, Keyframe Animations, Flexbox/Grid) |
| Logic & Dynamic Rendering | Vanilla ES6 JavaScript |
| Data Visualizations | Chart.js (CDN) |
| Icons | Bootstrap Icons (CDN) |

---

## 🚀 Running Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/anYoneo/developer-portfolio.git
   cd developer-portfolio
   ```

2. Open the page:
   - Simply double-click `index.html` to open it in your web browser.
   - Alternatively, serve it locally using any light HTTP server (e.g., Live Server extension in VS Code or python simple server):
     ```bash
     python -m http.server 8000
     ```
   - Open `http://localhost:8000` in your web browser.

---

## 🌎 Deployment to GitHub Pages

To make this portfolio live for anyone to visit:

1. Go to your repository on GitHub: `anYoneo/developer-portfolio`.
2. Go to **Settings** → **Pages** (under the Code and automation section).
3. Under **Build and deployment**, set the source to **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`, then click **Save**.
5. After a few minutes, your site will be live at:  
   **`https://anYoneo.github.io/developer-portfolio/`**

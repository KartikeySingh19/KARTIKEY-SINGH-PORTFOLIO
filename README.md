# Kartikey Singh — Developer Portfolio

This is a static website built with HTML, CSS and vanilla JavaScript. It does **not** need npm, React, a database, or a build command.

## Run locally on Windows

### Option 1 — one-click start (recommended)
1. Extract the ZIP completely.
2. Open the extracted `portfolio_fixed` folder.
3. Double-click `start-local.bat`.
4. Your browser should open `http://localhost:5500`.
5. Keep the black terminal window open while viewing the site. Press `Ctrl + C` there to stop it.

This option requires Python to be installed and available on PATH (`py` or `python`).

### Option 2 — VS Code Live Server
1. Extract the ZIP completely.
2. In VS Code, choose **File → Open Folder** and select the extracted folder (the one containing `index.html`).
3. Install the **Live Server** extension by Ritwick Dey if it is not already installed.
4. Right-click the root `index.html` and choose **Open with Live Server**.
5. The site will normally open at `http://127.0.0.1:5500`.

**Important:** Do not open the ZIP directly in VS Code. Extract it first, and open the folder that contains `index.html` — not the `css`, `js`, or `assets` folder.

## Project structure

```text
portfolio/
├── index.html
├── start-local.bat
├── css/style.css
├── js/script.js
└── assets/
    ├── profile.jpg
    └── icons/
```

## Personalise the portfolio

The portfolio name and introduction are set to Kartikey Singh. Before publishing, update the email, location, GitHub username, LinkedIn URL, education details, and project links in the `CONFIG` object at the top of `js/script.js`.

The sample project GitHub/Live Demo links are placeholders until you connect each project to its actual repository and deployment. This does not affect running the portfolio locally.

## Contact form

The form validates its fields. To actually deliver messages, configure a supported form endpoint in `CONFIG.formEndpoint`, or set a real email address in `CONFIG.email` so the visitor's email app can open.

## Troubleshooting

- If port 5500 is already in use, stop the other server or change `5500` in `start-local.bat` and `.vscode/settings.json`.
- If the browser says the page cannot be reached, confirm the terminal window is still running.
- If the page opens without styling, confirm you opened the extracted project root and that `css/style.css` exists beside `index.html`.

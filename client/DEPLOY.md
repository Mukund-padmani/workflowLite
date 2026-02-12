# 🚀 How to Deploy Workflow Builder Lite

This project is configured as a "monorepo" (Frontend + Backend in one) for easy deployment.

## Deploy on Render

1.  **Push to GitHub**:
    *   Initialize a git repository: `git init`
    *   Add files: `git add .`
    *   Commit: `git commit -m "Initial commit"`
    *   Push this project to a new GitHub repository.

2.  **Create a Web Service**:
    *   Go to [dashboard.render.com](https://dashboard.render.com/).
    *   Click **New +** -> **Web Service**.
    *   Connect your GitHub repository.

3.  **Configure Settings**:
    *   **Name**: `workflow-builder-lite`
    *   **Runtime**: `Node`
    *   **Build Command**: `npm run build`
        *(This runs the `build` script in the root package.json, which installs dependencies and builds the React frontend)*
    *   **Start Command**: `npm start`
        *(This runs the server/index.js file)*

4.  **Deploy**:
    *   Click **Create Web Service**.
    *   Wait for the build to finish. Render will give you a URL (e.g., `https://workflow-builder.onrender.com`).
    *   Open it, and your app is live!

---

## 🛠️ Local Production Test
To test the "production" build on your own machine before deploying:

1.  **Build the Frontend**:
    ```bash
    npm run build
    ```
2.  **Start the Server**:
    ```bash
    node server/index.js
    ```
3.  **Visit**: Go to `http://localhost:3000`. You will see the full app running from a single server!

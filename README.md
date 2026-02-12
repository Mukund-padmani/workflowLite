# Workflow Builder Lite

![Status Backend](https://img.shields.io/badge/Status-Backend-green) ![Status LLM](https://img.shields.io/badge/Status-LLM-blue)

A modern, streamlined web application for designing and executing simple text-processing workflows. Build custom pipelines, automate text analysis, and visualize every step in real-time.

---

## 🚀 Features

*   **Custom Workflow Creation**: Create multi-step workflows (e.g., Clean Text → Summarize → Key Points).
*   **Real-time Execution**: Run your workflows on input text and watch as each step processes.
*   **Step-by-Step Transparency**: View the input, intermediate results, and final output for complete clarity.
*   **Run History**: Automatically save and review your last 5 workflow runs.
*   **System Health Dashboard**: Monitor the status of the Backend, Database, and LLM connections.
*   **Premium Design**: Features a sleek, modern UI with glassmorphism, smooth animations, and a responsive layout.

---

## 🛠️ Tech Stack

*   **Frontend**: React (Vite)
*   **Styling**: Vanilla CSS (Hand-crafted, modern aesthetics)
*   **Backend**: Node.js (Express)
*   **Data Storage**: Local JSON store (Lightweight & Portable)
*   **AI Integration**: Simulated or API-based LLM integration (OpenAI/Anthropic compatible structure)

---

## 📦 Installation & Setup

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/workflow-builder-lite.git
    cd workflow-builder-lite
    ```

2.  **Install Dependencies**:
    Navigate to the root directory and install dependencies for both the client and server.
    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3.  **Run the Application**:
    Start both the frontend and backend servers.
    ```bash
    # In one terminal (Server)
    cd server
    node index.js

    # In another terminal (Client)
    cd client
    npm run dev
    ```

4.  **Access the App**:
    Open your browser and navigate to `http://localhost:5173`.


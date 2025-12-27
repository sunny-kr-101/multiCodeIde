# 🧠 multiCodeIde

**multiCodeIde** is a full-stack web application that provides a **multilingual code editor / IDE environment** allowing users to **write, edit, execute, and manage code online** with support for multiple languages and potentially AI-assisted features.

This project includes  
✅ a **Frontend** (user interface)  
🛠 a **Backend** (API server, code execution, AI features, etc.)

---

## 💡 Key Features

✔️ Multi-language support (e.g., JavaScript, Python, C++, HTML)  
✔️ Browser-based code editor with syntax highlighting, formatting & execution  
✔️ Real-time code interaction  
✔️ AI-assisted code generation & review (via integrated LLM)  
✔️ Save, load, and manage projects  
✔️ Built with modern web tech — React frontend + Node.js backend

---

## 📁 Project Structure

multiCodeIde/
├── backend/ # Node.js backend server
├── frontend/ # React-based frontend UI
├── .env # Environment configuration
├── README.md # Project documentation
├── package.json
└── ...

yaml
Copy code

---

## 🛠️ Tech Stack

| Layer        | Technology |
|--------------|-------------|
| Frontend     | React, Vite, Tailwind CSS (or similar) |
| Backend      | Node.js, Express |
| Code Editor  | Monaco Editor / Ace / CodeMirror |
| AI Features  | Google Generative AI / OpenAI / LLM APIs |
| Communication| REST APIs / WebSockets |

---

## 🔧 Prerequisites

Before running the project, make sure you have:

✔️ Node.js (v16+) installed  
✔️ npm or yarn  
✔️ A valid AI API key (for AI features)

---

## 🚀 Installation

### Clone the repo

```bash
git clone https://github.com/sunny-kr-101/multiCodeIde.git
cd multiCodeIde
Configure environment
Create a .env file in the project root and backend folder:

ini
Copy code
API_KEY=your_ai_api_key_here
PORT=3000
⚙️ Running Backend
bash
Copy code
cd backend
npm install
npm start
The backend should start on:

arduino
Copy code
http://localhost:3000
🏗️ Running Frontend
bash
Copy code
cd frontend
npm install
npm run dev
Open your browser and navigate to:

arduino
Copy code
http://localhost:5173
🧪 Usage
Open the editor in your browser

Select file/language you want to code in

Write or paste code

Run / evaluate code (supported languages)

(Optional) Use AI features to auto-generate or review code snippets

📦 Example API Usage
Send code to the backend for review or execution:

bash
Copy code
curl -X POST http://localhost:3000/ai/get \
   -H "Content-Type: application/json" \
   -d '{ "code": "console.log(\"Hello World\");", "language": "javascript" }'
🙌 Contributing
Contributions are always welcome!
You can help by adding:

⭐ Support for more languages
✨ Editor features (auto-complete, linting)
📦 Docker deployment setup
🔍 Improved AI workflows

📖 License
This project is open source — feel free to use, modify, and distribute!

❓ Support
If you have questions or need help, open an issue or reach out to the maintainer.

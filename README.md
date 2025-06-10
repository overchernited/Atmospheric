🌌 Atmospheric
Atmospheric is a full-stack web application built with React on the frontend and Node.js with Express on the backend, delivering an interactive and dynamic user experience.

🛠️ Technologies
Frontend: React ⚛️, TypeScript 📝, CSS Modules 🎨

Backend: Node.js 🟢, Express 🚂, TypeScript 📝

Database: PostgreSQL 🐘 (pg client)

Environment: dotenv 🌱

Development: ts-node-dev 🔄 (hot-reloading backend)

✨ Features
Modern and responsive UI with React ⚛️

REST API backend for data management 🔌

Secure PostgreSQL connection with SSL 🔒

Environment variables for flexible configuration 🔧

Fast development with TypeScript and auto-reload ⚡

🚀 Installation
Clone the repo:

bash
Copiar código
git clone https://github.com/overchernited/Atmospheric.git
cd Atmospheric
Install backend dependencies:

bash
Copiar código
cd Server
pnpm install
Configure environment variables in .env (inside Server):

env
Copiar código
PORT=3000
PGHOST=interchange.proxy.rlwy.net
PGUSER=postgres
PGPASSWORD=your_password
PGDATABASE=railway
PGPORT=50250
Start the backend server:

bash
Copiar código
pnpx ts-node-dev src/index.ts
Install frontend dependencies:

bash
Copiar código
cd ../Frontend
pnpm install
Start the frontend:

bash
Copiar código
pnpm start
🌐 Usage
Access frontend at: http://localhost:3000 🌍

Backend runs at: http://localhost:3000 (configurable) 🖥️

Root backend route / returns current DB time ⏰

🤝 Contributing
Contributions are welcome! Open issues or PRs to help improve the project. 💪✨

📄 License
MIT License © 2025

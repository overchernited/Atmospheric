# 🌌 Atmospheric

Atmospheric is a full-stack web application built with React on the frontend and Node.js with Express on the backend. It uses PostgreSQL as its database and is designed to be fast, secure, and easy to develop.

---

## 🛠️ Technologies Used

- **Frontend:** React ⚛️, TypeScript 📝, CSS Modules 🎨  
- **Backend:** Node.js 🟢, Express 🚂, TypeScript 📝  
- **Database:** PostgreSQL 🐘  
- **Environment:** dotenv 🌱  
- **Development:** ts-node-dev 🔄 for hot-reloading backend  

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)  
- PostgreSQL database (can be remote)  
- pnpm or npm package manager  

### Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/overchernited/Atmospheric.git
    cd Atmospheric
    ```

2. Install backend dependencies:

    ```bash
    cd Server
    pnpm install
    ```

3. Set up your `.env` file inside the `Server` folder with your database credentials:

    ```env
    PORT=3000
    PGHOST=interchange.proxy.rlwy.net
    PGUSER=postgres
    PGPASSWORD=your_password_here
    PGDATABASE=railway
    PGPORT=50250
    ```

4. Start the backend server:

    ```bash
    pnpx ts-node-dev src/index.ts
    ```

5. Open a new terminal, install frontend dependencies, and start the frontend:

    ```bash
    cd ../Frontend
    pnpm install
    pnpm start
    ```

---

## 🌐 Usage

- Frontend runs at: `http://localhost:3000`  
- Backend API runs at: `http://localhost:3000` (configurable via `.env`)  
- The root backend route `/` responds with the current database time 🕒  

---

## 🤝 Contributing

Contributions are very welcome! Feel free to open issues or submit pull requests to improve this project. 🙌✨

---

## 📄 License

This project is licensed under the MIT License © 2025

---

Made with ❤️ by Overchernited

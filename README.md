# ThinkGPT 🤖✨

**ThinkGPT** is a powerful, full-stack AI-powered SaaS application designed to provide users with intelligent conversations and creative image synthesis. Built with the **MERN stack** (MongoDB, Express, React, Node.js), it leverages advanced AI models to deliver a seamless and premium user experience.

## 🚀 Features

- **🧠 Intelligent AI Chat**: Engage in deep, context-aware conversations with state-of-the-art LLMs (Gemini).
- **🎨 AI Image Generation**: Create stunning, realistic images from text prompts and share them with the community.
- **💳 Credit System**: Robust credit-based usage model integrated with secure payment processing.
- **🔐 Secure Authentication**: Complete user registration and login system protected by JWT.
- **💸 Stripe Integration**: Seamless secure checkout for purchasing credits.
- **🌗 Dark/Light Mode**: Beautiful, responsive UI with automatic and manual theme toggling.
- **📱 Fully Responsive**: Optimized experience across desktop, tablet, and mobile devices.
- **📂 Chat History**: Automatically save, manage, and revisit your past conversations.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React.js](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: Context API
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Gateway**: [Stripe](https://stripe.com/)
- **AI Integration**: Google Gemini API

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas connection string)
- Stripe Account (Public/Secret keys)
- Gemini API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ThinkGPT.git
    cd ThinkGPT
    ```

2.  **Backend Setup**
    Navigate to the backend folder and install dependencies:
    ```bash
    cd backend
    npm install
    ```
  
    Start the backend server:
    ```bash
    npm run server
    ```

3.  **Frontend Setup**
    Navigate to the frontend folder and install dependencies:
    ```bash
    cd ../frontend
    npm install
    ```
    Start the development server:
    ```bash
    npm run dev
    ```

4.  **Access the App**
    Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📖 API Reference



### 👤 User Management
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/user/register` | Register a new user | No |
| `POST` | `/user/login` | Authenticate user & get token | No |
| `GET` | `/user/data` | Get user profile & credits | **Yes** |
| `GET` | `/user/published-images` | Get community feed images | No |

### 💬 Chat Operations
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/chat/create` | Start a new chat session | **Yes** |
| `GET` | `/chat/get` | Fetch all user chats | **Yes** |
| `POST` | `/chat/delete` | Delete a specific chat | **Yes** |

### 🤖 AI Models
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/message/text` | Generate text response | **Yes** |
| `POST` | `/message/image` | Generate AI image | **Yes** |

### 💳 Payments
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/credit/plans` | List purchase plans | No |
| `POST` | `/credit/purchase` | Create Stripe checkout session | **Yes** |

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

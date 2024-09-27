# 📺 StreamChat
StreamChat is an interactive movie, series, and TV show watching platform where users can stream content together and chat in real-time. This project leverages the MERN stack for seamless real-time communication, allowing users to engage in shared experiences across multiple devices.

## 🚀 Demo
[streamchat1.netlify.app](https://streamchat1.netlify.app)

## 🌐 Tech Stack
- **Fronend:** React.js, Socket.io, TailwindCSS
- **Backend:** Node.js, Express.js, Socket.io
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Hosting:** Vercel (Frontend), Heroku (Backend)
- **Media Storage API:** Cloudinary API
  
## 🎨 Screenshots

## 🔑 Key Features
- **Real-time Chat:** Engage in real-time conversations while watching content.
- **Watch Parties:** Create or join watch parties with friends or the community.
- **Cross-Device Support:** Stream and chat across devices, ensuring a synchronized viewing experience.
- **JWT Authentication:** Secure user authentication with token-based authorization.

## 📦 How to Use
1. Clone the repository:

```
git clone https://github.com/yourusername/streamchat.git
cd streamchat
```
2. Install dependencies:
- In frontend:
  ```
  cd stream\ chat/
  npm install
  ```
- In backend:
  ```
  cd stream\ chat\ backend/
  npm install
  ```
3. Create a .env file in the root directory and add the following:
   ```
   PORT=[your port number]
   MONGODB_URI=[your mongoDB URI]
   JWT_SECRET=[your jwt secret]
   CLOUDINARY_CLOUD_NAME: [your cloudinary cloud name]
   CLOUDINARY_API_KEY: [your cloudinary api key]
   CLOUDINARY_API_SECRET: [your cloudinary api secret]
   ```
4. Run the backend server
   ```
   cd stream\ chat\ backend/
   npm run dev
   ```
5. Run the frontend server
   ```
   cd stream\ chat/
   npm run dev
   ```

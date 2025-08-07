# 🚀 TechAscend - EdTech Platform

TechAscend is a full-stack, feature-rich EdTech platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It enables **students** to consume and rate educational content, **instructors** to create and manage courses, and **admins** (future scope) to oversee the platform’s performance and userbase. TechAscend aims to transform online education into an engaging, accessible, and scalable experience.

---

## 📚 Table of Contents

- [💡 Usage](#-usage)
- [📌 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation & Setup](#-installation--setup)
- [🧪 API Endpoints](#-api-endpoints)
- [🌐 Deployment](#-deployment)
- [🚧 Future Enhancements](#-future-enhancements)
- [🤝 Contributing](#-contributing)
- [🧠 Credits](#-credits)
- [📊 Badges](#-badges)

---

## 💡 Usage

- Visit: `https://techascend-frontend.vercel.app`
- Sign up as student/instructor
- Browse, purchase, or create courses
- Use dashboard tools for insights

## 📌 Features

### 👩‍🎓 For Students
- Sign up / Login / OTP verification
- Browse and purchase courses
- Wishlist and cart
- Course player with markdown & video content
- Profile and password management
- Course reviews and ratings

### 👨‍🏫 For Instructors
- Instructor dashboard with metrics
- Create, update, and delete courses
- Upload media (videos, images, PDFs)
- Course pricing and insights

### 🛡️ For Admins *(future scope)*
- Manage users, instructors, and courses
- Platform-wide analytics and reporting

---

## 🛠️ Tech Stack

### Frontend
- **React.js** + **Redux Toolkit**
- **Tailwind CSS** + **Custom Styling**
- **Axios**, **React Router**, **Toasts**

### Backend
- **Node.js**, **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Auth**, **Bcrypt**, **Cloudinary**

### Integrations
- **Razorpay** (Payment)
- **Cloudinary** (Media Uploads)
- **MongoDB Atlas** (Database Hosting)

---

## 📦 Installation & Setup

> Clone and set up both frontend and backend:

### Prerequisites
- Node.js ≥ 16
- MongoDB instance (local or Atlas)
- Cloudinary account
- Razorpay keys

### 1️⃣ Backend Setup

```bash
git clone https://github.com/kratinkeshari/TechAscend_EdTech.git
cd TechAscend_EdTech/server
npm install
```

- Create a `.env` file with:

```env
PORT=4000
DATABASE_URL=<your_mongo_uri>
MAIL_PASS=<your_mail_pass>
MAIL_HOST=<your_mail_host>
MAIL_USER=<your_mail_user>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_FOLDER=your_cloudinary_folder_name
CLOUDINARY_CLOUD=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

- Start backend:

```bash
npm run dev
```

### 2️⃣ Frontend Setup

```bash
cd ../client
npm install
npm start
```

---

## 🧪 API Endpoints

| Method | Endpoint                          | Description                       |
|--------|-----------------------------------|-----------------------------------|
| POST   | `/api/v1/auth/signup`             | Register user                     |
| POST   | `/api/v1/auth/login`              | Login and receive JWT             |
| POST   | `/api/v1/auth/sendOTP`            | OTP Verification                  |
| POST   | `/api/v1/auth/changepassword`     | Reset password via email          |
| GET    | `/api/v1/course/getAllCourses`    | Fetch all courses                 |
| GET    | `/api/v1/course/getCourseDetails` | Fetch single course               |
| POST   | `/api/v1/course/createCourse`     | Create course (Instructor only)   |
| PUT    | `/api/v1/course/editCourse`       | Update course                     |
| DELETE | `/api/v1/course/deleteCourse`     | Delete course                     |
| POST   | `/api/v1/course/createRatingcourse/`| Rate a course                     |

📘 Full API Docs: [Postman Collection](https://www.postman.com/your-team/workspace) *(to be updated)*
---

## 🌐 Deployment

| Service     | Usage                        |
|-------------|------------------------------|
| **Vercel**  | Frontend Hosting             |
| **Render**  | Backend Hosting              |
| **Cloudinary** | Media Storage (videos/images) |
| **MongoDB Atlas** | Database Hosting         |

---

## 🚧 Future Enhancements

| Feature                          | Priority        |
|----------------------------------|-----------------|
| Personalized learning paths      | 🔥 High        |
| Gamification (badges/leaderboard)| 🔄 Medium      |
| Mobile App                       | 📱 High        |
| Social learning (groups/discuss) | 🤝 Medium      |
| AI-powered recommendations       | 🤖 Medium-High |
| VR/AR course modules             | 🧠 Low-Medium  |

---

## 🤝 Contributing

We welcome contributions!

```bash
1. Fork the repository
2. Create your feature branch (git checkout -b feature/xyz)
3. Commit changes (git commit -m 'Add xyz feature')
4. Push to branch (git push origin feature/xyz)
5. Open a Pull Request
```

> Please read our `CONTRIBUTING.md` (to be added) for more guidelines.

---

## 🧠 Credits

- Project by **Kratin Keshari**
- Thanks to [CodeHelp](https://www.youtube.com/c/CodeHelp) for content inspiration
- Special thanks to the Open Source community 🙌

---

## 📊 Badges

![GitHub repo size](https://img.shields.io/github/repo-size/kratinkeshari/TechAscend_EdTech)
![GitHub stars](https://img.shields.io/github/stars/kratinkeshari/TechAscend_EdTech?style=social)
![GitHub forks](https://img.shields.io/github/forks/kratinkeshari/TechAscend_EdTech?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/kratinkeshari/TechAscend_EdTech)
![Issues](https://img.shields.io/github/issues/kratinkeshari/TechAscend_EdTech)

---

> Made with ❤️ by Kratin Keshari
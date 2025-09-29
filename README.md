# 📋 TodoList MERN

Một ứng dụng quản lý công việc (Todo List) được xây dựng với MERN Stack (MongoDB, Express.js, React, Node.js) và Docker. Ứng dụng cho phép người dùng tạo, quản lý và theo dõi các công việc hàng ngày một cách hiệu quả.

## Tính năng

### Xác thực người dùng

- Đăng ký tài khoản mới
- Đăng nhập/đăng xuất
- Bảo mật với JWT tokens

### Quản lý công việc

- Thêm công việc mới với tiêu đề và mô tả
- Đánh dấu hoàn thành/chưa hoàn thành
- Chỉnh sửa công việc trực tiếp (inline editing)
- Xóa công việc với modal xác nhận

### Giao diện người dùng

![alt text](image-1.png)

- Thiết kế hiện đại với Tailwind CSS
- Responsive design, tương thích mọi thiết bị
- Hiệu ứng hoạt hình mượt mà
- Thông báo toast cho các hành động

### Lọc

- Xem tất cả công việc
- Lọc công việc đang chờ
- Lọc công việc đã hoàn thành

## Công nghệ sử dụng

### Frontend

- **React 19.1.1** - Thư viện UI
- **Vite** - Build tool và dev server
- **Tailwind CSS 4.1.13** - CSS framework
- **React Router Dom 7.9.2** - Routing
- **React Query 5.90.2** - State management và data fetching
- **Axios 1.12.2** - HTTP client
- **React Toastify 11.0.5** - Notifications

### Backend

- **Node.js 20** - Runtime environment
- **Express.js 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.18.2** - ODM cho MongoDB
- **JWT** - Authentication tokens
- **bcryptjs 3.0.2** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing

### DevOps & Tools

- **Docker & Docker Compose** - Containerization
- **Nodemon 3.1.10** - Development auto-reload
- **ESLint** - Code linting
- **Nginx** - Production web server

## 📁 Cấu trúc dự án

```
ToDoList-MERN/
├── Todo_Client/                 # Frontend React application
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Layout.jsx       # Main layout wrapper
│   │   │   ├── TaskItem.jsx     # Individual task component
│   │   │   ├── AddTaskModal.jsx # Modal for adding tasks
│   │   │   ├── ConfirmDelete.jsx # Confirmation modal
│   │   │   └── ...
│   │   ├── pages/               # Page components
│   │   │   ├── HomePage.jsx     # Landing page
│   │   │   ├── LoginPage.jsx    # Login page
│   │   │   ├── RegisterPage.jsx # Registration page
│   │   │   ├── DashboardPage.jsx # Main dashboard
│   │   │   └── ...
│   │   ├── context/             # React contexts
│   │   │   └── authContext.jsx  # Authentication context
│   │   ├── services/            # API services
│   │   │   └── api.js           # API endpoints
│   │   └── assets/              # Static assets
│   ├── DockerFile               # Development Dockerfile
│   ├── Dockerfile.prod          # Production Dockerfile
│   ├── nginx.conf               # Nginx configuration
│   ├── package.json
│   └── vite.config.js
│
├── Todo_Server/                 # Backend Node.js application
│   ├── src/
│   │   ├── config.js            # Configuration settings
│   │   ├── server.js            # Main server file
│   │   ├── middleware/          # Express middlewares
│   │   │   └── authMiddleware.js # JWT authentication
│   │   ├── models/              # Mongoose models
│   │   │   ├── User.js          # User model
│   │   │   └── Task.js          # Task model
│   │   └── routes/              # API routes
│   │       ├── auth.js          # Authentication routes
│   │       └── task.js          # Task management routes
│   ├── Dockerfile               # Server Dockerfile
│   ├── package.json
│   └── .env                     # Environment variables
│
├── docker-compose.yml           # Development docker compose
├── docker-compose.prod.yml      # Production docker compose
└── README.md                    # Documentation
```

## Cài đặt và chạy dự án

### Yêu cầu hệ thống

- **Docker** và **Docker Compose**
- **Node.js 20+** (nếu chạy local)
- **MongoDB** (nếu chạy local)

### Chạy với Docker (Khuyến nghị)

#### Development Mode

```bash
# Clone repository
git clone https://github.com/TuMinhIT/ToDoList-MERN.git
cd ToDoList-MERN

# Chạy development environment
docker-compose up --build

# Hoặc chạy ngầm
docker-compose up --build -d
```

#### Production Mode

```bash
# Chạy production environment
docker-compose -f docker-compose.prod.yml up --build -d
```

### Chạy Local Development

#### Backend

```bash
cd Todo_Server

# Cài đặt dependencies
npm install

# Tạo file .env với nội dung:
# MONGO_URI=mongodb://localhost:27017/todoapp
# JWT_SECRET=your_jwt_secret_key
# PORT=5005

# Chạy development server
npm run dev
```

#### Frontend

```bash
cd Todo_Client

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

### Truy cập ứng dụng

- **Frontend (Development)**: http://localhost:5173
- **Frontend (Production)**: http://localhost
- **Backend API**: http://localhost:5005
- **MongoDB**: mongodb://localhost:27017

## API Endpoints

### Authentication

POST /api/auth/register # Đăng ký tài khoản
POST /api/auth/login # Đăng nhập

### Tasks Management

GET /api/tasks # Lấy danh sách công việc
POST /api/tasks # Tạo công việc mới
PUT /api/tasks/:id # Cập nhật công việc
DELETE /api/tasks/:id # Xóa công việc

## Cấu hình Environment Variables

### Backend (.env)

```env
# Database
MONGO_URI=mongodb://db:27017/todoapp

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# Server
PORT=5005
NODE_ENV=development
```

### Frontend

```env
# API Base URL
VITE_API_URL=http://localhost:5005/api
```

## Docker Commands

### Development Commands

```bash
# Build và chạy tất cả services
docker-compose up --build

# Chạy ngầm
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng tất cả services
docker-compose down

# Rebuild specific service
docker-compose build todo_client
docker-compose build todo_server
```

### Production Commands

```bash
# Chạy production với nginx
docker-compose -f docker-compose.prod.yml up --build -d

# Scale services
docker-compose -f docker-compose.prod.yml up --scale todo_server=3

# Monitor logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Useful Docker Commands

```bash
# Xem containers đang chạy
docker ps

# Truy cập container
docker exec -it todo_server bash
docker exec -it todo_client sh

# Xóa tất cả containers và images
docker system prune -a

# Xem resource usage
docker stats
```

## 🚀 Deployment

### Deploy với Docker

1. Build production images
2. Push lên Docker registry
3. Deploy trên server với docker-compose

### Deploy Frontend (Netlify/Vercel)

```bash
cd Todo_Client
npm run build
# Upload dist folder
```

### Deploy Backend (Heroku/Railway)

```bash
cd Todo_Server
# Configure environment variables
# Deploy với Git
```

## Author

**TuMinhIT**

- GitHub: [@TuMinhIT](https://github.com/TuMinhIT)

## Support

Nếu bạn gặp vấn đề hoặc có câu hỏi, hãy tạo issue trên GitHub repository.

## Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Node.js Documentation](https://nodejs.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Docker Documentation](https://docs.docker.com/)

---

⭐ **Star** repository này nếu bạn thấy hữu ích!

# 📝 Blog Site - Backend Development Project

> **A comprehensive blog platform built with Node.js, Express, and MongoDB**

This is a full-stack blog application designed as a learning project for backend development students. The project demonstrates essential backend concepts including CRUD operations, user authentication, authorization middleware, and role-based access control.

## 🎯 Project Overview

This blog platform allows users to read articles and enables authors to create, edit, and manage their own blog posts. The project emphasizes backend development skills while providing a complete, functional web application.

<!-- ### 🚀 Live Demo

_[Add your deployed application URL here]_ -->

<!-- ### 📸 Screenshots

_[Add screenshots of your application here]_ -->

## ✨ Features

### Core Functionality

- 📚 **Full CRUD Operations** for blog posts
- 👥 **User Management System** with registration and authentication
- 🔐 **Secure Authentication** using JWT tokens
- 🛡️ **Role-Based Access Control** (Reader vs Author permissions)
- 📊 **Author Dashboard** for content management
- 📱 **Responsive Design** for all devices

### User Roles

- **Reader**: Can view all blog posts and create an account
- **Author**: Can create, edit, delete their own posts + all reader permissions

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **express-validator** - Input validation

### Frontend

- **EJS** - Templating engine
- **HTML5 & CSS3** - Structure and styling
- **JavaScript** - Client-side functionality

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/kenebebh/my-blog-backend.git
   cd my-blog-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/blogsite
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

4. **Start MongoDB**

   ```bash
   # If using local MongoDB
   mongod

   # Or make sure your MongoDB Atlas connection is configured
   ```

5. **Run the application**

   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

<!-- ## 📁 Project Structure -->

<!-- ```
myBlog/
├── 📁 controllers/          # Route handlers and business logic
│   ├── authController.js    # Authentication logic
│   ├── postController.js    # Blog post operations
│   └── userController.js    # User management
├── 📁 middleware/           # Custom middleware functions
│   ├── auth.js             # Authentication middleware
│   └── roleAuth.js         # Role-based authorization
├── 📁 models/              # Database schemas
│   ├── Post.js             # Blog post schema
│   └── User.js             # User schema
├── 📁 routes/              # API route definitions
│   ├── auth.js             # Authentication routes
│   ├── posts.js            # Blog post routes
│   └── users.js            # User routes
├── 📁 views/               # EJS templates
│   ├── partials/           # Reusable template parts
│   ├── home.ejs            # Homepage
│   ├── login.ejs           # Login form
│   ├── signup.ejs          # Registration form
│   ├── dashboard.ejs       # Author dashboard
│   ├── create-post.ejs     # Create post form
│   └── edit-post.ejs       # Edit post form
├── 📁 public/              # Static assets
│   ├── css/               # Stylesheets
│   ├── js/                # Client-side JavaScript
│   └── images/            # Image assets
├── 📁 config/              # Configuration files
│   └── database.js         # Database connection
├── .env.example            # Environment variables template
├── .gitignore             # Git ignore rules
├── package.json           # Project dependencies
├── server.js              # Application entry point
└── README.md              # Project documentation
``` -->

## 🔧 API Endpoints

<!-- ### Authentication Routes
```http
POST   /api/auth/signup     # User registration
POST   /api/auth/login      # User login
POST   /api/auth/logout     # User logout
GET    /api/auth/profile    # Get current user profile
``` -->

### Blog Post Routes

```http
GET    /api/posts           # Get all blog posts
GET    /api/posts/:id       # Get single blog post
POST   /api/posts           # Create new post (Authors only)
PATCH    /api/posts/:id     # Edit post (Author of post only)
DELETE /api/posts/:id       # Delete post (Author of post only)
```

<!-- ### User Routes
```http
GET    /api/users/dashboard # Author dashboard (Authors only)
GET    /api/users/:id       # Get user profile
PUT    /api/users/:id       # Update user profile -->
<!-- ``` -->

## 🗃️ Database Schema

### User Schema

```javascript
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['reader', 'author'], default: 'reader' },
  createdAt: { type: Date, default: Date.now }
}
```

### Post Schema

```javascript
{
  title: { type: String, required: true },
  author: { type: ObjectId, ref: 'User', required: true },
  body: { type: String, required: true },
  excerpt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

<!-- ## 🔐 Authentication & Authorization

This project implements **JWT-based authentication** with **role-based authorization**:

- **JWT Tokens**: Secure, stateless authentication
- **Password Hashing**: Using bcrypt for secure password storage
- **Protected Routes**: Middleware-based route protection
- **Role Permissions**: Different access levels for readers and authors

### Example Usage
```javascript
// Protected route example
router.get('/dashboard', authenticateToken, requireAuthor, getDashboard); -->

<!-- // Middleware checks:
// 1. authenticateToken: Validates JWT token
// 2. requireAuthor: Ensures user has 'author' role
``` -->
<!--
## 🧪 Testing the Application

### Manual Testing Workflow

1. **User Registration**
   - Visit `/signup` and create an account
   - Choose role: 'reader' or 'author'

2. **User Login**
   - Visit `/login` with your credentials
   - Verify JWT token is stored

3. **Blog Post Operations** (Authors only)
   - Create posts via `/posts/create`
   - Edit posts via `/posts/:id/edit`
   - Delete posts from dashboard

4. **Authorization Testing**
   - Try accessing author routes as a reader
   - Verify proper error messages -->

### API Testing with Tools

Use **Postman** or **Thunder Client** to test API endpoints:

```bash
# Example API calls
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"author@example.com","password":"password123"}'

curl -X GET http://localhost:3000/api/posts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🎓 Learning Objectives

This project teaches students:

### Backend Concepts

- ✅ RESTful API design and implementation
- ✅ Database modeling with Mongoose
- ✅ User authentication and session management
- ✅ Middleware pattern and custom middleware
- ✅ Role-based authorization
- ✅ Error handling and validation
- ✅ Security best practices

### Development Skills

- ✅ Project structure and organization
- ✅ Environment configuration
- ✅ API testing and debugging
- ✅ Git version control
- ✅ Documentation writing

## 🚧 Common Issues & Solutions

### JWT Token Problems

```javascript
// Common issue: Token not being sent properly
// Solution: Check Authorization header format
Authorization: Bearer <your-token-here>
```

### CORS Issues

```javascript
// Add CORS middleware if testing with frontend frameworks
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
```

## 📚 Learning Resources

### Recommended Reading

- [Express.js Official Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [RESTful API Design Best Practices](https://restfulapi.net/)

## 🤝 Contributing

This is a learning project, but contributions are welcome!

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Assignment Checklist

### Minimum Requirements (70%)

- [ ] CRUD operations for blog posts
- [ ] CRUD operations for users
- [ ] User registration, authentication, and login functionality
- [ ] JWT-based authentication
- [ ] Role-based access control
- [ ] Author dashboard
- [ ] Basic error handling

### Additional Features (30%)

- [ ] Input validation and sanitization
- [ ] Password strength requirements
- [ ] Post pagination
- [ ] Search functionality
- [ ] User profile management
- [ ] Comprehensive error messages
- [ ] API documentation

## 🐛 Troubleshooting

### Can't connect to database?

- Verify MongoDB is running
- Check your connection string in `.env`
- Ensure database name is correct

### Authentication not working?

- Check JWT secret in environment variables
- Verify token is being sent in headers
- Confirm middleware order in routes

### Routes returning 404?

- Check route definitions match your requests
- Verify middleware is not blocking requests
- Ensure proper HTTP methods (GET, POST, PUT, DELETE)

## 🎉 Project Completion

Once you complete this project, you will have built:

- A secure, scalable backend API
- User authentication and authorization system
- Database-driven content management
- Role-based access control
- A complete blog platform

## 📞 Support

Having trouble? Here are your options:

1. Check this README for common solutions
2. Review the code comments and documentation
3. Ask questions during class or office hours
4. Collaborate with classmates (but write your own code!)

## 📄 License

This project is for educational purposes. Feel free to use it as a learning resource.

---

**Happy Coding! 🚀**

_Remember: The best way to learn backend development is by building real projects. Take your time, experiment, and don't be afraid to break things - that's how you learn!_

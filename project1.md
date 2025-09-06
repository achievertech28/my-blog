Blog Site Project Guide

1. Project Overview
   Welcome to your first backend development project! In this project, you will build a complete blog website from scratch. By the end, you will have a solid understanding of how a web server handles requests, interacts with a database, and manages user data.

This project is a fantastic opportunity to apply the fundamental concepts of Node.js, Express, and Mongoose that we have covered in class.

2. Core Features
   Our goal is to create a blog site with the following essential features:

CRUD Blog Posts: You will build the essential functionality for Creating, Reading, Updating, and Deleting blog posts, which forms the foundation of the site's content management system.

CRUD Users: You will manage user data, including Creating a new user during sign-up, Reading user information for their profile, and potentially Updating or Deleting a user's account.

User Authentication: You will implement a secure system for users to sign up and log in, ensuring only verified users can access certain parts of the application.

Authentication Middleware: You will create special functions that act as a "gatekeeper" for your routes, checking if a user is logged in before allowing them to proceed.

Role-Based Feature Implementations on the Backend: You will implement a system that grants different permissions based on a user's role (e.g., "author" vs. "reader"). This ensures that only authors can create or edit articles.

Author Dashboard: You will create a private page accessible only to authors, where they can view and manage their own articles.

3. Backend Engineering: Your Learning Objectives
   As the backend engineer, you will be responsible for building the server-side logic that powers this website. Here are the specific concepts you will implement:

Database Modeling (Mongoose Schemas): You will use Mongoose to define two key data schemas:

Post Schema: To store blog post data, including title, content, and a reference to the author.

User Schema: To store user data, including username, email, a hashed password, and a crucial role field (reader or author) for authorization.

CRUD Operations: You will create API routes for all four essential operations:

Create: A POST route to create a new blog post.

Read: GET routes to fetch all posts and a single post.

Update: A PUT or PATCH route to edit an existing post.

Delete: a DELETE route to remove a post.

User Authentication: Implement a system for users to sign up and log in. You will learn to use a library like bcrypt to securely hash passwords and manage user sessions (or JWTs).

Authorization Middleware: You will create middleware functions that run before a route is accessed. These functions will check if the user is logged in and, more importantly, if their role is 'author' before allowing access to routes like /posts/create or /posts/:id/edit.

Route Protection: Use your middleware to protect sensitive routes, ensuring that only authenticated and authorized users can perform certain actions.

4. Frontend Pages: What to Build
   While the primary focus is the backend, you will need some basic frontend pages to test your API and display content. You can build these using a simple templating engine like EJS, or plain HTML/CSS/JavaScript.

Home Page (/): A list of all blog posts, with links to view each one.

Single Post Page (/posts/:id): Displays a single blog post's content.

Login Page (/login): A form for users to log in.

Sign-Up Page (/signup): A form for new users to create an account.

Author Dashboard (/dashboard): A private page that lists all articles written by the logged-in author, with buttons to "Edit" or "Delete" each one.

Create Post Page (/posts/create): A form for an author to create a new article.

Edit Post Page (/posts/:id/edit): A form to update an existing article.

query mongodb article _[https://www.mongodb.com/docs/atlas/atlas-ui/query/filter/_]

reex mongodb article _[https://www.mongodb.com/docs/manual/reference/operator/query/regex/#mongodb-query-op.-regex]_

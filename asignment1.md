# Assignment: Build CRUD Endpoints for Users

## 🎯 Goal

You have already learned how to create **CRUD (Create, Read, Update, Delete)** endpoints for blog posts.  
Now, your task is to **apply the same knowledge to users**. This will help you practice working with multiple collections and building your backend systems like a pro.

---

## 📌 User Schema

Each user should have the following fields:

- `firstName` (String, required) → the user’s first name
- `lastName` (String, required) → the user’s last name
- `email` (String, required, unique) → must be unique for each user
- `password` (String, required) → hashed later, but for now store as plain text (we’ll secure it later)
- `role` (String, default: `"reader"`) → can be `"reader"` or `"author"`

### Please learn how to validate your schema and how to specify required fields, unique fields

### Please also learn how to use timestamps in your schema. Timestamps add the field of createdAt and updatedAt into your document, and thee are very useful field that mongoose has simplified how we can create these field in our documents. You can test if your timestamps worked by doing a console.log of any document you created or just checking your mongoDB atlas.

you can refer to this article for a guide _[https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/]_

📌 Required Endpoints

1. Create User
   `POST /api/users`
   Request body should include: name, email, password, role.

2. Get All Users
   `GET /api/users`

3. Get User by ID
   `GET /api/users/:id`

4. Update User
   `PATCH /api/users/:id`
   Allow updating fields like name, email, role, password.

5. Delete User
   `DELETE /api/users/:id`

6. Search User by Name
   `GET /api/users/search?name=<username>`

   Example: `GET /api/users/search?name=John`
   Should return all users that match the given name (case-insensitive if possible).

# Bonus

- You could try to build frontend pages for these routes if you have the chace to, but pleae the main goal is to do the backend work and make sure your routes are all working on postman before you attemt to build a frontend. Thank you

# Assignment 2: Expand and improve your User controller functions

Now that youve learnt how to generate a JWT token and send it in a cookie when a uer logs in, you will also generate a token when the user is created, in your createUser function. In your createUser controller function, also check if the user already exists in our database (using the users email). if the uer exits, return an error that says uer already exists. if the uer doesnt exist, then create a new user and then after you create the user, generate a jwt token. You can also try your hand at implementing the logout functionality where you destroy (clear) the cookie

you can also build a frontend for your app and use the frontend to test your backend

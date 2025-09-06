# Authentication Methods Explained

## 1. Basic Authentication

**What it is**: The simplest form of HTTP authentication where credentials are sent with every request.

**How it works**:

1. Client sends username and password encoded in Base64
2. Server decodes and verifies credentials
3. This happens on EVERY request

**Pros**:

- Simple to implement
- Supported by all browsers
- No server-side session management needed

**Cons**:

- Credentials sent with every request (security risk)
- Base64 is encoding, NOT encryption. While it's encoded, it's not encrypted. This makes it highly vulnerable to being intercepted. It's almost never used in modern web applications.
- No logout mechanism
- Vulnerable without HTTPS

**Use Case**: Internal tools, APIs with HTTPS, development environments

---

## 2. Cookie-Based Authentication

**What it is**: Traditional web authentication using server sessions and browser cookies.

**How it works**:

1. User logs in with credentials
2. The server verifies the credentials. If correct, the server creates a session (a file or database entry) to remember the user is logged in.
3. The server generates a unique session ID and sends it back to the client in a cookie.
4. For every subsequent request, the browser automatically sends the cookie with the session ID.
5. The server looks up the session ID in its storage to identify the user

Analogy: A hotel check-in. When you check in, you get a key card (the cookie). The front desk (the server) keeps a record of which room (the user) you have. You use the key card to open your room, and you don't need to show your ID again and again.

**Example Flow**:

```
1. POST /login → username/password
2. Server creates session_id="abc123"
3. Set-Cookie: session_id=abc123; HttpOnly; Secure
4. Future requests include: Cookie: session_id=abc123
```

**Pros**:

- Automatic cookie handling by browsers
- Server controls session lifecycle
- Can implement features like "Remember Me"
- Good for traditional web applications

**Cons**:

- Requires server-side session storage
- CSRF vulnerability (need CSRF tokens)
- Not ideal for APIs or mobile apps
- Scalability challenges with multiple servers

**Use Case**: Traditional web applications, server-rendered pages

---

## 3. Token Authentication (General)

**What it is**: Authentication using tokens instead of sessions.

**How it works**:

1. User logs in with credentials
2. The server verifies the credentials and, if correct, creates a cryptographic token.
3. The server sends this token back to the client. The server does not keep any record of the token.
4. The client stores the token (e.g., in local storage) and sends it with every subsequent request.
5. The server verifies the token's authenticity using a secret key. If it's valid, the user is authenticated.

Analogy: A concert ticket. When you get your ticket, it contains all the information you need, and a special stamp proves it's real. The gatekeeper at the concert doesn't need a list of everyone who bought a ticket; they just need to check the ticket's authenticity.

**Pros**:

- Stateless (server doesn't store sessions)
- Works well with APIs and mobile apps
- Better for microservices architecture
- No CSRF vulnerability

**Cons**:

- Client responsible for token storage
- Token theft risks
- Need secure token storage strategy

---

## 4. JWT (JSON Web Tokens)

**What it is**: A specific type of token that contains encoded user information, and used for token-based authentication. It is now the common industry standard.

**Structure**: Three parts separated by dots (.)

- **Header**: Tells you what type of token it is and what algorithm was used to sign it.
- **Payload**: Contains the claims, which are statements about the user (e.g., user ID, username, and their role like author).
- **Signature**: A unique hash created using the header, payload, and a secret key known only to the server. This is what makes the token verifiable and tamper-proof.

**Example JWT**:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**How it works**:

1. User logs in
2. Server creates JWT with user info and expiration and sends this to the frontend(client)
3. Client stores JWT
4. Client sends JWT with requests
5. Server validates JWT signature and expiration

**Pros**:

- Self-contained (no database lookup needed)
- Stateless
- Can include user information
- Standard format (RFC 7519)
- Works across different domains

**Cons**:

- Larger than simple tokens
- Cannot revoke individual tokens easily
- Sensitive data exposed in payload (though signed)
- Token size grows with claims

**Use Case**: APIs, SPAs, microservices, cross-domain authentication

---

## 5. OAuth

**What it is**: OAuth is fundamentally different from the methods above. It is not about authenticating a user with your own application. It's about getting permission to access a user's data on a third-party service. It's an authorization framework that allows third-party applications to access user resources without sharing passwords.

**Key Players**:

- **Resource Owner**: The user
- **Client**: The application wanting access
- **Authorization Server**: Issues tokens (e.g., Google)
- **Resource Server**: Holds the protected data

**Common Flow (Authorization Code)**:

1. Client redirects user to authorization server
2. User logs in and grants permission
3. Authorization server redirects back with authorization code
4. Client exchanges code for access token
5. Client uses access token to access protected resources

How it works:

Your application wants to access a user's Google Photos.

You redirect the user to a Google login page.

The user logs in with Google and approves the request to share their photos with your app.

Google sends your application a special token (an access token) that gives you permission to access the user's photos on their behalf.

**Pros**:

- Users don't share passwords with third parties
- Granular permissions (scopes)
- Standardized protocol
- Token refresh capabilities
- Supports multiple client types

**Cons**:

- Complex to implement correctly
- Multiple moving parts
- Security implications if misconfigured
- Requires understanding of flows

**Use Case**: "Login with Google/Facebook", API integrations, third-party app access

---

**My Analogy**:

- Basic Auth: Showing ID every time you enter a building
- Cookie Auth: Getting a wristband at an event
- JWT: A tamper-proof ID card with your info
- OAuth: Using your driver's license to prove identity at different places

---

## Key Security Considerations

- Always use HTTPS in production
- Implement proper token expiration
- Consider refresh token strategies
- Protect against XSS and CSRF
- Never store sensitive data in JWT payload
- Implement proper logout mechanisms
- Use secure cookie flags (HttpOnly, Secure, SameSite)

///////////////////////////////////////////////////////////////////////////////////////////////////////

What is Hashing?
Hashing is the process of converting an input string of any length into a fixed-size string of characters, called a hash value or simply a hash. It's a one-way function, meaning it's computationally infeasible to reverse the process and get the original input from the hash. Password hashing is a security measure that protects user data by ensuring that passwords are never stored in plain text.

What is a Salt?
A salt is a unique, randomly generated string of data that is appended to a password before it is hashed. Each user's password gets a different salt, even if they have the same password. The primary purpose of using a salt is to prevent rainbow table attacks, where an attacker uses a pre-computed table of hashes to quickly find a password. Because each password has a unique salt, the resulting hash is also unique, making rainbow tables ineffective.

Password Hashing with bcrypt
Bcrypt is a strong password hashing algorithm that uses a variable number of iterations to make it computationally expensive for attackers to crack. Unlike simple hashing algorithms, bcrypt incorporates a salt, which is a random string of data added to the password before hashing. This makes it difficult to use pre-computed rainbow tables to crack passwords.

Here is a code example for hashing a password with bcrypt in Node.js using the bcrypt library:

const bcrypt = require('bcrypt');

const password = 'mysecretpassword';
const saltRounds = 10; // The cost factor

bcrypt.hash(password, saltRounds, (err, hash) => {
if (err) {
// Handle error
}
console.log('Hashed Password:', hash);
});

To check if a password matches a hash:

bcrypt.compare(password, hash, (err, result) => {
if (result) {
// Passwords match
} else {
// Passwords don't match
}
});

////////////////////////////////////////////////////////////////////////

What is a JWT token?

JWT stands for JSON Web Token.
It’s a compact, secure way of transmitting information between two parties (usually the server and the client) as a JSON object.

A JWT typically has 3 parts (separated by dots):

Header → contains metadata about the token (e.g., algorithm used).

Payload → contains the actual data/claims (e.g., user ID, role, expiration time).

Signature → ensures the token hasn’t been tampered with.

Example JWT (shortened):

xxxxx.yyyyy.zzzzz

How JWT works in a web app

A user logs in with their credentials.

The server verifies the credentials.

The server generates a JWT with the user’s details (like userId, role, etc.) and signs it with a secret key.

The JWT is sent to the client (usually stored in localStorage, sessionStorage, or a cookie).

For subsequent requests, the client includes the JWT (commonly in the Authorization header as Bearer <token>).

The server validates the token signature. If valid, it trusts the data inside (like user identity).

Why most modern web apps use JWT

✅ Stateless authentication: The server doesn’t need to keep a session in memory. The JWT itself carries all the necessary info.

✅ Scalable: Since no session state is stored on the server, multiple servers (or microservices) can easily verify the token as long as they share the secret key/public key.

✅ Secure (when used properly): Tokens are signed (and optionally encrypted). The server can detect if someone tries to tamper with them.

✅ Flexible: JWT can be used not just for authentication, but also for securely passing information between services (API-to-API communication).

✅ Widely adopted: Supported in almost all frameworks, libraries, and APIs, making it the go-to choice for modern apps (SPAs, mobile apps, microservices).

👉 In short: JWT tokens let web apps handle authentication and authorization securely in a stateless, scalable way.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
A cookie in web development is a small piece of data that a web server sends to a user's browser, which the browser then stores and sends back to the server with future requests to the same domain. Think of it like a note the server gives your browser:

"Here, keep this note. Every time you come back, show me this note so I remember who you are."

How Cookies Work

Server sends cookie: When you visit a website, the server can send a Set-Cookie header in the HTTP response
Browser stores it: Your browser saves this cookie locally
Browser sends it back: On subsequent requests to that domain, the browser automatically includes the cookie in the request headers
Server reads it: The server can read the cookie data and use it

Common Uses for Cookies

1. Authentication/Sessions: Store login tokens or session IDs so you stay logged in

```
// User stays logged in across page refreshes
res.cookie('authToken', 'jwt123...', { maxAge: 86400000 });
```

2. User Preferences: Remember settings like theme, language, or layout choices

```
// Remember user chose dark mode
res.cookie('theme', 'dark', { maxAge: 365 * 24 * 60 * 60 * 1000 });
```

3. Shopping Carts: Keep track of items in e-commerce sites

```
// Remember what's in cart
res.cookie('cart', JSON.stringify(['item1', 'item2']), { maxAge: 604800000 });
```

4. Analytics/Tracking: Track user behavior across visits

```
// Google Analytics uses cookies to track visitors
res.cookie('_ga', 'GA1.2.1234567890.1234567890');
```

Cookie Attributes

1. Domain: Which domain can access the cookie

```
res.cookie('name', 'value', { domain: '.example.com' }); // All subdomains
```

2. Path: Which URLs can access the cookie

```
res.cookie('name', 'value', { path: '/admin' }); // Only /admin routes
```

3. Expires/Max-Age: When the cookie should be deleted

```
res.cookie('name', 'value', { maxAge: 3600000 }); // 1 hour
```

4. Secure: Only send over HTTPS

```
res.cookie('name', 'value', { secure: true });
```

5. HttpOnly: Can't be accessed by JavaScript

```
res.cookie('name', 'value', { httpOnly: true }); // XSS protection
```

6. SameSite: Controls cross-site request behavior
   res.cookie('name', 'value', { sameSite: 'strict' }); // CSRF protection

```

```

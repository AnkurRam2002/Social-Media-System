<h1 align='center'>Social Media System</h1>

This project is the backend for a Social Media System where users can like, comment, view, create, update, and delete posts. It is built using Node.js, Express, and MongoDB. The system includes user authentication and authorization using JWT and bcrypt for password protection.

<h3>Features</h3>

- User Authentication: Register and log in users.
- User Authorization: Protect routes using JWT.
- CRUD Operations: Create, read, update, and delete posts.
- Likes and Comments: Like and comment on posts.
- Password Protection: Secure user passwords with bcrypt.

<h3>Technologies Used</h3>

- Node.js: JavaScript runtime for building server-side applications.
- Express: Web application framework for Node.js.
- MongoDB: NoSQL database for storing user data and posts.
- JWT: JSON Web Tokens for authorization.
- bcrypt: Library for hashing and checking passwords.
- Mongoose: MongoDB object modeling tool for Node.js.

<h3>API Endpoints</h3>

<h4>Authentication</h4>

- POST /api/register: Register a new user.
- POST /api/login: Log in a user and receive a JWT.

Users
GET /api/users/
: Get user details by ID.
PUT /api/users/
: Update user details by ID (protected route).
DELETE /api/users/
: Delete a user by ID (protected route).
Posts
GET /api/posts: Get all posts.
POST /api/posts: Create a new post (protected route).
GET /api/posts/
: Get post details by ID.
PUT /api/posts/
: Update post by ID (protected route).
DELETE /api/posts/
: Delete post by ID (protected route).
Comments
POST /api/posts/
/comments: Comment on a post (protected route).
GET /api/posts/
/comments: Get all comments for a post.
Likes
POST /api/posts/
/like: Like a post (protected route).
POST /api/posts/
/unlike: Unlike a post (protected route).

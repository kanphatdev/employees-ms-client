## backend dependencies
- express
    * Express is a minimal and flexible Node.js web application framework used to build server-side applications, APIs, and handle HTTP requests and responses. It offers robust routing, middleware support, and tools for serving static files and rendering server-side HTML views. Express is popular for creating RESTful APIs, integrating with databases, and developing real-time applications with WebSocket libraries. Its simplicity and flexibility make it a go-to choice for Node.js developers.
- mysql
    * MySQL is an open-source relational database management system (RDBMS) that uses SQL for managing and manipulating data. It is known for its reliability, ease of use, performance, and scalability. Key features include data storage in tables, robust security, flexibility across operating systems, high performance, and tools for backup and recovery. MySQL is widely used for web applications and large-scale enterprise systems.
- cors
  - CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers to allow or restrict web pages from making requests to a different domain than the one that served the web page. It uses HTTP headers to manage cross-origin requests 
- cookie-parser
    - cookie-parser is a middleware for Express.js that simplifies handling cookies. It parses cookies from the request header and makes them available on req.cookies, and can also handle signed cookies via req.signedCookies. It can be configured with a secret key for signing cookies to ensure their integrity. This middleware is useful for easily reading, setting, and managing cookies in an Express application.
- bcrypt
   - bcrypt is a library for securely hashing and managing passwords in Node.js applications. It hashes passwords with a unique salt to protect them from attacks and allows configuration of the hashing difficulty. It also provides methods to compare plaintext passwords with hashed ones for verification. bcrypt is widely used to enhance password security by making it computationally challenging to crack hashes. 
- jsonwebtoken
   - jsonwebtoken is a Node.js library for creating and verifying JSON Web Tokens (JWTs). It helps with secure authentication and authorization by generating tokens with a payload and secret key, and verifying their authenticity. It supports various signing algorithms and allows for custom claims and expiration settings. 
- multer
  - multer is a Node.js middleware for handling file uploads in Express applications. It processes multipart/form-data requests, allowing files to be accessed through req.file or req.files. It supports various storage options (disk or memory), file validation, and error handling 
- path
   - The path module in Node.js provides utilities for working with file and directory paths. It offers methods to join, resolve, normalize, parse, and format paths in a cross-platform manner, making it easier to manage file paths in a consistent way across different operating systems.
- nodemon
   - nodemon is a Node.js utility that automatically restarts your application when file changes are detected. It simplifies development by eliminating the need for manual server restarts, and it can be configured to watch specific files or directories.

   ## back end dependency install commands

```bash
npm i express
```
```bash
npm i mysql
```
```bash
npm i cors
```
```bash
npm i cookie-parser
```
```bash
npm i bcrypt
```
```bash
npm i jsonwebtoken
```
```bash
npm i multer
```
```bash
npm i path

```
```

npm i nodemon
```
## front end dependency install commands
```bash
npm create vite@latest
### Select the react template 
```

# Code Stack

| Frontend            | Backend         |
|---------------------|-----------------|
| React JS            | MySQL           |
| Tailwind CSS        | CORS            |
| Daisy UI            | Cookie-Parser   |
| React Router DOM    | Bcrypt          |
| Axios               | JSONWebToken    |
| Lucide Icons        | Multer          |
|                     | Path            |
|                     | Nodemon         |







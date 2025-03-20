const express = require('express');
const httpProxy = require('http-proxy');
const jwt = require('jsonwebtoken');  // ✅ Ensure JWT is imported
require('dotenv').config();

const app = express();
const proxy = httpProxy.createProxyServer();
const port = 5000;



// ✅ Default route for API Gateway
app.get("/", (req, res) => {
    console.log("API Gateway is running...");
    return res.send("API Gateway is running...");
});



// ✅ Forward /register/user requests to Authentication Service
app.post('/register/user', (req, res) => {
    console.log("Forwarding user registration request...");
    proxy.web(req, res, { target: 'http://localhost:8001' });
});

// ✅ Forward /register/admin requests to Authentication Service
app.post('/register/admin', (req, res) => {
    console.log("Forwarding admin registration request...");
    proxy.web(req, res, { target: 'http://localhost:8001' });
});

// ✅ Forward /login requests to Authentication Service
app.post('/login', (req, res) => {
    console.log("Forwarding login request...");
    proxy.web(req, res, { target: 'http://localhost:8001' });
});

app.post('/notes', (req, res) => {
    console.log("Forwarding login request...");
    proxy.web(req, res, { target: 'http://localhost:8002' });
});

app.get('/notes/:id', (req, res) => {
    console.log("Forwarding login request...");
    proxy.web(req, res, { target: 'http://localhost:8002' });
});

app.get('/stats', (req, res) => {
    console.log("Forwarding login request...");
    proxy.web(req, res, { target: 'http://localhost:8003' });
});

app.get('/search', (req, res) => {
    console.log("Forwarding login request...");
    proxy.web(req, res, { target: 'http://localhost:8004' });
});

app.post('/teams', (req, res) => {
    console.log("Forwarding login request...");
    proxy.web(req, res, { target: 'http://localhost:8005' });
});

app.post('/comments', (req, res) => {
    console.log("Forwarding login request...");
    proxy.web(req, res, { target: 'http://localhost:8006' });
});

app.post('/versions', (req, res) => {
    console.log(`Forwarding ${req.method} request to Versioning Service...`);
    proxy.web(req, res, { target: 'http://172.31.25.41:8007' });
});

app.get('/versions/:noteId', (req, res) => {
    console.log(`Forwarding ${req.method} request to Versioning Service...`);
    proxy.web(req, res, { target: 'http://172.31.25.41:8007' });
});

app.delete('/versions/:noteId/:versionIndex', (req, res) => {
    console.log(`Forwarding ${req.method} request to Versioning Service...`);
    proxy.web(req, res, { target: 'http://172.31.25.41:8007' });
});

app.put('/versions/restore/:noteId/:versionIndex', (req, res) => {
    console.log(`Forwarding ${req.method} request to Versioning Service...`);
    proxy.web(req, res, { target: 'http://172.31.25.41:8007' });
});

// ✅ Forward all /admin requests (Admins Only)
app.get('/admin/users', (req, res) => {
    console.log(`Forwarding ${req.method} request to Admin Service...`);
    proxy.web(req, res, { target: 'http://172.31.25.41:8008' });
});

app.patch('/admin/promote/:id', (req, res) => {
    console.log(`Forwarding ${req.method} request to Admin Service...`);
    proxy.web(req, res, { target: 'http://172.31.25.41:8008' });
});

app.delete('/admin/delete/:id', (req, res) => {
    console.log(`Forwarding ${req.method} request to Admin Service...`);
    proxy.web(req, res, { target: 'http://172.31.25.41:8008' });
});

// ✅ Start API Gateway
app.listen(port, () => {
    console.log("🚀 API Gateway Service is running on PORT:", port);
});

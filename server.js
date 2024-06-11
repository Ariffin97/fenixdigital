const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// Users data
const users = [
    { username: 'ariffinanuar', password: 'Ariffin.97' },
    { username: 'user2', password: 'pass2' }
];

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.user = user;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Dashboard endpoint
app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.send('Welcome to your dashboard, ' + req.session.user.username);
    } else {
        res.redirect('/login.html');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

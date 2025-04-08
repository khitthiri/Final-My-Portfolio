const express = require('express');
const path = require('path');
const app = express();

// Set the view engine to EJS and define the correct directory for views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Correct EJS templates path

// Middleware
app.use(express.urlencoded({ extended: false })); // To handle form data
app.use(express.static(path.join(__dirname, 'docs')));

// Serve images from 'docs/images/'
app.use('/images', express.static(path.join(__dirname, 'docs', 'images')));

// In-memory storage
let submissions = [];
let tempData = {};

// Define homepage route (portfolio page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

// Contact form route
app.get('/contact', (req, res) => {
    res.render('contact', { message: null });
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    if (!email.includes('@')) {
        return res.render('contact', { message: 'Invalid email!' });
    }

    tempData = { name, email, message };
    submissions.push(tempData);

    res.render('confirmation', { name });
});

// View submissions for testing
app.get('/submissions', (req, res) => {
    res.json(submissions);
});

// Projects route
app.get('/projects', (req, res) => {
    const projects = [
        {
            title_id: "Project1",
            img_id: "img1",
            img_alt: "Project 1 Image",
            img_src: "/images/Cocktails.png",
            section_id: "section1",
            title: "Get Cocktails",
            description: "A website for getting cocktail recipes every time you refresh the page.",
            link: "https://github.com/khitthiri/Cocktails.git"
        },
        {
            title_id: "Project2",
            img_id: "img2",
            img_src: "/images/Log-in.png",
            img_alt: "Project 2 Image",
            section_id: "section2",
            title: "Log In",
            description: "A simple log-in web page.",
            link: "https://github.com/khitthiri/Log-in-.git"
        },
        {
            title_id: "Project3",
            img_id: "img3",
            img_src: "/images/Shoppingcart.png",
            img_alt: "Project 3 Image",
            section_id: "section3",
            title: "Shopping Cart",
            description: "A simple shopping cart for items and calculation with discounts.",
            link: "https://github.com/khitthiri/Shopping-Cart.git"
        }
    ];

    res.render('projects', {
        title: "My Projects",
        projects: projects
    });
});

// Blog route
app.get('/blog', (req, res) => {
    res.render('blog', { title: 'My Blog' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('<h1>PAGE NOT FOUND!</h1>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

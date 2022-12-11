const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const logger = require('./middleware/logger');

const app = express();

//Handlebar Middleware
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage Route
app.get('/', (req, res) => res.render('index'));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

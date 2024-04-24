const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// Sets up my Express
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up Sequelize 
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sets up my session with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  helpers: {
      format_date: date => {
          return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      }
  }
});

// Sets up handlebars routes. Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Sets up routes
app.use(require('./controllers/api'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`http://localhost:${PORT}/login`));
});
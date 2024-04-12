const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to display a list of posts on the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User
        },
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// Redirects to another route
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// Route to display an individual post
router.get('/post/:id', (req, res) => {
  Post.findByPk(req.params.id, {
      include: [
          User,
        {
          model: Comment,
          include: [User],
          },
      ],
    })

    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render('single-post', { post });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;

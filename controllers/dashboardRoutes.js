const router = require("express").Router();
const { Post } = require("../models/");
const withAuth = require("../utils/auth");

// Get posts by user when user logs in
router.get("/", withAuth, (req, res) => {
    Post.findAll({
        where: { userId: req.session.userId }
    })
    .then(dbPostData => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render("all-posts-admin", {
            layout: "dashboard",
            posts
        });
    })
    .catch(err => {
        console.log(err);
        res.redirect("login");
    });
});

// Gets the route to edit the post
router.get("/edit/:id", withAuth, (req, res) => {
    Post.findByPk(req.params.id)
    .then(dbPostData => {
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            
            res.render("edit-post", {
                layout: "dashboard",
                post
            });
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// Route for creating a new post
router.get("/new", withAuth, (req, res) => {
    console.log("Reached /new route");
    res.render("new-post", {
        layout: "dashboard"
    });
});

module.exports = router;
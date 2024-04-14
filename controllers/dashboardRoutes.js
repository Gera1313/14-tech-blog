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
            
        }
    })
})
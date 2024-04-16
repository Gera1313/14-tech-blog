const router = require("express").Router();
const { User } = require("../../models");

router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then //hereeeeeeee
})
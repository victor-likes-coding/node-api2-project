const express = require("express");
const { find, findById, insert, update, remove, findPostComments } = require("../model/post");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const posts = await find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({
            message: "The posts information could not be retrieved",
        });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await findById(id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be retrieved",
        });
    }
});

router.post("/", async (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post",
        });
    } else {
        try {
            const { id } = await insert({ title, contents });
            const post = await findById(id);
            res.status(201).json(post);
        } catch (err) {
            res.status(500).json({
                message: "There was an error while saving the post to the database",
            });
        }
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const post = await findById(id);
        if (post) {
            const { title, contents } = req.body;
            if (!title || !contents) {
                res.status(400).json({
                    message: "Please provide title and contents for the post",
                });
            } else {
                await update(id, { title, contents });
                const updatedPost = await findById(id);
                res.status(200).json(updatedPost);
            }
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be modified",
        });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await findById(id);
        if (post) {
            await remove(id);
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "The post could not be removed",
        });
    }
});

router.get("/:id/comments", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await findById(id);
        if (post) {
            const comments = await findPostComments(id);
            res.status(200).json(comments);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "The comments information could not be retrieved",
        });
    }
});

module.exports = router;

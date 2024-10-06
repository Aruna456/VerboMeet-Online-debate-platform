const express = require('express');
const router = express.Router();

const Post = require('../models/postModel');

router.get('/all', async (req, res) => {
    try {
        const fetchPosts = await Post.find();
        res.status(200).json(fetchPosts);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/add', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "Title & Description Required" });
        }
        const newPost = new Post(req.body);
        const savedData = await newPost.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const currentRecord = await Post.findOne({ _id: id });
        if (!currentRecord) {
            return res.status(404).json({ message: "Post not found!" });
        }
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const currentRecord = await Post.findOne({ _id: id });
        if (!currentRecord) {
            return res.status(404).json({ message: "Post not found!" });
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: "Post Deleted!" });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;

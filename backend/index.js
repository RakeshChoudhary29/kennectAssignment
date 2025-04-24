const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");
require('dotenv').config()

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    name: String,
    text: String,
    comments: [
      {
        name: String,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const authMiddleware = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) return res.status(401).json({ error: "Token required" });
  try {
    const token = bearerToken.split(" ")[1];
    console.log({ token });
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashed });
    const token = jwt.sign({ id: user._id, name }, JWT_SECRET);
    res.json({ token });
  } catch {
    res.status(400).json({ error: "User already exists" });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET);
  res.json({ token });
});

app.get("/posts", authMiddleware, async (req, res) => {
  const search = req.query.search?.toLowerCase();
  const posts = await Post.find();
  if (search) {
    const filtered = posts.filter(
      (post) =>
        post.text.toLowerCase().includes(search) ||
        post.comments.some((c) => c.text.toLowerCase().includes(search))
    );
    return res.json(filtered);
  }
  res.json(posts);
});

app.post("/posts", authMiddleware, async (req, res) => {
  const { text } = req.body;
  const newPost = await Post.create({
    name: req.user.name,
    text,
    comments: [],
  });
  res.status(201).json(newPost);
});

app.post("/posts/:id/comments", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  const newComment = { name: req.user.name, text };
  post.comments.push(newComment);
  await post.save();
  res.status(201).json(newComment);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("debabrata_saha");
    const skillsCollection = db.collection("skills");
    const projectsCollection = db.collection("projects");
    const blogCollection = db.collection("blogs");
    const educationCollection = db.collection("education");

    //get api

    app.get("/api/v1/education", async (req, res) => {
      try {
        const education = educationCollection.find({});
        const result = await education.toArray();
        if (result) {
          res.json(result);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error!" });
      }
    });

    app.get("/api/v1/blogs", async (req, res) => {
      try {
        const blog = blogCollection.find({});
        const result = await blog.toArray();
        if (result) {
          res.json(result);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error!" });
      }
    });

    app.get("/api/v1/skills", async (req, res) => {
      try {
        const skill = skillsCollection.find({});
        const result = await skill.toArray();
        if (result) {
          res.json(result);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error!" });
      }
    });
    app.get("/api/v1/projects", async (req, res) => {
      try {
        const project = projectsCollection.find({});
        const result = await project.toArray();
        if (result) {
          res.json(result);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error!" });
      }
    });

    //post api

    app.post("/api/v1/skill", async (req, res) => {
      const skills = req.body;
      console.log("skills", skills);
      const result = await skillsCollection.insertOne(skills);
      console.log(result);
      res.json(result);
    });

    app.post("/api/v1/project", async (req, res) => {
      const projects = req.body;
      console.log("projects", projects);
      const result = await projectsCollection.insertOne(projects);
      console.log(result);
      res.json(result);
    });

    app.post("/api/v1/blog", async (req, res) => {
      const blogs = req.body;
      console.log("blogs", blogs);
      const result = await blogCollection.insertOne(blogs);
      console.log(result);
      res.json(result);
    });

    app.post("/api/v1/education", async (req, res) => {
      const education = req.body;
      console.log("education", education);
      const result = await educationCollection.insertOne(education);
      console.log(result);
      res.json(result);
    });

    //Delete api
    app.delete("/api/v1/blog/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.deleteOne(query);
      console.log(result);
      res.json(result);
    });

    app.delete("/api/v1/skill/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await skillsCollection.deleteOne(query);
      console.log(result);
      res.json(result);
    });

    app.delete("/api/v1/project/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await projectsCollection.deleteOne(query);
      console.log(result);
      res.json(result);
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  const serverStatus = {
    message: "Debabrata Saha Portfolio Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});

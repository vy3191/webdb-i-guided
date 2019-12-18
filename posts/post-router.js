const express = require("express")
const db = require("../data/db-config") // database access using knex

const router = express.Router()

router.get("/",  async (req, res, next) => {
    try{
     const posts =  await db.select("*").from("posts");      
     res.json(posts);
    }catch(error) {
       next(error)
    }
});

router.get("/:id", async (req, res, next) => {
  try{
    // const post = await db.select("*").from("posts").where("id", req.params.id);
    const post = await db("posts").where("id", req.params.id).first();
    res.status(200).json(post);
  }catch(error) {
       next(error)
    }
})

router.post("/", async (req, res, next) => {
  try{
     const payload = {
       title: "req.body.title",
       contents: "req.body.contents"
     } 
     // INSERT INTO posts(title,contents) VALUES(?,?);
     const [newPost] = await db("posts").insert(payload)
    //  res.status(201).json(newPost);
    res.json(await db("posts").where("id", newPost).first());
    }catch(error) {
       next(error)
    }
})

router.put("/:id", async (req, res, next) => {
  try{
       const payload = {
          title: req.body.title,
          contents: req.body.contents,
       }
       // translates to UPDATE posts SET title = ? AND contents=
       await db("posts").where("id", req.params.id).update(payload);
       res.json(await db("posts").where("id", req.params.id).first());
    }catch(error) {
       next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
  try{
       await db("posts").where("id", req.params.id).del()
       res.status(204).end();
    }catch(error) {
       next(error)
    }
})

module.exports = router

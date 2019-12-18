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
    const post = db.select("*").from("posts").where("id", req.params.id);
    res.status(200).json(post);
  }catch(error) {
       next(error)
    }
})

router.post("/", async (req, res, next) => {
  try{
       
    }catch(error) {
       next(error)
    }
})

router.put("/:id", async (req, res, next) => {
  try{
       
    }catch(error) {
       next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
  try{
       
    }catch(error) {
       next(error)
    }
})

module.exports = router

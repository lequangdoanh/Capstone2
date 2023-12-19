import express from "express";
import { createComment, getCommentForBlog } from "../controllers/comment.js";

const router = express.Router();

//create a podcast
router.post("/", createComment);

router.get("/blog/:id", getCommentForBlog);

// router.get("/all", showListAllBlog);
// router.get("/:name", showListBlog);
// //get podcast by id
// router.get("/get/:id",getDetailBlog)
// router.get("/search/:q",searchBlog)

// //add episode to a 
// router.put("/update-blog/:id", updateBlog);
// router.delete("/delete-blog/:id",deleteBlog); 


export default router;
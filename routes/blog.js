const express = require("express");
const router = express.Router();
const { create,getAllBlogs,singleBlog,deleteBlog,updateBlog } = require("../controller/blogController");
const { require_login } = require("../controller/auth");

router.post("/create",require_login, create);
router.get("/blogs",getAllBlogs);
router.get("/blog/:slug",singleBlog);
router.delete("/blog/:slug",require_login,deleteBlog);
router.put("/blog/:slug",require_login,updateBlog)

module.exports = router;

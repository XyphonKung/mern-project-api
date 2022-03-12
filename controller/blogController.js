//Connect to database/Moodels
const slugify = require("slugify");
const blog = require("../models/blog");
const Blogs = require("../models/blog");
const {v4:uuidv4} = require('uuid')
//Create Data
exports.create = (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title);
  
  if(!slug){
    slug = uuidv4();
  }
  //Validate data
  switch (true) {
    case !title:
      return res.status(400).json({ error: "Please enter title" });
      break;
    case !content:
      return res.status(400).json({ error: "Please enter content" });
      break;
  }
  //Create data
  Blogs.create({ title, content, author, slug }, (err, blog) => {
    if (err) {
      res.status(400).json({ error: "Error Title Duplicate" });
    }
    res.json(blog);
  });
};

exports.getAllBlogs=(req,res)=>{
    Blogs.find().exec((err,blogs)=>{
        res.json(blogs)
    })
}

exports.singleBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}

exports.deleteBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndDelete({slug}).exec((err,blog)=>{
        if(err) {
            res.status(400).json({ error: "Error Delete Data" });
        }
        res.json({
            message:"Delete Data Success"
        })
    })
}

exports.updateBlog=(req,res)=>{
    const {slug} = req.params
    const {title,content,author} = req.body;

    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
        if(err){
            console.log(err)
        }
        res.json(blog)
    })
}

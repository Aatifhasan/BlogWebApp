//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin_0:todolistdb@cluster0.vz0ej8u.mongodb.net/blogDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("mongo error"));



  const postSchema = {
    title: {
      type: String,
      required: [true, "Title not specified"]
  
    },
    body:{
      type:String,
      required:[true,"Body empty"]
    }
  };

  const Post = mongoose.model("Post", postSchema);



const homeStartingContent = "Welcome to Blog, What is a blog used for? To help your company rank on search engines. To share information about a given topic and become an expert in an industry. To attract visitors to your site, and turn those visitors into leads. So Start Adding your post by adding `/compose` to url above. ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

var posts=[];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  Post.find().then(function(posts){

    res.render("home", {
 
      homeCont: homeStartingContent,
 
      posts: posts
 
      })
  }).catch(function(err){
    console.log(err);
  })


  // res.render("home", {homeCont:homeStartingContent,posts:posts})
  // console.log(posts);
});

app.get("/about",function(req,res){
  res.render("about", {aboutCont:aboutContent})
});

app.get("/contact",function(req,res){
  res.render("contact", {contactCont:contactContent})
});

app.get("/compose",function(req,res){
  res.render("compose")
});

app.get("/posts/:postId",function(req,res){
  const requestedPostId=req.params.postId;
  
  Post.findOne({_id: requestedPostId}).then(function(post){

    res.render("post", {
      title: post.title,
      body: post.body
  })
  })
    // console.log("Match Found")
})


app.post("/compose",function(req,res){
  // const post = {postTitle:req.body.postTitle, postBody:req.body.postBody};
  // console.log(post);
  let title=req.body.postTitle;
  let body=req.body.postBody;
  // posts.push(post);
  const post = new Post({
    title:title,
    body:body
  });
  post.save();

  res.redirect("/");
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});




///completed
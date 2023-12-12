const express  = require("express");
const app = express();
const path = require("path");
const {v4:uuidv4} = require('uuid');
const methodOverride = require("method-override");


app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(3000,()=>{
    console.log("Server start at 3000");
});

let posts =[
{         id:uuidv4(),
    username:"akki",
    content:"I love coding",
},{     id:uuidv4(),
    username:"vishnu",
    content:"I love u",
},
{     id:uuidv4(),
    username:"nimmi",
    content:"I love u2",
}
];
app.get('/posts',(req,res)=>{
res.render("index",{posts});
})

app.get('/posts/new',(req,res)=>{
    res.render("new");
})

app.post('/posts',(req,res)=>{
    let {username,content} =req.body;
    let id =uuidv4();
   posts.push({id,username,content});
//    res.send("posted succussfully");
// console.log(posts);
// res.render('index',{posts});
res.redirect("/posts");
})


app.get("/posts/:id",(req,res)=>{
    let{id} = req.params;
let post = posts.find((p)=>id===p.id);
    res.render("show",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let{id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id===p.id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get('/posts/:id/edit',(req,res)=>{
    let{id} = req.params;
let post = posts.find((p)=>id===p.id);
   res.render("edit",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id !==p.id);
    res.redirect("/posts");

})
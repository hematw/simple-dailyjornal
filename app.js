const { render } = require("ejs");
const express = require("express");
const _ = require("lodash")

let homeStartingContent = "Pariatur laborum fugiat non adipisicing. Incididunt occaecat voluptate duis magna non. Consectetur ea mollit sunt aliquip aute proident deserunt do mollit. Et ad eiusmod et dolor consectetur.";
let aboutContent = "Exercitation non incididunt ea aute non occaecat est exercitation voluptate aliqua in irure anim. Magna aliquip ipsum id sint reprehenderit et est aute elit aliqua eiusmod commodo nostrud ut. Anim aliqua ex consectetur est aliquip dolore aliqua et consectetur anim amet qui minim. Nulla adipisicing voluptate culpa laboris mollit ipsum et sit. Non esse sit ea officia.";
let contactContent = "Qui Lorem quis quis ea amet nulla Lorem magna. Anim minim culpa ad fugiat enim cupidatat eu aute enim aute officia culpa deserunt. Duis mollit amet consequat nostrud do..";

let posts = [
    {
        title: "Day 1",
        body: "Enim do ea consequat ullamco in aliquip id. Quis laborum aliqua sint magna do in do ad fugiat est Lorem aute. Laboris ex exercitation anim consectetur ut incididunt laboris laborum non. Labore Lorem sit excepteur cupidatat ad id exercitation est aute veniam reprehenderit nulla consectetur. Velit dolore labore nisi ullamco et non deserunt ipsum laboris. Id nostrud Lorem labore et commodo incididunt pariatur duis quis commodo magna Lorem."
    },
    {
        title: "Day 2",
        body: "Exercitation ipsum voluptate ut ad. Elit officia ad veniam eu sint sint sint enim aute sit nisi. Occaecat fugiat exercitation ea laboris sint in dolor minim. Dolor nisi nisi fugiat aliquip incididunt duis aliqua."
    }
];

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"))
app.set("view engine", "ejs");

app.get("/", (req, res)=> {
    res.render("home", { homeStartingContent, posts });
})

app.get("/about", (req, res)=> {
    res.render("about", { aboutContent });
})

app.get("/contact", (req, res)=> {
    res.render("contact", { contactContent });
})

app.get("/compose", (req, res)=> {
    res.render("compose");
})

app.post("/compose", (req, res)=> {

    const post = {
        title: req.body.postTitle,
        body: req.body.postBody
    };
    posts.push(post);
    res.redirect("/");
})

app.get("/posts/:reqTitle", (req, res)=> {
    let reqTitle = _.lowerCase(req.params.reqTitle);
    console.log(reqTitle);
    posts.forEach(( post )=> {
        
        let storedTitle = _.lowerCase(post.title)
        
        if(reqTitle === storedTitle) {
            res.render("post", { post })
        }
    })
})

app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
})
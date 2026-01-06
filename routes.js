import axios from "axios";
import { Router } from "express";


const router = Router();
let userIdIncrement = 1;
let hist = [];

router.get("/", (req, res) =>{
    res.render("index",{hist});
})
router.get("/form", (req, res) => {
     res.render("form")
})

router.post("/post", async (req, res) => {
try{
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
  title: req.body.title,
  body: req.body.text,
  userId: userIdIncrement
})
const result = response.data;
hist.push(result);
userIdIncrement++;

res.render("form",{result,hist});
  } 
catch(error){
    res.status(500).json({ error: "Error to create post" });
}
})

router.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = hist.findIndex(post => post.id === id);
  if (index !== -1) {
    hist.splice(index, 1);
  }
  return res.redirect("/");
});

router.get("/edit/:id", (req, res) =>{
    const id = Number(req.params.id);
    const post = hist.find(p => p.id === id);
    if(!post){
        return res.redirect("/");
    }
    res.render("edit", { post});
})

router.post("/edit/:id", async (req, res) =>{
const id = Number(id.params.id);
const post = hist.find(p => p.id === id);

if (!post) {
    return res.redirect("/")
};

post.title = req.body.title;
post.body = req.body.body;

res.redirect("/");

})





export default router;
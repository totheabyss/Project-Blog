import axios from "axios";
import { Router } from "express";


const router = Router();
let userIdIncrement = 1;
let hist = [];

router.get("/", (req, res) =>{
    res.render("index");
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

res.render("form",{result});
  } 
catch(error){
    res.status(500).json({ error: "Error to create post" });
}
})




export default router;
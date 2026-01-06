import express from "express";
import axios from "axios";
import routes from "./routes.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.use("/",routes);
app.use("/form", routes);
app.use("/post", routes);


app.listen(port, ()=>{
    console.log(`listen to port ${port}`);
})
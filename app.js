import express from "express";
import {UserRepository} from "./userRepository.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.post("/login", (req, res) => {});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const id = UserRepository.create({ username, password });
    res.send({ id }).json(({message : "user created"}));
  } catch (error) {
    res.status(400).send( error.message );
  }
});

app.post("/logout", (req, res) => {});
app.get("/protected", (req, res) => {});

app.get("/register", (req,res) => {
  try{
    const users = UserRepository.findAll();
    res.json(users);
  }catch (error) {
    res.status(400).send(error.message);
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import { signUp } from "./signup";

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  const input = req.body;
  try {
    const response = await signUp(input)
    res.json(response)
  } catch(e: any) {
    return res.status(422).json({ message: e.message })
  }
})

app.listen(3000);

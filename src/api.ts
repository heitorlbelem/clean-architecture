import express from "express";
import { AccountDAODatabase } from "./AccountDAO";
import { Signup } from "./Signup";

const app = express();
app.use(express.json());

const accountDAO = new AccountDAODatabase()
const signup = new Signup(accountDAO)

app.post("/signup", async function (req, res) {
  const input = req.body;
  try {
    const response = await signup.execute(input)
    res.json(response)
  } catch(e: any) {
    return res.status(422).json({ message: e.message })
  }
})

app.listen(3000);

import express from "express";
import { AccountDAODatabase } from "./AccountDAO";
import { GetAccount } from "./GetAccount";
import { Signup } from "./Signup";

const app = express();
app.use(express.json());

const accountDAO = new AccountDAODatabase()
const signup = new Signup(accountDAO)
const getAccount = new GetAccount(accountDAO)

app.post("/signup", async function (req, res) {
  const input = req.body;
  try {
    const response = await signup.execute(input)
    res.json(response)
  } catch(e: any) {
    return res.status(422).json({ message: e.message })
  }
})

app.get("/accounts/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const response = await getAccount.execute(id)
    return res.json(response)
  } catch(e: any) {
    return res.status(404).json({ message: 'Not found' })
  }
})

app.listen(3000);

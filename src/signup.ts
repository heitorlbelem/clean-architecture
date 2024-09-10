import crypto from "crypto";
import express from "express";
import pgp from "pg-promise";
import { validateCpf } from "./validateCpf";

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
	const input = req.body;
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");

	const id = crypto.randomUUID();
	const [accountData] = await connection.query("select * from ccca.account where email = $1", [input.email]);
	if (accountData) { return res.status(422).json({ message: -4 }) }
	if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) { return res.status(422).json({ message: -3 }) }
	if (!input.email.match(/^(.+)@(.+)$/)) { return res.status(422).json({ message: -2 }) }
	if (!validateCpf(input.cpf)) { return res.status(422).json({ message: -1 }) }
	if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) { return res.status(422).json({ message: -5 }) }

	await connection.query("insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)", [id, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver, input.password]);
	res.json({ accountId: id })
	await connection.$pool.end();
});

app.listen(3000);

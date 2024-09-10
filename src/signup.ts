import { AccountDAO } from "./AccountDAO";
import { validateCpf } from "./validateCpf";

export async function signUp (input: any) {
	const accountDAO = new AccountDAO()
	const accountData = await accountDAO.getUserByEmail(input.email)
	if (accountData) { throw new Error("Account already exists") }
	if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) { throw new Error("Invalid name") }
	if (!input.email.match(/^(.+)@(.+)$/)) { throw new Error("Invalid e-mail") }
	if (!validateCpf(input.cpf)) { throw new Error("Invalid CPF") }
	if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) { throw new Error("Invalid car plate") }

	const accountId = await accountDAO.saveUser(input)
	return { accountId }
};

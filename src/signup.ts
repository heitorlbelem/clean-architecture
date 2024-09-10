import { IAccountDAO } from "./AccountDAO";
import { validateCpf } from "./validateCpf";

export class Signup {
	constructor(private readonly accountDAO: IAccountDAO) {
		this.accountDAO = accountDAO;
	}

	async execute (input: any) {
		const account = {
			id: crypto.randomUUID(),
			name: input.name, 
			email: input.email,
			cpf: input.cpf,
			isDriver: input.isDriver,
			isPassenger: input.isPassenger,
			carPlate: input.carPlate,
			password: input.password
		}
		const accountExists = await this.accountDAO.getUserByEmail(account.email)
		if(accountExists) { throw new Error("Account already exists") }
		if(!account.name.match(/[a-zA-Z] [a-zA-Z]+/)) { throw new Error("Invalid name") }
		if(!account.email.match(/^(.+)@(.+)$/)) { throw new Error("Invalid e-mail") }
		if(!validateCpf(account.cpf)) { throw new Error("Invalid CPF") }
		if(account.isDriver && !account.carPlate.match(/[A-Z]{3}[0-9]{4}/)) {
			throw new Error("Invalid car plate")
		}
		await this.accountDAO.saveUser(account)
		return { accountId: account.id }
	}
}

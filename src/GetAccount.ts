import { IAccountDAO } from "./AccountDAO";

export class GetAccount {
  constructor(private readonly accountDAO: IAccountDAO) {
    this.accountDAO = accountDAO
  }

  async execute(id: string) {
    const [account] = await this.accountDAO.getAccountById(id)
    return account
  }
}

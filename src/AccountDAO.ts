import pgp from "pg-promise";

export interface IAccountDAO {
  getUserByEmail(email: string): Promise<any>;
  saveUser(account: any): Promise<void>;
}

export class AccountDAODatabase implements IAccountDAO {
  async getUserByEmail(email: string) {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [accountData] = await connection.query("select * from ccca.account where email = $1", [email]);
    await connection.$pool.end();
    return accountData
  }
  
  async saveUser(account: any) {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    await connection.query("insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)", [account.id, account.name, account.email, account.cpf, account.carPlate, !!account.isPassenger, !!account.isDriver, account.password]);
    await connection.$pool.end();
  }
}

export class AccountDAOInMemory implements IAccountDAO {
  accounts: any[]

  constructor() {
    this.accounts = []
  }

  async getUserByEmail(email: string): Promise<any> {
    await this.accounts.find(account => account.email === email)
  }

  async saveUser(account: any): Promise<void> {
    this.accounts.push(account)
  }
}
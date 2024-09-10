import crypto from "crypto";
import pgp from "pg-promise";

export class AccountDAO {
  async getUserByEmail (email: string) {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [accountData] = await connection.query("select * from ccca.account where email = $1", [email]);
    await connection.$pool.end();
    return accountData
  }
  
  async saveUser (input: any) {
    const id = crypto.randomUUID();
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    await connection.query("insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)", [id, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver, input.password]);
    await connection.$pool.end();
    return { id }
  }
}
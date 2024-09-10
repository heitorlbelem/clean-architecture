import { AccountDAOInMemory } from "../src/AccountDAO";
import { Signup } from "../src/Signup";

let signup: Signup;

beforeEach(() => {
  const accountDAO = new AccountDAOInMemory()
  signup = new Signup(accountDAO)
})

test("Deve criar uma conta de passageiro", async function () {
  const input = {
    name: 'John Doe',
    email: `john@sample${Math.random()}.com`,
    cpf: '01234567890',
    password: '123456',
    isPassenger: true,
    isDriver: false
  }

  const response = await signup.execute(input)
  expect(response.accountId).toBeDefined()
});

test("Não deve criar uma conta de passageiro com cpf inválido", async function () {
  const input = {
    name: 'John Doe',
    email: `john@sample${Math.random()}.com`,
    cpf: '01234567891',
    password: '123456',
    isPassenger: true,
  }

  await expect(signup.execute(input)).rejects.toThrow('Invalid CPF');
});

test("Não deve criar uma conta de passageiro com nome inválido", async function () {
  const input = {
    name: 'John',
    email: `john@sample${Math.random()}.com`,
    cpf: '01234567890',
    password: '123456',
    isPassenger: true,
  }
  await expect(signup.execute(input)).rejects.toThrow('Invalid name');
});

test("Não deve criar uma conta de passageiro com email inválido", async function () {
  const input = {
    name: 'John Doe',
    email: `john${Math.random()}sample.com`,
    cpf: '01234567890',
    password: '123456',
    isPassenger: true,
  }
  await expect(signup.execute(input)).rejects.toThrow('Invalid e-mail');
});

test("Não deve criar uma conta de motorista com placa inválida", async function () {
  const input = {
    name: 'John Doe',
    email: `john@sample${Math.random()}.com`,
    cpf: '01234567890',
    password: '123456',
    isDriver: true,
    carPlate: 'AAA999'
  }
  await expect(signup.execute(input)).rejects.toThrow('Invalid car plate');
});

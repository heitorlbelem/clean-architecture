import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
}

test("Deve criar uma conta de passageiro", async function () {
  const input = {
    name: 'John Doe',
    email: `john@sample${Math.random()}.com`,
    cpf: '01234567890',
    password: '123456',
    isPassenger: true,
    isDriver: false
  }
  const signupResponse = await axios.post("http://localhost:3000/signup", input);
  const signupData = signupResponse.data
  expect(signupData.accountId).toBeDefined()
});

test("Não deve criar uma conta de passageiro com cpf inválido", async function () {
  const input = {
    name: 'John Doe',
    email: `john@sample${Math.random()}.com`,
    cpf: '01234567891',
    password: '123456',
    isPassenger: true,
  }
  const signupResponse = await axios.post("http://localhost:3000/signup", input);
  const signupData = signupResponse.data
  expect(signupResponse.status).toBe(422)
  expect(signupData.message).toBe("Invalid CPF")
});

test("Não deve criar uma conta de passageiro com nome inválido", async function () {
  const input = {
    name: 'John',
    email: `john@sample${Math.random()}.com`,
    cpf: '01234567890',
    password: '123456',
    isPassenger: true,
  }
  const signupResponse = await axios.post("http://localhost:3000/signup", input);
  const signupData = signupResponse.data
  expect(signupResponse.status).toBe(422)
  expect(signupData.message).toBe("Invalid name")
});

test("Não deve criar uma conta de passageiro com email inválido", async function () {
  const input = {
    name: 'John Doe',
    email: `john${Math.random()}sample.com`,
    cpf: '01234567890',
    password: '123456',
    isPassenger: true,
  }
  const signupResponse = await axios.post("http://localhost:3000/signup", input);
  const signupData = signupResponse.data
  expect(signupResponse.status).toBe(422)
  expect(signupData.message).toBe("Invalid e-mail")
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
  const signupResponse = await axios.post("http://localhost:3000/signup", input);
  const signupData = signupResponse.data
  expect(signupData.message).toBe("Invalid car plate")
});

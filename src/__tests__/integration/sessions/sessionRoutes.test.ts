import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedSchoolLogin, mockedStudentLogin, mockedTeacherLogin } from "../../mocks";

describe("/login - Rota responsável por iniciar a sessão do usuário na aplicação", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during data source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login - ESCOLA - Deve retornar um token de acesso caso o usuário tenha sucesso ao iniciar a sessão", async () => {
    const response = await request(app).post("/login").send(mockedSchoolLogin);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /login - ESCOLA - Deve retornar um token de acesso caso o usuário tenha sucesso ao iniciar a sessão", async () => {
    const response = await request(app).post("/login").send(mockedSchoolLogin);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /login - PROFESSOR - Deve retornar um token de acesso caso o usuário tenha sucesso ao iniciar a sessão", async () => {
    const response = await request(app).post("/login").send(mockedTeacherLogin);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /login - PROFESSOR - Deve retornar uma mensagem de erro caso os dados informados sejam inválidos", async () => {
    const response = await request(app).post("/login").send(mockedTeacherLogin);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /login - ALUNO - Deve retornar uma mensagem de erro caso os dados informados sejam inválidos", async () => {
    const response = await request(app).post("/login").send(mockedStudentLogin);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /login - ALUNO - Deve retornar uma mensagem de erro caso os dados informados sejam inválidos", async () => {
    const response = await request(app).post("/login").send(mockedStudentLogin);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});

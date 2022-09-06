import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";

interface IAddressRequest {
  state: string;
  city: string;
  district: string;
  number: string;
  zipCode: string;
}

interface ISchoolRequest {
  name: string;
  email: string;
  password: string;
  type: string;
  director: string;
  address: IAddressRequest;
}

const mockedSchool: ISchoolRequest = {
  name: "Centro Educacional Salesiano",
  email: "salesiano@email.com",
  password: "123456",
  type: "school",
  director: "Gabriel Salesiano",
  address: {
    state: "BA",
    city: "Serrinha",
    district: "Primeira Travessa Antonio Pinheiro da Mota",
    number: "166",
    zipCode: "48700000",
  },
};

const mockedSchoolLogin = {
  email: "salesiano@email.com",
  password: "123456",
};

const mockedTeacherLogin = {
  email: "fabio@mail.com.br",
  password: "123456",
};

const mockedSchoolInvalidId: ISchoolRequest = {
  name: "Escola Educacional Plinio",
  email: "plinio@email.com",
  password: "123456",
  type: "school",
  director: "Rogerio Plinio",
  address: {
    state: "SE",
    city: "Alagados",
    district: "Rua 1",
    number: "186",
    zipCode: "48754000",
  },
};

const mockedSchoolInvalidIdLogin = {
  email: "plinio@email.com",
  password: "123456",
};

const mockedSchoolInvalidZipCode: ISchoolRequest = {
  name: "Centro Educacional Salesiano",
  email: "salesiano@email.com",
  password: "123456",
  type: "school",
  director: "Gabriel Salesiano",
  address: {
    state: "BA",
    city: "Serrinha",
    district: "Primeira Travessa Antonio Pinheiro da Mota",
    number: "166",
    zipCode: "12345678910",
  },
};

const mockedSchoolInvalidState: ISchoolRequest = {
  name: "Centro Educacional Salesiano",
  email: "salesiano@email.com",
  password: "123456",
  type: "school",
  director: "Gabriel Salesiano",
  address: {
    state: "BAHIA",
    city: "Serrinha",
    district: "Primeira Travessa Antonio Pinheiro da Mota",
    number: "166",
    zipCode: "48700000",
  },
};

const mockedUpdatedSchool: ISchoolRequest = {
  name: "Kenzie Salesiano Academy",
  email: "salesiano@email.com",
  password: "123456",
  type: "school",
  director: "Luccas Salesiano",
  address: {
    state: "BA",
    city: "Serrinha",
    district: "Primeira Travessa Antonio Pinheiro da Mota",
    number: "166",
    zipCode: "48700000",
  },
};

describe("Testando rotas da instituição", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /schools - Deve ser capaz de criar uma nova instituição", async () => {
    const response = await request(app).post("/schools").send(mockedSchool);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("director");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("teams");
    expect(response.body.address).toHaveProperty("id");
    expect(response.body.address).toHaveProperty("state");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("number");
    expect(response.body.address).toHaveProperty("zipCode");
  });

  test("POST /schools - Não deve criar instituição caso o email já exista", async () => {
    const response = await request(app).post("/schools").send(mockedSchool);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /schools - Não deve criar instituição caso endereço já exista", async () => {
    const response = await request(app).post("/schools").send(mockedSchool);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /schools - Não deve criar instituição caso zipCode do endereço tenha o tamanho maior que 8 caracteres", async () => {
    const response = await request(app)
      .post("/schools")
      .send(mockedSchoolInvalidZipCode);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /schools - Não deve criar instituição caso state do endereço tenha o tamanho maior que 2 caracteres", async () => {
    const response = await request(app)
      .post("/schools")
      .send(mockedSchoolInvalidState);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /schools - Deve ser capaz de listar todas instituições", async () => {
    const response = await request(app).get("/schools");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("GET /schools/:id - Deve ser capaz de listar uma instituição específica", async () => {
    const school = await request(app).get("/schools");
    const response = await request(app).get(`/schools/${school.body[0].id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("director");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("teams");
    expect(response.body.address).toHaveProperty("id");
    expect(response.body.address).toHaveProperty("state");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("number");
    expect(response.body.address).toHaveProperty("zipCode");
  });

  test("GET /schools/:id - Não deve ser capaz de listar uma instituição específica caso o id seja inválido", async () => {
    const response = await request(app).get(`/schools/777-777-777-777`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /schools/:id - Deve ser capaz de atualizar uma instituição", async () => {
    const school = await request(app).get("/schools");

    const userLogged = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    const response = await request(app)
      .patch(`/schools/${school.body[0].id}`)
      .set("Authorization", `Bearer ${userLogged}`)
      .send(mockedUpdatedSchool);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toEqual("Kenzie Salesiano Academy");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("type");
    expect(response.body.director).toEqual("Luccas Salesiano");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("teams");
    expect(response.body.address).toHaveProperty("id");
    expect(response.body.address).toHaveProperty("state");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("number");
    expect(response.body.address).toHaveProperty("zipCode");
  });

  test("PATCH /schools/:id - Não deve ser capaz de atualizar uma instituição com usuario logado com type diferente de school", async () => {
    const school = await request(app).get("/schools");

    const userLogged = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .patch(`/schools/${school.body[0].id}`)
      .set("Authorization", `Bearer ${userLogged}`)
      .send(mockedUpdatedSchool);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /schools/:id - Não deve ser capaz de atualizar uma instituição com usuario logado com id diferente do id do parametro", async () => {
    const school = await request(app).get("/schools");

    const schoolInvalidId = await request(app)
      .post("/schools")
      .send(mockedSchoolInvalidId);

    const userLogged = await request(app)
      .post("/login")
      .send(mockedSchoolInvalidIdLogin);

    const response = await request(app)
      .patch(`/schools/${school.body[0].id}`)
      .set("Authorization", `Bearer ${userLogged}`)
      .send(mockedUpdatedSchool);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /schools/:id - Não deve ser capaz de atualizar uma instituição com id inválido", async () => {
    const response = await request(app)
      .patch("/users/777-777-777")
      .send(mockedUpdatedSchool);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /schools/:id - Deve ser capaz de remover uma instituição", async () => {
    const school = await request(app).get("/schools");
    const userLogged = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    const response = await request(app)
      .delete(`/schools/${school.body[0].id}`)
      .set("Authorization", `Bearer ${userLogged}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /schools/:id - Não deve ser capaz de deletar uma instituição com usuario logado com type diferente de school", async () => {
    const school = await request(app).get("/schools");

    const userLogged = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .delete(`/schools/${school.body[0].id}`)
      .set("Authorization", `Bearer ${userLogged}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /schools/:id - Não deve ser capaz de deletar uma instituição com usuario logado com id diferente do id do parametro", async () => {
    const school = await request(app).get("/schools");

    const userLogged = await request(app)
      .post("/login")
      .send(mockedSchoolInvalidIdLogin);

    const response = await request(app)
      .delete(`/schools/${school.body[0].id}`)
      .set("Authorization", `Bearer ${userLogged}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /schools/:id - Não deve ser capaz de remover uma instituição com o id inválido", async () => {
    const response = await request(app).delete("/schools/777-777-777");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});

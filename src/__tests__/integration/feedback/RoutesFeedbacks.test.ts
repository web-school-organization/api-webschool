import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  mockedFeedback,
  mockedFeedbackBranco,
  mockedStudentLogin,
  mockedTeacherLogin,
} from "../../mocks";

describe("testando feedbacks", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );

    await request(app).post("/feedbacks").send(mockedFeedback);
    await request(app).post("/feedbacks").send(mockedFeedback);
  });

  afterAll(async () => {
    await connection.destroy();
  });
});

test("POST /feedback - tentando criar um feedback sendo um professor", async () => {
  const adminLoginResponse = await request(app)
    .post("/login")
    .send(mockedTeacherLogin);
  const response = await request(app)
    .post("/feedback")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    .send(mockedFeedback);

  expect(response.body).toHaveProperty("updated_at");
  expect(response.body).toHaveProperty("created_at");
  expect(response.body).toHaveProperty("feedback");
  expect(response.body).toHaveProperty("name");
  expect(response.body).toHaveProperty("id");
  expect(response.status).toBe(201);
});

test("POST /feedback - tentando criar um feedback em branco", async () => {
  const adminLoginResponse = await request(app)
    .post("/login")
    .send(mockedTeacherLogin);
  const response = await request(app)
    .post("/feedback")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    .send(mockedFeedbackBranco);

  expect(response.body).toHaveProperty("message");
  expect(response.status).toBe(401);
});

test("POST /feedback - tentando criar um feedback sendo um aluno", async () => {
  const adminLoginResponse = await request(app)
    .post("/login")
    .send(mockedStudentLogin);
  const response = await request(app)
    .post("/feedback")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    .send(mockedFeedback);

  expect(response.body).toHaveProperty("type");
  expect(response.body.type).not.toBe("aluno");
  expect(response.body).toHaveProperty("message");
  expect(response.status).toBe(401);
});

test("POST /feedback - tentando criar um feedback sem estar logado", async () => {
  const response = await request(app).post("/feedback").send(mockedFeedback);

  expect(response.body).toHaveProperty("message");
  expect(response.status).toBe(401);
});

test("GET /feedback - tentando pegar feedbacks", async () => {
  const response = await request(app).get("/feedback");

  expect(response.body.feedbacks[0]).toHaveProperty("updated_at");
  expect(response.body.feedbacks[0]).toHaveProperty("created_at");
  expect(response.body.feedbacks[0]).toHaveProperty("feedback");
  expect(response.body.feedbacks[0]).toHaveProperty("name");
  expect(response.body.feedbacks[0]).toHaveProperty("id");
  expect(response.body.feedbacks[0]).toHaveProperty("teacher");
  expect(response.body.feedbacks[0]).toHaveProperty("student");
  expect(response.status).toBe(200);
});

test("GET /feedback - tentando pegar feedbacks sem estar logado", async () => {
  const response = await request(app).get("/feedback");

  expect(response.body).toHaveProperty("message");
  expect(response.status).toBe(401);
});

test("DELETE /feedback - tentando deleta um feedback sendo um professor", async () => {
  const adminLoginResponse = await request(app)
    .post("/login")
    .send(mockedTeacherLogin);
  const UserTobeDeleted = await request(app)
    .get("/feedback")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

  const response = await request(app)
    .delete(`/feedback/${UserTobeDeleted.body[0].id}`)
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
  expect(response.status).toBe(204);
  expect(response.body).toHaveProperty("message");
});

test("DELETE /feedback - tentando deleta um feedback sendo um aluno", async () => {
  const adminLoginResponse = await request(app)
    .post("/login")
    .send(mockedStudentLogin);
  const UserTobeDeleted = await request(app)
    .get("/feedback")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

  const response = await request(app)
    .delete(`/feedback/${UserTobeDeleted.body[0].id}`)
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty("message");
});

test("DELETE /feedback - tentando deleta um feedback sem id", async () => {
  const adminLoginResponse = await request(app)
    .post("/login")
    .send(mockedTeacherLogin);

  const response = await request(app)
    .delete(`/feedback/13970660-5dbe-423a-9a9d-5c23b37943cf`)
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty("message");
});

test("DELETE /feedback - tentando deleta um feedback sem estar logado", async () => {
  const response = await request(app).delete(
    `/feedback/13970660-5dbe-423a-9a9d-5c23b37943cf`
  );
  expect(response.status).toBe(401);
  expect(response.body).toHaveProperty("message");
});

test("PATCH /feedback - tentando editar um feedback sendo um aluno", async () => {
  const adminLoginResponse = await request(app)
  .post("/login")
  .send(mockedTeacherLogin);
const UserTobeDeleted = await request(app)
  .get("/feedback")
  .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

const response = await request(app)
  .patch(`/feedback/${UserTobeDeleted.body[0].id}`)
  .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
expect(response.status).toBe(204);
expect(response.body).toHaveProperty("message");
});

test("PATCH /feedback - tentando editar um feedback sendo um aluno", async () => {
  const adminLoginResponse = await request(app)
  .post("/login")
  .send(mockedStudentLogin);
const UserTobeDeleted = await request(app)
  .get("/feedback")
  .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

const response = await request(app)
  .patch(`/feedback/${UserTobeDeleted.body[0].id}`)
  .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
expect(response.status).toBe(400);
expect(response.body).toHaveProperty("message");
});

test("PATCH /feedback - tentando editar um feedback sem id", async () => {
  const adminLoginResponse = await request(app)
    .post("/login")
    .send(mockedTeacherLogin);

  const response = await request(app)
    .patch(`/feedback/13970660-5dbe-423a-9a9d-5c23b37943cf`)
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty("message");
});

test("PATCH /feedback - tentando editar um feedback sem estar logado", async () => {
  const response = await request(app).patch(
    `/feedback/13970660-5dbe-423a-9a9d-5c23b37943cf`
  );
  expect(response.status).toBe(401);
  expect(response.body).toHaveProperty("message");
});

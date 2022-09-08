import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  mockedFeedback,
  mockedFeedbackBranco,
  mockedFeedbackUpdated,
  mockedStudent,
  mockedStudentLogin,
  mockedTeacher,
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

  test("POST /feedback - deve criar um feedback sendo um professor", async () => {
    await request(app).post("/teachers").send(mockedTeacher);
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .post("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`)
      .send(mockedFeedback);

    expect(response.body).toHaveProperty("updated_at");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("feedback");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(201);
  });

  test("POST /feedback - tentando criar um feedback em branco", async () => {
    await request(app).post("/teachers").send(mockedTeacher);
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);
    const response = await request(app)
      .post("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`)
      .send(mockedFeedbackBranco);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /feedback - tentando criar um feedback sendo um aluno", async () => {
    await request(app).post("/student").send(mockedStudent);
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedStudentLogin);
    const response = await request(app)
      .post("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`)
      .send(mockedFeedback);

    expect(response.body.type).not.toBe("aluno");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /feedback - tentando criar um feedback sem estar logado", async () => {
    const response = await request(app).post("/feedback").send(mockedFeedback);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /feedback - pegando feedbacks", async () => {
    const TeacherResponse = await request(app)
      .post("/teachers")
      .send(mockedTeacher);
    // console.log(TeacherResponse.body);
    const res = await request(app)
      .post("/login")

      .send(mockedTeacherLogin);
    // console.log(res.body);
    const response = await request(app)
      .get("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);
    // console.log(response.body);

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

  
  test("PATCH /feedback - tentando editar um feedback sendo um professor", async () => {
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);
    const FeedbackTobe = await request(app)
      .get("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);

    const response = await request(app)
      .patch(`/feedback/${FeedbackTobe.body[0].id}`)
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`)
      .send(mockedFeedbackUpdated);
    expect(response.status).toBe(204);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /feedback - tentando editar um feedback sendo um aluno", async () => {
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedStudentLogin);
      // console.log(TeacherResponse.body)

    const FeedbackTobeDeleted = await request(app)
      .get("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);
      // console.log(FeedbackTobeDeleted.body)

    const response = await request(app)
      .patch(`/feedback/${FeedbackTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`)
      .send(mockedFeedbackUpdated);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /feedback - tentando editar um feedback sem id", async () => {
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);
      console.log(TeacherResponse.body)

      // const FeedbackTobeDeleted = await request(app)
      // .get("/feedback")
      // .set("Authorization", `Bearer ${TeacherResponse.body.token}`);
      // console.log(FeedbackTobeDeleted.body)

      const response = await request(app)
      .patch(`/feedback/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`)
      .send(mockedFeedbackUpdated);
      console.log(response.body)
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /feedback - tentando editar um feedback sem estar logado", async () => {
    const response = await request(app)
      .patch(`/feedback/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .send(mockedFeedbackUpdated);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
  test("DELETE /feedback - deletando um feedback sendo um professor", async () => {
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);

    const FeedbackTobeDeleted = await request(app)
      .get("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);

    const response = await request(app)
      .delete(`/feedback/${FeedbackTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);
    expect(response.status).toBe(204);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /feedback - tentando deleta um feedback sendo um aluno", async () => {
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedStudentLogin);
    const FeedbackTobeDeleted = await request(app)
      .get("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);

    const response = await request(app)
      .delete(`/feedback/${FeedbackTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /feedback - tentando deleta um feedback sem id valido", async () => {
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .delete(`/feedback/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);
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
});

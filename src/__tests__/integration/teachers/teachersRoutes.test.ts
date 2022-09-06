import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedSchool, mockedTeacher, mockedTeacherLogin, mockedTeacherUpdate } from "../../mocks";

describe("/teachers", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /teachers - Deve ser capaz de criar o cadastro do professor",async () => {
        const response = await request(app).post('/teachers').send(mockedTeacher)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toHaveProperty("type")
        expect(response.body).toHaveProperty("shift")
        expect(response.body).toHaveProperty("matter")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("feedbacks")
        expect(response.body.name).toEqual("Fábio Junior")
        expect(response.body.email).toEqual("fabio@mail.com.br")
        expect(response.body.type).toEqual("Teacher")
        expect(response.body.shift).toEqual("Matutino")
        expect(response.body.matter).toEqual("Back-End")
        expect(response.status).toBe(201)        
    })

    test("POST /teachers -  Não deve ser capaz de cadastrar um professor já existente",async () => {
        const response = await request(app).post('/teachers').send(mockedTeacher)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("GET - Não deve ser capaz de listar com ID errado", async() => {
        await request(app).post('/teachers').send(mockedTeacher)

        const teacherLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
        
        const response = await request(app).get(`/teachers/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${teacherLoginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })

    test("GET /teachers/:id -  Não deve ser capaz de listar sem autenticação de usuário",async () => {
        const teacherLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
        const TeacherTobeListed = await request(app).get('/teachers').set("Authorization", `Bearer ${teacherLoginResponse.body.token}`)

        const response = await request(app).get(`/teachers/${TeacherTobeListed.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)

    })

    test("GET /teachers -  Não deve ser capaz de listar sem ser do tipo escola",async () => {
        const teacherLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
        const response = await request(app).get('/teachers').set("Authorization", `Bearer ${teacherLoginResponse.body.token}`)

        expect(response.body[0]).toHaveProperty("type")
        expect(response.body[0].type).toEqual(!'school')
        expect(response.status).toBe(403)

    })

    test("GET /teachers -  Deve ser capaz de listar os professores",async () => {
        await request(app).post('/users').send(mockedSchool)
        const schoolLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
        const response = await request(app).get('/users').set("Authorization", `Bearer ${schoolLoginResponse.body.token}`)

        expect(response.body).toHaveProperty('type')
        expect(response.body.type).toEqual('school')
        expect(response.status).toBe(200)

    })

    test("PATCH /teachers - Deve ser capaz de alterar o cadastro do professor",async () => {
        const teacherLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
        const TeacherTobeUpdated = await request(app).get('/teachers').set("Authorization", `Bearer ${teacherLoginResponse.body.token}`)

        const response = await request(app).patch(`/teachers/${TeacherTobeUpdated.body[0].id}`).send(mockedTeacherUpdate)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toHaveProperty("type")
        expect(response.body).toHaveProperty("shift")
        expect(response.body).toHaveProperty("matter")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("feedbacks")
        expect(response.body.name).toEqual("Júnior Fábio")
        expect(response.body.email).toEqual("fabio@mail.com.br")
        expect(response.body.type).toEqual("Teacher")
        expect(response.body.shift).toEqual("Matutino")
        expect(response.body.matter).toEqual("Back-End")
        expect(response.status).toBe(201)        
    })

    test("patch /teachers/:id -  Não deve ser capaz de alterar sem autenticação de usuário",async () => {
        const teacherLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
        const TeacherTobeDeleted = await request(app).get('/teachers').set("Authorization", `Bearer ${teacherLoginResponse.body.token}`)

        const response = await request(app).patch(`/teachers/${TeacherTobeDeleted.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)

    })

    test("PATCH /teachers/:id -  Não deve ser capaz de deletar com ID errado",async () => {
        await request(app).patch('/teachers').send(mockedTeacher)

        const teacherLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
        
        const response = await request(app).patch(`/teachers/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${teacherLoginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")

    })

})

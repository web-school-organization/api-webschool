import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import {mockedStudent} from "../../mocks"

describe("students", () => {
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

    test("POST /students -  Must be able to create a student",async () => {
        const response = await request(app).post('/students').send(mockedStudent)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("UpdatedAt")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual("Joana")
        expect(response.body.email).toEqual("joana@mail.com")
        expect(response.status).toBe(201)        

    })

    test("POST /students -  should not be able to create a student that already exists",async () => {
        const response = await request(app).post('/students').send(mockedStudent)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
             
    })


    test("POST /students - should not be able to create a student without authentication",async() => {
        const response = await request(app).post('/students').send(mockedStudent);
//   precisa logar etc...
        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(400);

    })

    test("GET /students - should be able to list all students ",async()=>{
        // login
        const response = await request(app).get("/students")
        expect(response.body).toHaveLength(1)
    } )

    test("GET /students - should not be able to list students without authentication",async()=>{


        const response = await request(app).get("/students")

        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(400)

    } )

    test("GET /students/:id - should be able to list specific student",async()=>{

        // login
        const response = await request(app).get("/students/:id")

        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('type');
        expect(response.body).toHaveProperty('shift');
        expect(response.body).toHaveProperty('team');
        expect(response.body).toHaveProperty('registration');
        expect(response.body).toHaveProperty('feedbacks');


    } )

    test("GET /students/:id - should not be able to list specific student without authentication",async()=>{



        const response = await request(app).get("/students/:id")

        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(400)


    } )

    test("GET /students/:id - should not be able to list specific student with invalid id",async()=>{


        // login
        const response = await request(app).get("/students/4234i20")

        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(400)


    } )

    test("Delete /students/:id - should be able to Delete Student",async()=>{

        const schollLoginResponse = await request(app).post("/login").send({});
        const StudentTobeDeleted = await request(app).get('/students').set("Authorization", `Bearer ${schollLoginResponse.body.token}`)

        const response = await request(app).delete(`/students/${StudentTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${schollLoginResponse.body.token}`)

        expect(response.status).toBe(204) 
    })

    test("Delete /students/:id - should not be able to Delete Student without authentication",async()=>{
        const schollLoginResponse = await request(app).post("/login").send({});
        const StudentTobeDeleted = await request(app).get('/students').set("Authorization", `Bearer ${schollLoginResponse.body.token}`)
        const response = await request(app).delete(`/students/${StudentTobeDeleted.body[0].id}`)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(400);
    })


    test("Delete /students/:id - should not be able to Delete Student with invalid id",async()=>{

        const schollLoginResponse = await request(app).post("/login").send({});
        await request(app).get('/students').set("Authorization", `Bearer ${schollLoginResponse.body.token}`)

        const response = await request(app).delete(`/students/302430-2`).set("Authorization", `Bearer ${schollLoginResponse.body.token}`)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(404) 
    })


    test("PATCH /students/:id - should be able to update student",async()=>{

        const schollLoginResponse = await request(app).post("/login").send({});
        const StudentTobeUpdated= await request(app).get('/students').set("Authorization", `Bearer ${schollLoginResponse.body.token}`)

        const response = await request(app).patch(`/students/${StudentTobeUpdated.body[0].id}`).set("Authorization", `Bearer ${schollLoginResponse.body.token}`)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("UpdatedAt")
        expect(response.body).not.toHaveProperty("password")
        expect(response.status).toBe(200)   
    })

    test("Update /students/:id - should not be able to Update Student with invalid id",async()=>{

        const schollLoginResponse = await request(app).post("/login").send({});
        await request(app).get('/students').set("Authorization", `Bearer ${schollLoginResponse.body.token}`)

        const response = await request(app).patch(`/students/302430-2`).set("Authorization", `Bearer ${schollLoginResponse.body.token}`)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(404) 
    })


    test("Update /students/:id - should not be able to Update Student without authentication",async()=>{

        const schollLoginResponse = await request(app).post("/login").send({});
        const StudentTobeUpdated= await request(app).get('/students').set("Authorization", `Bearer ${schollLoginResponse.body.token}`)
        const response = await request(app).patch(`/students/${StudentTobeUpdated.body[0].id}`)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(400) 
    })






})
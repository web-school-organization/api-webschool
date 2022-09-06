import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";

describe("/teams - Rota responsável pelas funcionalidades das turmas", () => {
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

  test("POST /teams - ", async () => {});
});

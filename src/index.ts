import "reflect-metadata";
import { createConnection } from "typeorm";
import { Users } from "./entity/Users";
export class Index {
  constructor() {
    createConnection()
      .then(async (connection) => {
        console.log("Inserting a new user into the database...");
        const user = new Users();
        user.name = "Praful";

        await connection.manager.save(user);
        console.log("Saved a new user with id: " + user.userId);

        console.log("Loading users from the database...");
        const users = await connection.manager.find(Users);
        console.log("Loaded users: ", users);
        connection.close();
      })
      .catch((error) => console.log(error));
  }
}

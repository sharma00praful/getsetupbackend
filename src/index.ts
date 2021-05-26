import "reflect-metadata";
import { createConnection } from "typeorm";
import { Users } from "./entity/Users";

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "mysql",
  entities: [__dirname + "/entity/*.ts"],
  synchronize: true,
  logging: false,
})
  .then(async (connection) => {
    console.log("Inserting a new user into the database...");
    const user = new Users();
    user.name = "Praful";

    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.userId);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(Users);
    console.log("Loaded users: ", users);
  })
  .catch((error) => console.log(error));

import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({
    length: 25,
  })
  name: string;
}

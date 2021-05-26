import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserAvailabilityDates {
  @PrimaryGeneratedColumn()
  dateId: number;

  @Column()
  userId: number;

  @Column()
  week: number;

  @Column()
  date: string;
}

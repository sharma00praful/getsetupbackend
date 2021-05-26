import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserAvailabilitySlots } from "./UserAvailabilitySlots";
@Entity()
export class UserAvailabilityDates {
  @PrimaryGeneratedColumn()
  @OneToMany((type) => UserAvailabilitySlots, (slot) => slot.dateId)
  dateId: number;

  @Column()
  userId: number;

  @Column()
  week: number;

  @Column()
  date: string;
}

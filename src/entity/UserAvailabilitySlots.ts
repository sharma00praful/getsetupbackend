import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserAvailabilityDates } from "./UserAvailabilityDates";
@Entity()
export class UserAvailabilitySlots {
  @PrimaryGeneratedColumn()
  slotId: number;

  @ManyToOne((type) => UserAvailabilityDates, (date) => date.dateId)
  dateId: number;

  @Column()
  from: string;

  @Column()
  to: string;
}

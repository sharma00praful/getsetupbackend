import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserAvailabilitySlots {
  @PrimaryGeneratedColumn()
  slotId: number;

  @Column()
  dateId: number;

  @Column()
  from: string;

  @Column()
  to: string;
}

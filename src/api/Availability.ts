import "reflect-metadata";
import { getConnection } from "typeorm";
import { UserAvailabilityDates } from "../entity/UserAvailabilityDates";
import { UserAvailabilitySlots } from "../entity/UserAvailabilitySlots";
interface ItemDate {
  date: string;
  slots: any;
  dateId: number;
  this: any;
}
interface Validate {
  status: boolean;
  message: string;
}

export class Availability {
  userId: number;
  weekNumber: number;
  availability: any;
  datesTable: any;
  slotsTable: any;
  response: any;
  validated: Validate;

  constructor(requestBody: any, res: any) {
    this.userId = requestBody.userId;
    this.weekNumber = requestBody.weekNumber;
    this.availability = requestBody.availability;
    this.response = res;
  }

  add() {
    this.validate(this.availability);
    if (this.validated.status) {
      this.addAvailability();
    }
  }

  addAvailability() {
    const dbPromises = [];
    for (const itemDate of this.availability) {
      dbPromises.push(this.addDate(itemDate));
    }
    Promise.all(dbPromises).then(() => {
      this.response.status(200).send(JSON.stringify(this.validated));
    });
  }

  async addDate(itemDate: ItemDate) {
    itemDate.this = this;
    let that = this;
    return new Promise(async function (myResolve, myReject) {
      let date = itemDate.date;

      let connection = getConnection();
      const entityManager = getConnection().manager;
      try {
        const rawData = await entityManager
          .createQueryBuilder(UserAvailabilityDates, "dates")
          .where("dates.date = :date", { date: date })
          .andWhere("dates.userId = :userId", { userId: that.userId })
          .getRawOne();
        //checking if date already exist for this user

        if (rawData !== undefined) {
          itemDate.dateId = rawData.dates_dateId;
          await that.clearOldSlots(itemDate.dateId);
        } else {
          const datesTable = new UserAvailabilityDates();
          datesTable.userId = that.userId;
          datesTable.week = that.weekNumber;
          datesTable.date = date;
          await connection.manager.save(datesTable);

          itemDate.dateId = datesTable.dateId;
        }
        Promise.resolve(itemDate);
        await that.addSlots(itemDate);
      } catch (error) {
        console.log(error);
      } finally {
        myResolve(itemDate);
      }
    });
  }
  addSlots(itemDate: ItemDate) {
    const dbSlotPromises = [];
    for (const itemSlot of itemDate.slots) {
      dbSlotPromises.push(
        this.addSlot(itemSlot.from, itemSlot.to, itemDate.dateId)
      );
    }
    return Promise.all(dbSlotPromises);
  }

  async addSlot(from: string, to: string, dateId: number) {
    let slotId: number;
    let that = this;
    let connection = getConnection();
    return new Promise(async function (myResolve, myReject) {
      try {
        const slotsTable = new UserAvailabilitySlots();
        slotsTable.dateId = dateId;
        slotsTable.from = from;
        slotsTable.to = to;
        await connection.manager.save(slotsTable);
        slotId = slotsTable.slotId;
      } catch (error) {
        console.log(error);
      } finally {
        myResolve(slotId);
      }
    });
  }
  validate(availability: object) {
    //submission to occur in certain hours 7AM to 10PM
    const date = new Date();
    const currentHour = date.getHours();
    if (currentHour >= 0 && currentHour <= 1)
      //(currentHour < 7 || currentHour > 22)
      this.validated = {
        status: false,
        message: "Slot submission is only permitted between 7AM to 10PM",
      };
    else
      this.validated = {
        status: true,
        message: "No Errors, Request Submitted!",
      };
  }
  async clearOldSlots(dateId: number) {
    const entityManager = getConnection().manager;
    await entityManager
      .createQueryBuilder(UserAvailabilitySlots, "slots")
      .delete()
      .where("dateId = :id", { id: dateId })
      .execute();
  }
}

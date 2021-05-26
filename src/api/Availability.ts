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

  async add() {
    this.validate(this.availability);
    if (this.validated.status) {
      this.availability.forEach((itemDate: any) => {
        //saving all dates for a user and getting unique id for slot processing
        const dateId = this.addDate(itemDate);
      });
      this.response.status(200).send(JSON.stringify(this.validated));
    } else {
      this.response.status(200).send(JSON.stringify(this.validated));
    }
  }
  addDate(itemDate: ItemDate) {
    itemDate.this = this;
    let that = this;
    let myPromise = new Promise(async function (myResolve, myReject) {
      let date = itemDate.date;

      let connection = getConnection();
      try {
        const datesTable = new UserAvailabilityDates();
        datesTable.userId = that.userId;
        datesTable.week = that.weekNumber;
        datesTable.date = date;
        await connection.manager.save(datesTable);

        itemDate.dateId = datesTable.dateId;
      } catch (error) {
        console.log(error);
      } finally {
        myResolve(itemDate);
      }
    });

    myPromise.then(function (itemDate: ItemDate) {
      itemDate.slots.forEach((itemSlot) => {
        itemDate.this.addSlot(itemSlot.from, itemSlot.to, itemDate.dateId);
      });
    });
  }

  async addSlot(from: string, to: string, dateId: number) {
    let slotId: number;
    let that = this;
    let connection = getConnection();
    try {
      const slotsTable = new UserAvailabilitySlots();
      slotsTable.dateId = dateId;
      slotsTable.from = from;
      slotsTable.to = to;
      await connection.manager.save(slotsTable);
      slotId = slotsTable.slotId;
    } catch (error) {
      console.log(error);
    }
    return slotId;
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
}

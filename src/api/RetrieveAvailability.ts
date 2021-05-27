import "reflect-metadata";
import { getConnection } from "typeorm";
import { UserAvailabilityDates } from "../entity/UserAvailabilityDates";

export class RetrieveAvailability {
  userId: number;
  response: any;
  constructor(requestBody: any, res: any) {
    this.userId = requestBody.userId;
    this.response = res;
  }

  async retrieve() {
    const entityManager = getConnection().manager;
    const rawData = await entityManager
      .createQueryBuilder(UserAvailabilityDates, "dates")
      .orderBy("dates.date")
      .innerJoinAndSelect("dates.dateId", "slot")
      .where("dates.userId = :userId", { userId: this.userId })
      .getMany();
    this.response.status(200).send(JSON.stringify(rawData));
  }
}

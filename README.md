# GetSetUp Backend Assignment

This app is deployed to an aws instance with end point POST http://3.108.101.52:50001/availability and POST http://3.108.101.52:50001/getavailability

For this project i have used:
1. TypeScript
2. TypeORM
3. MySql
4. Node
5. aws lightsail (for deployment)
6. pm2 for process management

there are two end points 
1. POST /availability
for saving availability data as:
{
  "userId": 123456,
  "weekNumber": 1,
  "availability": [
    {
      date:date,
      slots:[
      {
        from:time,
        to:time
      },....
  ]
}

I use this data structure because there is a one to many connection between dates table and slots table.

2. POST  /getavailability
for getting availability data as:
{
  "userId": 123456,
}
all the slots will be fetched using this endpoint.


Data Modeling:
I have used mysql in this perticular app as we need to make connections between datasets, and mysql is very good at that.

there are three tables,
1. users (for storing user information)
2. user_availability_date (for storing user availability dates with weekNumber and keeping userId as foreign key | using this we can even get all the available dates if we dont want to fetch the time JUST AN IDEA | NOT IMPLEMENTED)
3. user_availability_slot (for storing available time slots keeping dateId as foreign key)

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command


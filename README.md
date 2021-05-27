# GetSetUp Backend Assignment

This app is deployed to an aws instance with end point POST https://gtstupbckend.nbb.world/availability and POST https://gtstupbckend.nbb.world/getavailability

For this project i have used:
1. TypeScript
2. TypeORM
3. MySql
4. Node
5. aws lightsail (for deployment)
6. pm2 for process management

there are two end points 
# 1. POST /availability
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

#features
1. The api will only accept request if the time is in between 7AM to 10PM
2. The api will check for previously added date and if date is already there, no duplicate dates will be inserted for a user.
3. The api will clear all previous slots for a date and insert new slots if the api requested for same date again.
4. If no or wrong input is made to the api the api will return a bad request message. 

# 2. POST  /getavailability
for getting availability data as:
{
  "userId": 123456,
}
all the slots will be fetched using this endpoint.

#features
1. This api will take userId as input and fetch all the dates and slots selected for that user.
2. This api will not send a date if there is no slot for that perticular date.

Data Modeling:
I have used mysql in this particular app as we need to make connections between datasets, and mysql is very good at that.

there are three tables,
1. users (for storing user information)
2. user_availability_date (for storing user availability dates with weekNumber and keeping userId as foreign key | using this we can even get all the available dates if we dont want to fetch the time JUST AN IDEA | NOT IMPLEMENTED)
3. user_availability_slot (for storing available time slots keeping dateId as foreign key)

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

P.S. I learnt TypeScript for this assignment. So please ignore some noobie mistakes (if any) in the code. :D -Thanks.

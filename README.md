# 18 NoSQL: Social Network API

## The Challenge: 

MongoDB is a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data. As the foundation of these applications is data, it’s important that we understand how to build and structure the API first.

Your Challenge is to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. You’ll use Express.js for routing, a MongoDB database, and the Mongoose ODM. 

No seed data is provided, so you’ll need to create your own data using Postman after you’ve created your API.



## Technology Stacks:
- momment.js
- MongoDB
- Mongoose ODM



## npm Packages:
- inquirer
- Express.js
- momment.js


## Project Conduction:
As a social media startup, I want an API for my social network that uses a NoSQL database for the website to handle large amounts of unstructured data.




## Acceptance Criteria


- While using social network API, the user enters the command to invoke the application with expectations that my server has started and the Mongoose models are synced to the MongoDB database.

- When the user opens API GET routes in Postman for users and thoughts/posts, the data for each of these routes is displayed in a formatted JSON.

- When the user tests API POST, PUT, and DELETE routes in Postman they are able to successfully create, update, and delete users and thoughts/posts in my database.

- When the user tests API POST and DELETE routes in Postman, they are able to successfully create and delete reactions to thoughts/posts and add and remove friends to a user’s friend list.


## Mock-Up:

The following screenshots show examples of the application's API routes being tested in Postman.



![Screenshot of GET routes to return all users and all thoughts being tested in Postman.](./Assets/18-nosql-homework-demo-1.gif)


![Screenshot that shows GET routes to return a single user and a single thought being tested in Postman.](./Assets/18-nosql-homework-demo-0.gif)



![Screenshot that shows the POST, PUT, and DELETE routes for users being tested in Postman.](./Assets/18-nosql-homework-demo-03.gf)


![Screenshot that shows the POST and DELETE routes for a user’s friend list being tested in Postman.](./Assets/18-nosql-homework-demo-04.gi)



## The Deployment:

The Repository: [Click Here.](https://github.com/NovaLanceBrittany/HW-18-NoSQL-Network-API)

The Google Drive: [Click Here.](https://drive.google.com/drive/folders/1KNtOhXbQv3aHoMZPWqVkL0XpgqmRW2zs?usp=sharing)
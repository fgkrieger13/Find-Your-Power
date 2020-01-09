# Find Your Power: A Social Network for Professional Women
This project was created to bring a vision into reality: `Find Your Power`, a local non-profit, wanted to create a community where women can network with each other. As connections are made, women help each other by sharing their skills and resources. The goal is that these partnerships will empower women to be successful and thrive in their businesses. This web application is an interactive social network where women can connect with each other. Users can build a profile which reflects their skills, services, and description of themselves as a professional and they can also facilitate connections by introducing users to each other. 


## Prerequisites
In order to run this project, the following software needed to be installed:
- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create the database and tables in SQL
We created a new database called `find_your_power` and created `user` and `connections` tables:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (50) NOT NULL,
    "last_name" VARCHAR (80) NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "username" VARCHAR (150) UNIQUE NOT NULL,
    "time_user" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "zipcode" INT,
    "bio" VARCHAR (1000),
    "skills" TEXT,
    "services" TEXT,
    "roles" TEXT,
    "avatar" VARCHAR (1000),
    "token" VARCHAR (1000),
    "token_exp" TIMESTAMP
);

CREATE TABLE "connections" (
	"id" SERIAL PRIMARY KEY,
	"connecting_id" INT REFERENCES "user",
	"connecting_to_id" INT REFERENCES "user",	
	"connector_id" INT REFERENCES "user",
	"message" TEXT,
	"connecting_accepted" BOOLEAN DEFAULT 'false',
	"connecting_to_accepted" BOOLEAN DEFAULT 'false',
    "active" BOOLEAN DEFAULT 'true'
);
```

## Built With
- React.js
- Redux
- Express
- PostgreSQL
- Passport
- AWS S3
- Material UI
- Nodemailer    

## Authors
- Brooks Geenen, Hayley Hollermann, Grant Krieger, Victoria Ukatu

## License
----- -----

## Acknowledgments
- We would like to thank Ivy Kaminsky for sharing her vision with us and the opportunity to contribute to the goal of `Find Your Power` through designing and building this application. We would also like to thank Prime Digital Academy and the support we received from our instructors and cohort.







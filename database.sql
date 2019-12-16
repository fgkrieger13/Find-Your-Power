
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (50) NOT NULL,
    "last_name" VARCHAR (80) NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "username" VARCHAR (150) UNIQUE NOT NULL,
    "time_user" TIMESTAMP,
    "zipcode" INT,
    "skills" TEXT,
    "services" TEXT,
    "roles" TEXT,
    "avatar" VARCHAR (1000)
);

CREATE TABLE "connections" (
	"id" SERIAL PRIMARY KEY,
	"connecting_id" INT REFERENCES "user",
	"connecting_to_id" INT REFERENCES "user",	
	"connector_id" INT REFERENCES "user",
	"message" TEXT,
	"connecting_accepted" BOOLEAN DEFAULT 'false',
	"connecting_to_accepted" BOOLEAN DEFAULT 'false'
);

INSERT INTO "user" ("first_name", "last_name", "password", "username", "connecting_to_accepted", "connecting_accepted") 
VALUES ('jen', 'johnson', '$2b$10$5J3Xx09dG8MNOLjTNNFsO.rvhdA7f7ZCUx6PS7f/P5Hsget8CLMI.', 'jj@gmail.com'), ('jane', 'doe', '$2b$10$DQGJ/9cBhMm7317XUwKBL.ALlAuFlQ5.J0/dEDZNB/xHXzfGP5PG.', 'jdoe@gmail.com'); 

INSERT INTO "connections" ("connecting_id", "connecting_to_id", "connector_id", "message")
VALUES ('2', '3', '1', 'hello Jen, I think you should connect with Jane', 'true', 'true');
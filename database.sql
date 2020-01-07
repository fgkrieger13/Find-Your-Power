-- Creates table of each user's profile information
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (50) NOT NULL,
    "last_name" VARCHAR (80) NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "username" VARCHAR (150) UNIQUE NOT NULL,
    "time_user" TIMESTAMP,
    "zipcode" INT,
    "bio" VARCHAR (1000),
    "skills" TEXT,
    "services" TEXT,
    "roles" TEXT,
    "avatar" VARCHAR (1000)
);

-- Creates table of the connector and connectees involved in each connection
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

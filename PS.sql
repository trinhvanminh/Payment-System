----------------------------
-- Table structure for User
-- ----------------------------

DROP TABLE IF EXISTS "User" CASCADE;
CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "password" VARCHAR(255) not null,
  "sodu" INTEGER not null,
  "role" VARCHAR(255) not null
)	
;
-- ----------------------------
-- Records of User
-- ----------------------------
BEGIN;
INSERT INTO "User" (id,password, sodu,role)  VALUES (1,'$2a$12$W/YJXySK8/oN199/pM0MYuS7M0okkSGQTHZIbDHkZr1Fursa5PEBq',10000000,'user');
INSERT INTO "User" (id,password, sodu,role)  VALUES (2,'$2b$10$WgNZ44kOiWXwwgMdN86z2uQv7OEnmOgmiA8YEyMXVWjv/Z9yrzQLi',10000000,'user');
INSERT INTO "User" (id,password, sodu,role)  VALUES (3,'',10000000,'user');
INSERT INTO "User" (id,password, sodu,role)  VALUES (4,'',10000000,'user');
INSERT INTO "User" (id,password, sodu,role)  VALUES (5,'',10000000,'user');
INSERT INTO "User" (id,password, sodu,role)  VALUES (1000,'',0,'manager');


COMMIT;


DROP TABLE IF EXISTS "History" CASCADE;
CREATE TABLE "History" (
  "id_history" SERIAL PRIMARY KEY,
  "amount" INTEGER not null,
  "id_user" INTEGER not null
)	
;

BEGIN;
INSERT INTO "History" (id_history,amount, id_user)  VALUES (1,100000,2);
INSERT INTO "History" (id_history,amount, id_user)  VALUES (2,128000,2);



COMMIT;

ALTER TABLE "History" ADD CONSTRAINT "FK_History_User" FOREIGN KEY ("id_user") REFERENCES "User"("id") on delete SET NULL;







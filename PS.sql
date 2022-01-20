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
INSERT INTO "User" (id,password, sodu,role)  VALUES (1,'$2a$12$W/YJXySK8/oN199/pM0MYuS7M0okkSGQTHZIbDHkZr1Fursa5PEBq','10000000','user');
INSERT INTO "User" (id,password, sodu,role)  VALUES (2,,'10000000','user');
COMMIT;


-- ----------------------------
-- Foreign Keys structure for table NguoiLienQuan
-- ----------------------------








DELETE * FROM food;
DELETE * FROM category;
DELETE * FROM meal;
DELETE * FROM cuisine;
DELETE * FROM ingredient;
DELETE * FROM meal_request;
DELETE * FROM user;
DELETE * FROM user_type;
DELETE * FROM order;

DROP TABLE food CASCADE;
DROP TABLE category CASCADE;
DROP TABLE meal CASCADE;
DROP TABLE cuisine CASCADE;
DROP TABLE ingredient CASCADE;
DROP TABLE meal_request CASCADE;
DROP TABLE usr CASCADE;
DROP TABLE user_type CASCADE;
DROP TABLE ordr CASCADE;

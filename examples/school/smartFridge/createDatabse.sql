SET search_path = 'SmartFridge';

SET search_path = 'project';



CREATE TABLE project.food 

(fid SERIAL NOT NULL, 
food_name VARCHAR(30) NOT NULL, 
quantity INTEGER, 
price_per_item INTEGER, 
threshold INTEGER, 
valid varchar(5),
PRIMARY KEY (fid));


CREATE TABLE project.category 
(fid INTEGER NOT NULL,
cat_name VARCHAR(30) NOT NULL, 
FOREIGN KEY(fid) REFERENCES food,
PRIMARY KEY (fid, cat_name)); 


CREATE TABLE project.meal 
(mid SERIAL NOT NULL, 
meal_name VARCHAR(30) NOT NULL, 
description VARCHAR(100), 
times_ordered INTEGER,
valid VARCHAR(5),
PRIMARY KEY (mid));


CREATE TABLE project.cuisine 
(mid INTEGER NOT NULL,
cus_name VARCHAR(30) NOT NULL, 
PRIMARY KEY (mid, cus_name),
FOREIGN KEY (mid) REFERENCES project.meal); 


CREATE TABLE project.ingredient
(fid INTEGER,
mid INTEGER,
PRIMARY KEY (mid,fid),
FOREIGN KEY (mid) REFERENCES project.meal,
FOREIGN KEY (fid) REFERENCES project.food);



CREATE TABLE project.user_type 
(utid INTEGER NOT NULL, 
ut_name VARCHAR(30), 
PRIMARY KEY (utid)); 


CREATE TABLE project.usr 
(uid INTEGER NOT NULL, 
utid INTEGER, 
user_name VARCHAR(30), 
passwd VARCHAR(15),
PRIMARY KEY (uid), 
FOREIGN KEY(utid) 
REFERENCES project.user_type); 



CREATE TABLE project.meal_request 
(req_num INTEGER NOT NULL, 
mid INTEGER NOT NULL, 
uid INTEGER, 
PRIMARY KEY (req_num), 
FOREIGN KEY(mid) 
REFERENCES project.meal,
FOREIGN KEY(uid) 
REFERENCES project.usr); 


CREATE TABLE project.ordr 
(oid INTEGER NOT NULL, 
food_id INTEGER, 
amount INTEGER, 
fulfilled VARCHAR(5), 
PRIMARY KEY (oid), 
FOREIGN KEY(food_id) 
REFERENCES project.food); 

INSERT INTO project.meal(meal_name, description, times_ordered, valid) VALUES
('Pizza', 'Dough topped with tomato sauce, cheese, and other vegetables and meat.',1, 'true'),
('General Tao', 'Fried breaded chicken.',1,'true'),
('Toast and tomatoe', 'toast with tomatoe on it',0,'false'),
;



INSERT INTO project.food(food_name, quantity, price_per_item, threshold, valid) VALUES
('Tuna', 1, 20, 1,'true'),
('Chicken', 2, 13, 1,'true'),
('Eggs', 12, 4, 1,'true'),
('Bread', 18, 1, 5,'true'),
('Cheese', 5, 2,4,'true'),
('Tomatoe',5, 2, 4,'true');


INSERT INTO project.category(fid ,cat_name) VALUES
(4,'Grain'),
(5, 'Dairy'),
(3, 'Meat'),
(2, 'Meat'),
(6, 'Vegetable'),
(1, 'Egg');


INSERT INTO project.ingredient(fid, mid) VALUES
(4,1),
(5,1),
(6,1),
(2,2),
(4,2),
(1,3),
(6,3);


INSERT INTO project.cuisine(mid,  cus_name) VALUES
(1, 'Italian'),
(2, 'Chinese');


INSERT INTO project.ordr(oid, food_id, amount) VALUES
(23, 1, 3),
(24, 3, 1),
(25, 2, 1);


INSERT INTO project.user_type(utid, ut_name) VALUES
(1, 'Administrator'),
(2, 'User'),
(3, 'Chef');


INSERT INTO project.usr(uid, utid, user_name,passwd) VALUES
(1, 1,  'admin','1234'),
(2,2, 'user','1234'),
(3,3, 'chef','1234');


INSERT INTO project.meal_request(req_num,mid, uid) VALUES
(1, 1, 2),
(2, 2, 2);

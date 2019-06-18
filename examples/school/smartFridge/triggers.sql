--Queries for regular users

-- Query returning all of the food that is available in the fridge
SELECT * 
FROM Food
WHERE count > 0;

-- Query returning the meals registered in the fridge, even if ingredients are unavailable or the meal is not approved
SELECT M.MID, M.meal_name, M.description
FROM Meal AS M;

--query to find only meals for which all ingredients are currently present
SELECT M.MID, M.meal_name, M.description
FROM Meal AS M
WHERE M.valid = 'true' AND NOT EXISTS(  	(SELECT I.FID
					FROM Ingredient AS I
					WHERE I.MID = M.MID)
					EXCEPT
					(SELECT I.FID
					FROM Meal AS M,Ingredient AS I, Food AS F
					WHERE I.MID = M.MID AND I.FID = F.FID AND F.count > 1));

-- Query returning the valid food in the fridge based upon the particular category
SELECT F.FID, F.Food_Name, C.Cat_Name, F.Count, F.Price_per_item, F.Threshold
FROM FOOD AS F, Category AS C
WHERE F.FID = C.FID AND F.valid = 'true'
GROUP BY C.cat_name, F.fid;

--Queries for chef only

-- Query returning all open meal requests
SELECT M.MID, M.UID, U.user_Name 
FROM Meal_request AS M, Usr AS U
WHERE M.UID = U.UID

--Query returning valid meals by cuisine
SELECT M.MID, M.meal_name, C.cus_name
FROM meal AS M, cuisine AS C
WHERE M.MID = C.MID AND M.valid = 'true'
Group BY C.cus_name, M.MID;

--return meals pending approval by the chef
--part of added functionality
SELECT M.MID, M.meal_name, M.description
FROM Meal AS M
WHERE M.valid = 'false';

--Queries for Admin only

-- Query returning the most expensive meal report. that is the list of all meals and the sum of all the ingredients' prices, ordered most expensive to least expensive
SELECT M.MID, M.meal_name, t.s
FROM ( SELECT M.MID, SUM(F.price_per_item) AS s
      FROM Meal AS M, Food AS F, Ingredient AS I
      WHERE F.FID = I.FID AND I.MID = M.MID
      GROUP BY M.MID) AS t join MEAL AS M ON M.MID = t.MID
ORDER BY t.s DESC
LIMIT 3;

-- Query returning the top 3 most popular meals based on the times ordered
SELECT M.MID, M.meal_name
FROM Meal AS M
ORDER BY M.times_ordered
LIMIT 3;


-- Query to return the top 3 ingredients used in the most meals
SELECT F.FID, F.food_name, t.c
FROM ( SELECT F.FID, COUNT(I) AS c
      FROM Food AS F, Ingredient AS I
      WHERE F.FID = I.FID
      GROUP BY F.FID) AS t join food AS F ON F.FID = t.FID
ORDER BY t.c DESC
LIMIT 3;

--return food items pending approval by the admin
--for added functionality
SELECT F.FID, F.food_name
FROM food AS F
WHERE F.valid = 'false';

 Triggers :-
 
-- Trigger to check if the user entering a meal is a Chef
CREATE TRIGGER Meal_Entry_Check
BEFORE INSERT ON Meal
FOR EACH ROW
EXECUTE PROCEDURE check_user_chef();
 
-- Trigger to check if the user entering a meal is a regular user (added functionality to have user to request dishes for chef's approval)
CREATE TRIGGER Meal_Entry_Check
BEFORE INSERT ON Meal
FOR EACH ROW
EXECUTE PROCEDURE check_regular_user();
 
-- Trigger to check if the user placing an order is indeed the chef
CREATE TRIGGER Order_Placement_Check
BEFORE INSERT ON Order
FOR EACH ROW
EXECUTE PROCEDURE check_user_chef();
 




-- Trigger to check if the user updating items in the food table is an administrator
CREATE TRIGGER Adding_Food_Check
BEFORE INSERT ON Food
FOR EACH ROW
EXECUTE PROCEDURE check_user_admin();
 
-- Trigger for smart fridge to automatically place order when food falls below threshold
CREATE TRIGGER Fridge_Auto_Order
AFTER UPDATE ON Food
FOR EACH ROW
WHEN (Count < Threshold)
EXECUTE PROCEDURE send_order(Food.FID);
 
-- Trigger to record fulfilled orders into the table after they have left the queue
CREATE TRIGGER Record_Fulfilled_Order
AFTER DELETE ON Order
FOR EACH ROW
INSERT INTO Order(OID,Food_ID, amount, fulfilled) VALUES (OLD OID,OLD Food_ID,OLD amount, ‘true’);
 


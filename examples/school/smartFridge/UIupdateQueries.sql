--updates and adds used by the UI

-- user to enter a new meal type meal
INSERT INTO meal(mid, meal_name, description, times_ordered, valid) VALUES
(n, 'name', 'description',0, 'false');

--admin to enter a meal
INSERT INTO meal(mid, meal_name, description, times_ordered, valid) VALUES
(n, 'name', 'description',0, 'true')


--user to request a new food type
INSERT INTO food(fid, food_name, count, price_per_item, threshold, valid) VALUES
(n, 'name', 0, 0, 0,'false').

--chef/admin to enter a new food
INSERT INTO food(fid, food_name, count, price_per_item, threshold, valid) VALUES
(n, 'name', 0, price, threshold,'true');

--user to reuest a meal to be made
INSERT INTO meal_request(req_num,mid, uid) VALUES
(n, mid, uid);

--chef after creating a meal fulfilling a request
UPDATE food
SET count = count-1
WHERE FID in (SELECT FID
				FROM Food AS F, Meal AS M, Ingredient AS I
				WHERE F.FID = I.FID AND I.MID = M.MID AND M.MID = meal)

UPDATE meal_request
DELETE *
WHERE req_num = n;

--admin after filing a food order
UPDATE food
SET count = n
WHERE FID = m;

UPDATE ordr
SET fullfilled = 'true'
WHERE OID = n;

--user getting a food item from the fridge

UPDATE food
SET count = count -1
WHERE FID =n;


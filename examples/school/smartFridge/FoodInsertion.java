package com.mit;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;

public class FoodInsertion {
	
	public static int insertFood(Food f){
		Connection conn;
		PreparedStatement pst;
		int status = 0;
			
		try{
		
		conn = ConnectionProvider.getCon();
		pst = conn.prepareStatement("INSERT INTO project.food(food_name,quantity,price_per_item,threshold,valid) VALUES(?,?,?,?,?)");
		pst.setString(1, f.getFood_name()); //set name
		pst.setInt(2,f.getQuantity()); //set count
		pst.setInt(3,f.getPrice_per_item()); //set price
		pst.setInt(4, f.getThreshold()); //set threshold
		pst.setString(5, "false");
		status = pst.executeUpdate();
		conn.close();
		pst.close();
	}catch(Exception ex){
		System.out.println(ex);
	}
		return status;
	}
	
	public static int adminInsertFood(Food f){
		Connection conn;
		PreparedStatement pst;
		int status = 0;
			
		try{
		
		conn = ConnectionProvider.getCon();
		pst = conn.prepareStatement("INSERT INTO project.food(food_name,quantity,price_per_item,threshold,valid) VALUES(?,?,?,?,?)");
		pst.setString(1, f.getFood_name()); //set name
		pst.setInt(2,f.getQuantity()); //set count
		pst.setInt(3,f.getPrice_per_item()); //set price
		pst.setInt(4, f.getThreshold()); //set threshold
		pst.setString(5, "true");
		status = pst.executeUpdate();
		conn.close();
		pst.close();
	}catch(Exception ex){
		System.out.println(ex);
	}
		return status;
	}
	
	public static int adminUpdateFood(Food f){
		Connection conn;
		PreparedStatement pst;
		int status = 0;
			
		try{
		
		conn = ConnectionProvider.getCon();
		pst = conn.prepareStatement("UPDATE project.food SET valid = 'true' WHERE (valid = 'false' AND fid = ?)");
		pst.setInt(1, f.getFid());
		status = pst.executeUpdate();
		conn.close();
		pst.close();
	}catch(Exception ex){
		System.out.println(ex);
	}
		return status;
	}	
	

	public static int userTakeFood(Food f){
		Connection conn;
		PreparedStatement pst;
		int status = 0;
			
		try{
		
		conn = ConnectionProvider.getCon();
		pst = conn.prepareStatement("UPDATE project.food SET quantity = quantity - 1 WHERE fid = ?");
		pst.setInt(1, f.getFid());
		status = pst.executeUpdate();
		conn.close();
		pst.close();
	}catch(Exception ex){
		System.out.println(ex);
	}
		return status;
	}
}

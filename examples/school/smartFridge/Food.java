package com.mit;

public class Food {
	private int fid;
	private String food_name;
	private int quantity;
	private int price_per_item;
	private int threshold;
	private String valid;
	
	
	public int getFid() {
		return fid;
	}
	public void setFid(int fid) {
		this.fid = fid;
	}
	public String getFood_name() {
		return food_name;
	}
	public void setFood_name(String food_name) {
		this.food_name = food_name;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public int getPrice_per_item() {
		return price_per_item;
	}
	public void setPrice_per_item(int price_per_item) {
		this.price_per_item = price_per_item;
	}
	public int getThreshold() {
		return threshold;
	}
	public void setThreshold(int threshold) {
		this.threshold = threshold;
	}
	public String getValid() {
		return valid;
	}
	public void setValid(String valid) {
		this.valid = valid;
	}
}

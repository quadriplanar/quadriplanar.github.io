package com.mit;

public class Meal{
	private int mid;
	private String meal_name;
	private String description;
	private int times_ordered;
	private String valid;

	
	
	public int getMid() {
		return mid;
	}
	public void setMid(int mid) {
		this.mid = mid;
	}
	public String getMeal_name() {
		return meal_name;
	}
	public void setMeal_name(String meal_name) {
		this.meal_name = meal_name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getTimes_ordered() {
		return times_ordered;
	}
	public void setTimes_ordered(int times_ordered) {
		this.times_ordered = times_ordered;
	}
	public String getValid() {
		return valid;
	}
	public void setValid(String valid) {
		this.valid = valid;
	}
}
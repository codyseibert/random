package main.predictor;

import java.sql.Connection;
import java.sql.DriverManager;

/**
 * TODO: Implement Me!
 * 
 * StockPredictor predicts the values for the next X amount of days.
 * 
 * @author cseibert  
 */
public class StockPredictor 
{
	/** The connection to MySQL */
	private static Connection theConnection;
	
	/**
	 * 
	 * @param args
	 */
	public static void main(String[] args)
	{
		new StockPredictor();
	}
	
	/**
	 * TODO: Implement me
	 */
	public StockPredictor()
	{
		try {
			Class.forName("com.mysql.jdbc.Driver");
	        theConnection = DriverManager.getConnection("jdbc:mysql://192.168.1.20/stocked?user=cseibert&password=x22Bzdibe91");  
		} catch (Exception e) {
			e.printStackTrace();
		} 
		
		// Ultimatley the StockPredictor should predict the values of all the tickers for the coming days (5 day window)
		
		//for each ticker
			//load last X (input window) stock entires
			//predict the new D days (5 output window)
			//since we are dealing with percent change (sum up the percent change)
				//larger positive values mean buy, larger negative values mean sell!
		
		//store this 5 day sum in the database along with the projected date
	}
}

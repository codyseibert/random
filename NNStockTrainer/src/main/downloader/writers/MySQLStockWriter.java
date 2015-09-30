package main.downloader.writers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;

import main.downloader.StockEntry;
import main.downloader.StockHistory;
import main.downloader.StockWriter;
import main.downloader.Ticker;

/**
 * Implementation for writing the stock information into MySQL.
 * 
 * @author cseibert 
 */
public class MySQLStockWriter  implements StockWriter
{
	/** The connection to the database. */
	private Connection theConnection;
	asdfs
	/**
	 * Default constructor
	 */
	public MySQLStockWriter()
	{ 
		theConnection = null;  
		
        try 
        {  
        	// TODO: Need to find a better way to make these queries...  Maybe
        	// there is a query builder API.
            Class.forName("com.mysql.jdbc.Driver");  
//            theConnection = DriverManager.getConnection("jdbc:mysql://localhost/stocked?user=root&password=itisag00ddayt0die9921");  
//            theConnection.createStatement().execute("DROP TABLE IF EXISTS tickers");
//            theConnection.createStatement().execute("DROP TABLE IF EXISTS entries");
//        	theConnection.createStatement().execute("CREATE TABLE tickers (symbol VARCHAR(255) PRIMARY KEY, company VARCHAR(255), sector VARCHAR(255), industry VARCHAR(255), country VARCHAR(255))");
//        	theConnection.createStatement().execute("CREATE TABLE entries (symbol VARCHAR(255), date DATE, adjusted_close REAL, close REAL, high REAL, low REAL, open REAL, volume REAL, PRIMARY KEY (symbol, date))");
        }
        catch (Exception e) 
        {  
            e.printStackTrace();  
        } 
	}
	
	@Override
	public void write(Map<Ticker, StockHistory> stocks) 
		throws SQLException 
	{   
		// Loop through each ticker and write the history to the database
		Iterator<Ticker> iter = stocks.keySet().iterator();
		while (iter.hasNext())
		{ 
			Ticker ticker = iter.next();
			StockHistory history = stocks.get(ticker);
			
			// Create the statement for adding the ticker
			PreparedStatement insertTicker = 
				theConnection.prepareStatement(
					"INSERT INTO tickers VALUES (?, ?, ?, ?, ?)");
			insertTicker.setString(1, ticker.getSymbol());
			insertTicker.setString(2, ticker.getCompany());
			insertTicker.setString(3, ticker.getSector());
			insertTicker.setString(4, ticker.getIndustry());
			insertTicker.setString(5, ticker.getCountry());
			insertTicker.executeUpdate();
			
			// Create the statement for writing the history entries
			// We append a many statements together for write speed up
			String statement = String.format("INSERT INTO entries VALUES ");
			for (StockEntry entry : history.getHistory())
			{
				statement += String.format("('%s', '%s', %f, %f, %f, %f, %f, %f),", 
						ticker.getSymbol(),
						new java.sql.Date(entry.getDate().getTime()),
						entry.getAdjustedClose(),
						entry.getClose(),
						entry.getHigh(),
						entry.getLow(),
						entry.getOpen(),
						entry.getVolume());
			}
			
			// Remove the last comma
			statement = statement.substring(0, statement.length() - 1);
			
			// Write the entries
			theConnection.createStatement().execute(statement);
		}
	} 

}

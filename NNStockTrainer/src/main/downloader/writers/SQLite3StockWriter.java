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
 * Implementation for writing the network information into SQLite3
 *  
 * @author cseibert 
 */
public class SQLite3StockWriter implements StockWriter
{
	/** The connection to the database. */
	private Connection theConnection;
	
	/**
	 * Default constructor.
	 */
	public SQLite3StockWriter(){
		theConnection = null;  
        try {  
            Class.forName("org.sqlite.JDBC");  
            theConnection = DriverManager .getConnection("jdbc:sqlite:sqlite3stocks.db");  
        	theConnection.createStatement().execute("CREATE TABLE IF NOT EXISTS tickers (symbol VARCHAR(255) PRIMARY KEY, company VARCHAR(255), sector VARCHAR(255), industry VARCHAR(255), country VARCHAR(255))");
        	theConnection.createStatement().execute("CREATE TABLE IF NOT EXISTS entries (symbol VARCHAR(255), date NUMERIC PRIMARY KEY, adjusted_close REAL, close REAL, high REAL, low REAL, open REAL, volume REAL)");
        } catch (Exception e) {  
            e.printStackTrace();  
        } 
	}
	
	@Override
	public void write(Map<Ticker, StockHistory> stocks) throws SQLException
	{
		Iterator<Ticker> iter = stocks.keySet().iterator();
		while (iter.hasNext())
		{
			Ticker ticker = iter.next();
			StockHistory history = stocks.get(ticker);
			
			PreparedStatement insertTicker = theConnection.prepareStatement("INSERT OR REPLACE INTO tickers VALUES(?, ?, ?, ?, ?)");
			insertTicker.setString(1, ticker.getSymbol());
			insertTicker.setString(2, ticker.getCompany());
			insertTicker.setString(3, ticker.getSector());
			insertTicker.setString(4, ticker.getIndustry());
			insertTicker.setString(5, ticker.getCountry());
			insertTicker.executeUpdate();
			
			int left = history.getHistory().size();
			PreparedStatement insertEntry = theConnection.prepareStatement("INSERT OR REPLACE INTO entries VALUES(?, ?, ?, ?, ?, ?, ?, ?)");
			for (StockEntry entry : history.getHistory())
			{
				insertEntry.setString(1, ticker.getSymbol());
				insertEntry.setLong(2, entry.getDate().getTime());
				insertEntry.setDouble(3, entry.getAdjustedClose());
				insertEntry.setDouble(4, entry.getClose());
				insertEntry.setDouble(5, entry.getHigh());
				insertEntry.setDouble(6, entry.getLow());
				insertEntry.setDouble(7, entry.getOpen());
				insertEntry.setDouble(8, entry.getVolume());
				insertEntry.addBatch();
				System.out.println(left--);
				break;
			}
			insertEntry.executeBatch();
			System.out.println("done");
		}
		theConnection.createStatement().execute("DELETE FROM log");
		theConnection.createStatement().executeUpdate("INSERT INTO log VALUES(date('now'))");
	}
}

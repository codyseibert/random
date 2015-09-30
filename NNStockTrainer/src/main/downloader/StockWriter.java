package main.downloader;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Collection;
import java.util.Date;
import java.util.Map;


/**
 * All classes implementing this interface should be able to write collection of stocks
 * out to either a database or file via the write method.
 * 
 * @author cseibert
 *
 */
public interface StockWriter
{
	/** 
	 * Writes a map of Ticker -> StockHistory to a database. 
	 * 
	 * @param stocks the stocks to write
	 * @throws SQLException when an error occurred when writing to the database
	 */
	public void write(Map<Ticker, StockHistory> stocks) throws SQLException;
}

package main.downloader.writers;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import main.downloader.StockHistory;
import main.downloader.StockWriter;
import main.downloader.Ticker;


/**
 * Implementation for writing the stock information into MySQL.
 *
 * @author cseibert
 */
public class JSONFileWriter implements StockWriter
{

	/**
	 * Default constructor
	 */
	public JSONFileWriter()
	{

	}

	@Override
	public void write(Map<Ticker, StockHistory> stocks)
		throws SQLException
	{
		ObjectMapper mapper = new ObjectMapper();

		Iterator<Ticker> iter = stocks.keySet().iterator();
		
		Map<String, Double> values = new HashMap<>();
		
		while (iter.hasNext())
		{
			Ticker ticker = iter.next();
			StockHistory history = stocks.get(ticker);
			values.put(ticker.getSymbol(), history.getHistory().get(0).getClose());
		}
		
		try
		{
			mapper.writeValue(new File("stocks.json"), values);
		} catch (IOException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}

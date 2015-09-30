package main.downloader.loaders;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import au.com.bytecode.opencsv.CSVReader;

/**
 * PruneCSVTickerLoader is used for loading only the ticker symbols
 * from a larger set of ticker related data.
 * 
 * @author cseibert 
 */
public final class PruneCSVTickerLoader
{
	private PruneCSVTickerLoader() throws Exception
	{
		throw new Exception("This should not have been constructed!");
	}
	
	/**
	 * Loads the list of tickers from a CSV file.
	 * 
	 * @param pStream the stream pointed to the CSV file
	 * @return the list of all the ticker symbols
	 * @throws IOException on failure to read the CSV file
	 */
	public static List<String> loadTickers(final InputStream pStream)
		throws IOException
	{ 
		List<String> tickers = new ArrayList<String>(); 
		
		CSVReader reader = new CSVReader(new InputStreamReader(pStream));
		 
		List<String[]> rows = reader.readAll();
		
		for (String[] row : rows)
		{
			String ticker = row[0];
			tickers.add(ticker);
		}
		
		return tickers;
	}
}

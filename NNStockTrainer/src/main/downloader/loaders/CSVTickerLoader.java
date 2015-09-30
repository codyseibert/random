package main.downloader.loaders;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import main.downloader.Ticker;
import main.downloader.TickerLoader;
import au.com.bytecode.opencsv.CSVReader;

/**
 * A CSVTickerLoader object loads all the tickers from a csv file. 
 * 
 * @author cseibert
 *
 */
public final class CSVTickerLoader
{
	
	
	/**
	 * 
	 * @param stream the stream pointing to the CSV file
	 * @return the list of tickers found in that CSV file
	 * @throws IOException on failure to read the CSV file
	 */
	public ArrayList<Ticker> loadTickers(InputStream stream) throws IOException
	{
		ArrayList<Ticker> tickers = new ArrayList<Ticker>();
		CSVReader reader = new CSVReader(new InputStreamReader(stream));
		List<String[]> rows = reader.readAll();
		
		for (String[] row : rows)
		{
			String symbol = row[0];
			String company = row[1];
			String sector = row[2];
			String industry = row[3];
			String country = row[4];
			
			Ticker ticker = new Ticker(symbol, company, sector, industry, country);
			tickers.add(ticker);
		}
		
		return tickers;
	}

	public Collection<Ticker> getTickers(InputStream stream) throws IOException
	{
		ArrayList<Ticker> tickers = new ArrayList<Ticker>();
		CSVReader reader = new CSVReader(new InputStreamReader(stream));
		List<String[]> rows = reader.readAll();
		
		for (String[] row : rows)
		{
			String symbol = row[0];
			String company = row[1];
			String sector = row[2];
			String industry = row[3];
			String country = row[4];
			
			Ticker ticker = new Ticker(symbol, company, sector, industry, country);
			tickers.add(ticker);
		}
		
		return tickers;
	}
	
	// Only select the tickers we need
//			reader = new CSVReader(new FileReader(new File(prune)));
//			rows = reader.readAll();
//			HashSet<String> pruneTickers = new HashSet<String>();
//			for (String[] row : rows)
//			{
//				pruneTickers.add(row[0]);
//			}
//			
//			Iterator<Ticker> iter = tickers.iterator();
//			while (iter.hasNext())
//			{
//				Ticker ticker = iter.next();
//				if (!pruneTickers.contains(ticker.getSymbol()))
//				{
//					iter.remove();
//				}
//			}
}

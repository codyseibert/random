package main.downloader.downloaders;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

import main.downloader.StockDownloader;
import main.downloader.StockEntry;
import main.downloader.StockHistory;
import main.downloader.Ticker;

import org.encog.neural.data.market.MarketDataType;
import org.encog.neural.data.market.TickerSymbol;
import org.encog.neural.data.market.loader.LoadedMarketData;
import org.encog.neural.data.market.loader.MarketLoader;
import org.encog.neural.data.market.loader.YahooFinanceLoader;
  
/**
 * EncogYahooStockDownloader uses the encog 
 * 
 * @author cseibert 
 */
public class EncogYahooStockDownloader implements StockDownloader
{ 
	/** The configuration for what to download from Yahoo. */
	private HashSet<MarketDataType> theTypeSet;

	/** Start range of first date of stock to download */
	private Calendar theStartDate;
	
	/** End range of Last date of stock to download */
	private Calendar theEndDate; 

	/** Used to downloading the stocks */
	private MarketLoader theLoader;
	
	/**
	 * Used to download all the stock history for a particular ticker.
	 */
	public EncogYahooStockDownloader()
	{
		theLoader = new YahooFinanceLoader();		
		
		theEndDate = new GregorianCalendar();
		theStartDate = (Calendar) theEndDate.clone();
		
		theStartDate.add(Calendar.YEAR, -5);
		
		theTypeSet = new HashSet<MarketDataType>();
		theTypeSet.add(MarketDataType.ADJUSTED_CLOSE);
		theTypeSet.add(MarketDataType.CLOSE);
		theTypeSet.add(MarketDataType.HIGH);
		theTypeSet.add(MarketDataType.LOW);
		theTypeSet.add(MarketDataType.OPEN);
		theTypeSet.add(MarketDataType.VOLUME);
	}
	
	/**
	 * Downloads the history of a ticker.
	 * 
	 * @param ticker the ticker to download the history for
	 * @return the stock history of the ticker supplied
	 */
	public StockHistory download(Ticker ticker) throws Exception
	{
		final TickerSymbol tickerSymbol = 
				new TickerSymbol(ticker.getSymbol());
		ArrayList<LoadedMarketData> data = 
			(ArrayList<LoadedMarketData>) 
				theLoader.load(tickerSymbol, theTypeSet,
					theStartDate.getTime(), theEndDate.getTime());
				
		ArrayList<StockEntry> entires = new ArrayList<StockEntry>();
		Collections.reverse(entires);
		
		for (LoadedMarketData lmd : data)
		{
			StockEntry entry = new StockEntry(
				lmd.getWhen(),
				lmd.getData(MarketDataType.ADJUSTED_CLOSE),
				lmd.getData(MarketDataType.CLOSE),
				lmd.getData(MarketDataType.HIGH),
				lmd.getData(MarketDataType.LOW),
				lmd.getData(MarketDataType.OPEN),
				lmd.getData(MarketDataType.VOLUME));
			entires.add(entry);
		}
		return new StockHistory(entires);
	}

	@Override
	public Map<Ticker, StockHistory> downloadAll(Collection<Ticker> tickers) 
	{
		int remaining = tickers.size();
		HashMap<Ticker, StockHistory> map = new HashMap<Ticker, StockHistory>();
		for (Ticker ticker : tickers){
			System.out.println("Tickers Left: " + remaining--);
			try
			{
				map.put(ticker, download(ticker));
			} catch (Exception e)
			{
				System.out.println("Ticker Failed: " + ticker.getSymbol());
			}
		}
		return map;
	}

}

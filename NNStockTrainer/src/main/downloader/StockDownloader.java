package main.downloader;
import java.util.Collection;
import java.util.Map;

/**
 * StockDownloader classes should have the ability the download all history
 * for each ticker in a list of supplied tickers.
 * 
 * @author cseibert
 */
public interface StockDownloader 
{
	/**
	 * Downloads all history for all tickers in collection.
	 * 
	 * @param tickers the tickers to download
	 * @return a map of all the history
	 */
	public Map<Ticker, StockHistory> downloadAll(Collection<Ticker> tickers);
}

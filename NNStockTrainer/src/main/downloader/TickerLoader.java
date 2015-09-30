package main.downloader;
import java.util.Collection;

/**
 * TickerLoader's should have the ability to load all the tickers from a
 * some form of data store.
 * 
 * @author cseibert 
 */
public interface TickerLoader 
{
	/**
	 * Get all the stock tickers.
	 * 
	 * @return every stock ticker there possibly is in the system
	 */
	public Collection<Ticker> getTickers();
}

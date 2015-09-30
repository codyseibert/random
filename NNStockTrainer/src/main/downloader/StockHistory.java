package main.downloader; 
import java.util.List;

/**
 * StockHistory contains a list of StockEntries where each entry represents
 * a day in the stock market.
 * 
 * @author cseibert 
 */
public class StockHistory 
{
	/** The day by day entries associated with the stock. */
	private List<StockEntry> theEntires;
	
	public StockHistory(List<StockEntry> entires)
	{
		theEntires = entires;
	}
	
	public List<StockEntry> getHistory()
	{
		return theEntires;
	}
}

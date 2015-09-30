package main.downloader;

import java.util.Date;

/**
 * StockEntry is POJO containing all the information needed for a single
 * entry of stock history.  Stock history will consist of multiple StockEntry
 * objects.
 * 
 * @author cseibert
 */
public class StockEntry 
{
	/** The date (day) that the stock was recorded. */
	private Date theDate; 

	/** The close price of the stock. */
	private double theClosePrice;

	/** The higest price of the stock on that day.  */
	private double theHighPrice;

	/** The lowest price of the stock on that day. */
	private double theLowPrice;

	/** The adjusted close price.  */
	private double theAdjustedClosePrice;

	/** The volume of stock on that day. */
	private double theVolume;

	/** The open price of the stock that day.*/
	private double theOpen;
	
	/**
	 * Default constructor. 
	 * 
	 * @param pDate the date of the entry
	 * @param pAdjustedClose the adjusted close price
	 * @param pClose the close price
	 * @param pHigh the higest price 
	 * @param pLow the lowest price
	 * @param pOpen the open price
	 * @param pVolume the volume sold
	 */
	public StockEntry(Date pDate, double pAdjustedClose, double pClose, 
			double pHigh, double pLow, double pOpen, double pVolume)
	{
		theDate = pDate;
		theClosePrice = pClose;
		theAdjustedClosePrice = pAdjustedClose;
		theHighPrice = pHigh;
		theLowPrice = pLow;
		theVolume = pVolume;
		theOpen = pOpen;
	}
	
	public Date getDate()
	{
		return theDate;
	}
	
	public double getClose()
	{
		return theClosePrice;
	}
	
	public double getOpen()
	{
		return theOpen;
	}
	
	public double getAdjustedClose()
	{
		return theAdjustedClosePrice;
	}
	
	public double getLow()
	{
		return theLowPrice;
	}
	
	public double getHigh()
	{
		return theHighPrice;
	}
	
	public double getVolume()
	{
		return theVolume;
	}
}

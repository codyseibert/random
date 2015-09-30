package main.downloader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;

import main.downloader.downloaders.EncogYahooStockDownloader;
import main.downloader.loaders.CSVTickerLoader;
import main.downloader.writers.JSONFileWriter;
import main.downloader.writers.MySQLStockWriter;

/**
 * TODO: Implement me
 * 
 * The download service is supposed to be a service which downloads all the 
 * history once a day.
 * 
 * @author cseibert
 */
public class DownloaderService 
{
	/** */  
	private CSVTickerLoader theTickerLoader;
	
	/** */ 
	private StockDownloader theStockDownloader;
	
	/** */
	private StockWriter theStockWriter;
	
	/**
	 * 
	 * @param args
	 * @throws IOException
	 * @throws SQLException
	 * @throws ParseException
	 */
	public static void main(String[] args) 
			throws IOException, SQLException, ParseException
	{
		DownloaderService service = new DownloaderService();
	}
	
	/** 
	 * @throws IOException
	 * @throws SQLException
	 * @throws ParseException
	 */
	public DownloaderService() throws IOException, SQLException, ParseException
	{		
		setStockWriter(new MySQLStockWriter());
		setStockDownloader(new EncogYahooStockDownloader());
		setTickerLoader(new CSVTickerLoader());
		run();
	}
	
	public void setTickerLoader(CSVTickerLoader loader)
	{
		theTickerLoader = loader;
	}
	
	public void setStockDownloader(StockDownloader downloader)
	{
		theStockDownloader = downloader;
	}
	
	public void setStockWriter(StockWriter writer)
	{
		theStockWriter = writer;
	}
	
	/** 
	 * @throws SQLException
	 * @throws ParseException
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	public void run() throws SQLException, ParseException, FileNotFoundException, IOException
	{
		ArrayList<Ticker> tickers = (ArrayList<Ticker>)theTickerLoader.getTickers(new FileInputStream("resources/tickers.csv"));
		StockDownloader stockDownloader = new EncogYahooStockDownloader();
		HashMap<Ticker, StockHistory> stocks = (HashMap<Ticker, StockHistory>)stockDownloader.downloadAll(tickers);
		theStockWriter.write(stocks);
	}
}

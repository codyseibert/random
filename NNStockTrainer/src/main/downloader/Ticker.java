package main.downloader;

/**
 * Ticker is a POJO containing the information related to a stock.
 * 
 * @author cseibert 
 */
public class Ticker {

	/** The symbol related to the stock. */
	private String theSymbol;

	/** The company of the stock. */
	private String theCompany;

	/** The sector that stock is in. */
	private String theSector;

	/** The industry the stock is in. */
	private String theIndustry;

	/** The country the stock is in. */
	private String theCountry;
	
	/** 
	 * Default constructor.
	 * 
	 * @param pSymbol the symbol of the stock
	 * @param pCompany the company of the stock
	 * @param pSector the sector the stock is in
	 * @param pIndustry the industry the stock is in
	 * @param pCountry the country the stock is in
	 */
	public Ticker(final String pSymbol,final  String pCompany, 
			final String pSector, final String pIndustry, 
			final String pCountry){
		theSymbol = pSymbol;
		theCompany = pCompany;
		theSector = pSector;
		theIndustry = pIndustry;
		theCountry = pCountry;
	}
	
	public String getSymbol(){
		return theSymbol;
	}
	
	public String getCompany(){
		return theCompany;
	}
	
	public String getSector(){
		return theSector;
	}
	
	public String getIndustry(){
		return theIndustry;
	}
	
	public String getCountry(){
		return theCountry;
	}
	
}

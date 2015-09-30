package main.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.jms.ConnectionFactory;

import main.downloader.Ticker;
import main.trainer.TrainMessage;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.camel.CamelContext;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.jms.JmsComponent;
import org.apache.camel.impl.DefaultCamelContext;
 
/**
 * StockTrainerController is used to send out TrainMessages to the broker
 * based on certain criteria.
 * 
 * @author cseibert 
 */
public class StockTrainerController implements Runnable
{
	/** Connection to the database */
	public static Connection theConnection;
	
	/** Used for consuming and sending messages */
	private CamelContext theCamelContext;
	
	/** Queue name to send the TrainMessages */
	private String theTrainQueue;
	
	/** Queue name from which to consume NetworkMessages*/
	private String theNetworkQueue;
	
	/**
	 * Starts a StockTrainerController.
	 * 
	 * @param pArgs the runtime parameters
	 * @throws Exception when not enough parameters were supplied
	 */
	public static void main(final String[] pArgs) throws Exception
	{
		if (pArgs.length < 3)
		{
			final StringBuilder builder = new StringBuilder();
			builder.append("Invalid number of arguments. ");
			builder.append("The 3 arguments needed include: ");
			builder.append("'IP of ActiveMQ' ");
			builder.append("'Queue to Consume From' ");
			builder.append("'Queue to Produce results into'");
			throw new Exception(builder.toString()); 
		} 
		
		// Read in runtime parameters
		final String address = pArgs[0];
		final String consumeFrom = pArgs[1];
		final String produceTo = pArgs[2];
		 
		new StockTrainerController(address, consumeFrom, produceTo); 
	}

	/**
	 * Default constructor.
	 * 
	 * @param pBrokerAddress the IP address of the ActiveMQ broker
	 * @param pNetworkQueue the queue to consume NetworkMessages from
	 * @param pTrainQueue the queue to produces train message into
	 * 
	 * @throws Exception
	 */
	public StockTrainerController(String pBrokerAddress, 
			final String pNetworkQueue, final String pTrainQueue) 
		throws Exception
	{
		theTrainQueue = pTrainQueue;
		theNetworkQueue = pNetworkQueue;
		
		// Setup Camel
		theCamelContext = new DefaultCamelContext();
        ConnectionFactory connectionFactory = 
    		new ActiveMQConnectionFactory(pBrokerAddress);        
        theCamelContext.addComponent("jms", 
    		JmsComponent.jmsComponentAutoAcknowledge(connectionFactory));    
        
        // Setup route for consuming network messages
        final RouteBuilder routeBuilder = new RouteBuilder()
        { 
            public void configure() 
            {     
            	final SaveNetworkProcess saveNetworkProcess = 
        			new SaveNetworkProcess();
            	
            	from(pNetworkQueue)
            		.process(saveNetworkProcess)
            			.stop();
            }
        };
         
        theCamelContext.addRoutes(routeBuilder); 
        
        // Start consuming
        theCamelContext.start();
	}
	
	/**
	 * TODO: This was a prototype / testing method, refactor or remove
	 */
	public void run()
	{
		ProducerTemplate producer = theCamelContext.createProducerTemplate();

        try {
			Class.forName("com.mysql.jdbc.Driver");
	        theConnection = DriverManager.getConnection("jdbc:mysql://192.168.1.20/stocked?user=cseibert&password=x22Bzdibe91");  
		} catch (Exception e) {
			e.printStackTrace();
		}  
        
		while (true)
		{

			try {
				Thread.sleep(4000);
			} catch (InterruptedException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			try 
			{
				Ticker ticker = getRandomTicker();
				
				System.out.println(ticker.getSymbol());
				
		        try {  
		            ResultSet results = theConnection.createStatement().executeQuery("SELECT close FROM entries WHERE symbol = '" + ticker.getSymbol() + "' ORDER BY date ASC");
		        
		            ArrayList<Double> values = new ArrayList<Double>();
		            while (results.next())
		            {
		            	values.add(results.getDouble("close"));
		            }
		            
		            ArrayList<Double> normalizedData = new ArrayList<Double>();
		            for (int i = 1; i < values.size(); i++)
		            {
		            	normalizedData.add(values.get(i)-values.get(i-1));
		            }
		            
		            ArrayList<ArrayList<Double>> inputs = new ArrayList<ArrayList<Double>>();
		            ArrayList<ArrayList<Double>> outputs = new ArrayList<ArrayList<Double>>();
		            
		            int inputWindow = 5;
		            int outputWindow = 5;
		            for (int i = 0; i <= normalizedData.size() - inputWindow - outputWindow; i++)
		            {
		            	ArrayList<Double> inptArray = new ArrayList<Double>();
		            	ArrayList<Double> ouptArray = new ArrayList<Double>();
		            	inputs.add(inptArray);
		            	outputs.add(ouptArray);
		            	
		            	for (int j = 0; j < inputWindow; j++)
		            	{
		            		inptArray.add(normalizedData.get(i+j));
		            	}
		            	
		            	for (int j = i+inputWindow; j < i+inputWindow+outputWindow; j++)
		            	{
		            		ouptArray.add(normalizedData.get(j));
		            	}
		            }
		            
		            assert inputs.size() == outputs.size();
		            
		            ArrayList<ArrayList<Double>> validationInput = new ArrayList<ArrayList<Double>>();
		            ArrayList<ArrayList<Double>> validationOutput = new ArrayList<ArrayList<Double>>();		            
		            ArrayList<ArrayList<Double>> realInput = new ArrayList<ArrayList<Double>>();
		            ArrayList<ArrayList<Double>> realOutput = new ArrayList<ArrayList<Double>>();
		            double chance = 0.8;
		            for (int i = 0; i < inputs.size(); i++){
		            	if (Math.random() > chance){
		            		validationInput.add(inputs.get(i));
		            		validationOutput.add(outputs.get(i));
		            	}else{
		            		realInput.add(inputs.get(i));
		            		realOutput.add(outputs.get(i));
		            	}
		            }
		            
		            
		            double[][] inA = new double[realInput.size()][inputs.get(0).size()];
		            double[][] outA = new double[realOutput.size()][outputs.get(0).size()];
		            double[][] inV = new double[validationInput.size()][inputs.get(0).size()];
		            double[][] outV = new double[validationOutput.size()][outputs.get(0).size()];
		            for (int i = 0; i < realInput.size(); i++)
		            {
		            	for (int j = 0; j < realInput.get(i).size(); j++)
		            	{
		            		inA[i][j] = realInput.get(i).get(j);
		            	}
		            	
		            	for (int j = 0; j < realOutput.get(i).size(); j++)
		            	{
		            		outA[i][j] = realOutput.get(i).get(j);
		            	}
		            }
		            
		            for (int i = 0; i < validationInput.size(); i++)
		            {
		            	for (int j = 0; j < validationInput.get(i).size(); j++)
		            	{
		            		inV[i][j] = validationInput.get(i).get(j);
		            	}
		            	
		            	for (int j = 0; j < validationOutput.get(i).size(); j++)
		            	{
		            		outV[i][j] = validationOutput.get(i).get(j);
		            	}
		            }
		            
		            TrainMessage message = new TrainMessage(ticker.getSymbol(), inA, outA, inV, outV, (int)(Math.random()*30)+1, 1000 + (int)(Math.random()*100)*1000);

					producer.sendBody(theTrainQueue, message);
		            
		        } catch (Exception e) {  
		            e.printStackTrace();  
		        } 
				
			} 
			catch (Exception e) 
			{
				e.printStackTrace();
				break;
			}
		}
	}
	
	/**
	 * Was in process of refactoring ticket loader
	 */
	public Ticker getRandomTicker() throws IOException
	{
//		CSVTickerLoader tickerLoader = 
//			new CSVTickerLoader("resources/tickers.csv", "resources/low_price_tickers.csv");
//		ArrayList<Ticker> tickers = 
//			(ArrayList<Ticker>) tickerLoader.getTickers();
//		return tickers.get((int)(tickers.size()*Math.random()));
		return null;
	} 
}

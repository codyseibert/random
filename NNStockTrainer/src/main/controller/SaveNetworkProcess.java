package main.controller;

import java.sql.PreparedStatement;

import main.trainer.NetworkMessage;
import main.trainer.TrainMessage;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.encog.neural.data.basic.BasicNeuralData;
import org.encog.neural.networks.BasicNetwork;

import com.thoughtworks.xstream.XStream;

/**
 * SaveNetworkProcess is a Camel process that consumes NetworkMessages and 
 * writes the results to a MySQL database.
 * 
 * @author cseibert
 */
public class SaveNetworkProcess implements Processor
{
	/**
	 * Processes NetworkMessages and saves the information to a database.
	 */
	@Override
	public void process(Exchange exchange) throws Exception
	{ 
		final Object objectInMessage = exchange.getIn().getBody(); 
		if (!(objectInMessage instanceof NetworkMessage))
		{ 
			throw new Exception("The JMS message contained a unexpected object type!");
		}
			
		final NetworkMessage train = 
			(NetworkMessage) exchange.getIn().getBody();
			
		// Grab the parameters from the TrainMessage
		final TrainMessage tm = train.getTrainMessage();
		final BasicNetwork network = train.getNetwork();
		final double[][] valIn = tm.getValIn();
		final double[][] valOut = tm.getValOut();
		
		// Determine the error of the network
		double error = 0;
		for (int i = 0; i < valIn.length; i++)
		{
			final double[] prediction = network.compute(
					new BasicNeuralData(valIn[i])).getData();
			double percentSum = 0;
			for (int j = 0; j < prediction.length; j++)
			{
				if (valOut[i][j] != 0)
				{
					percentSum += Math.abs(valOut[i][j] - prediction[j])
							/ Math.abs(valOut[i][j]);
				}
			}
			percentSum /= prediction.length;
			error += percentSum;
		}
		error /= valOut.length; 
 
		// Create the prepare statement and write it to the database
		XStream xstream = new XStream();
		PreparedStatement prep = StockTrainerController.theConnection
			.prepareStatement("INSERT INTO networks " 
				+ "(network, hidden, input_window, output_window, iterations, error, symbol) "
				+ "VALUES (?, ?, ?, ?, ?, ?, ?)");
		prep.setString(1, xstream.toXML(network));
		prep.setInt(2, tm.getHiddenSize());
		prep.setInt(3, tm.getInput()[0].length);
		prep.setInt(4, tm.getOutput()[0].length);
		prep.setInt(5, tm.getIterations());
		prep.setFloat(6, (float) error);
		prep.setString(7, tm.getSymbol());
		prep.execute(); 
	}
}

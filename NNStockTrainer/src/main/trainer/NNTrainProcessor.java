package main.trainer;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.encog.neural.data.NeuralDataSet;
import org.encog.neural.data.basic.BasicNeuralDataSet;
import org.encog.neural.networks.BasicNetwork;
import org.encog.neural.networks.layers.BasicLayer;
import org.encog.neural.networks.training.Train;
import org.encog.neural.networks.training.propagation.resilient.ResilientPropagation;

/**
 * NNTrainProcessor is an Camel processor which is used to process the incoming
 * JMS train messages.  
 * 
 * Once this processor is done, it will send the internal
 * representation of the Network back to the broker so that it can later be 
 * consumed by a module to write it to the database.
 * 
 * @author cseibert 
 */
public class NNTrainProcessor implements Processor
{ 
	/**
	 * Process any incoming train messages
	 */
	public void process(Exchange exchange) throws Exception
	{ 
		// The message should contain a TrainMessage object
		final Object objectInMessage = exchange.getIn().getBody(); 
		if (!(objectInMessage instanceof TrainMessage))
		{ 
			throw new Exception("The JMS contained a unexpected object type!");
		}
		
		final TrainMessage trainMessage = (TrainMessage) objectInMessage;
		
		// Grab the necessary parameters needed to train a network
		final double[][] input = trainMessage.getInput();
		final double[][] output = trainMessage.getOutput();
		final int hiddenLayerSize = trainMessage.getHiddenSize();
		final double numEpochs = trainMessage.getIterations();
		
		final int inputLayerSize = input[0].length;
		final int outputLayerSize = output[0].length;
		
		// Setup the network
		final BasicNetwork network = new BasicNetwork();
		network.addLayer(new BasicLayer(inputLayerSize));
		network.addLayer(new BasicLayer(hiddenLayerSize));
		network.addLayer(new BasicLayer(outputLayerSize));
		network.getStructure().finalizeStructure();
		network.reset(); 
		
		// Setup training scheme
		final NeuralDataSet trainingSet = new BasicNeuralDataSet(input, output); 
		final Train train = new ResilientPropagation(network, trainingSet);
		 
		// Train the network
		for (int epoch = 0; epoch < numEpochs; epoch++)
		{
			train.iteration(); 
		}  
		
		// Setup the message to send back to ActiveMQ
		final NetworkMessage message = 
			new NetworkMessage(trainMessage, network);
		
		// Overwrite the body so that it can properly be forwarded with Camel
		exchange.getIn().setBody(message);
	} 
} 
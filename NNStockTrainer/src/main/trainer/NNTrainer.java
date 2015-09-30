package main.trainer;

import javax.jms.ConnectionFactory;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.camel.CamelContext;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.jms.JmsComponent;
import org.apache.camel.impl.DefaultCamelContext;

/**
 * NNTrainer is a process used for training Neural Networks. 
 * 
 * When a NNTrainer process is created, it will connect to ActiveMQ via Camel
 * and start consuming from a queue which contains "train" jobs.
 * 
 * @author cseibert 
 */
public class NNTrainer
{ 
	/**
	 * Starts the NNTrainer process.
	 * 
	 * @param pArgs 
	 * @throws Exception
	 */
	public static void main(String[] pArgs) throws Exception
	{
		if (pArgs.length < 3)
		{
			StringBuilder builder = new StringBuilder();
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

		// Create the traininer
		new NNTrainer(address, consumeFrom, produceTo);
	}

	/**
	 * Creates a CamelContext which connects to the ActiveMQ Broker. 
	 * Sets up a route and adds a process to it for processing "train" jobs.
	 * 
	 * @param pAddress the IP address of the ActiveMQ server
	 * @param pTrainQueue the name of the queue which train messages will be
	 * @param pResultQueue the name of the queue to send training results into
	 * @throws Exception
	 */
	public NNTrainer(String pAddress, final String pTrainQueue,
			final String pResultQueue) 
		throws Exception
	{
		// Setup Camel to connect to ActiveMQ
		final CamelContext context = new DefaultCamelContext();
		final ConnectionFactory connectionFactory = 
			new ActiveMQConnectionFactory(pAddress);
		context.addComponent("jms",
			JmsComponent.jmsComponentAutoAcknowledge(connectionFactory));

		// Setup a route to consume from the queue and process the messages
		final RouteBuilder routeBuilder = new RouteBuilder()
		{
			public void configure()
			{
				// Processor used to start training
				final NNTrainProcessor trainProcessor = new NNTrainProcessor();
				 
				from(pTrainQueue)
					.process(trainProcessor)
						.to(pResultQueue);
			}
		};
		
		// Add the route
		context.addRoutes(routeBuilder); 

		// Start consuming messages
		context.start();
	}
}

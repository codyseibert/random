package main.trainer;
import java.io.Serializable;

import org.encog.neural.networks.BasicNetwork;

/**
 * NetworkMessage contains the training results; that is, the Encog network
 * object that represents the network.
 * 
 * @author cseibert 
 */
public class NetworkMessage implements Serializable
{
	/** The train message that was associated with this network. */
	private TrainMessage theTrainMessage;
	
	/** The trained network. */
	private BasicNetwork theNetwork;
	
	/**
	 * Default constructor.
	 * 
	 * @param pTrainMessage the message used to train the network
	 * @param pNetwork the trained network
	 */
	public NetworkMessage(final TrainMessage pTrainMessage,
		final BasicNetwork pNetwork)
	{
		theTrainMessage = pTrainMessage;
		theNetwork = pNetwork;
	}
	
	public TrainMessage getTrainMessage()
	{
		return theTrainMessage;
	}
	
	public BasicNetwork getNetwork()
	{
		return theNetwork;
	}
}

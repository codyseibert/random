package main.trainer;
import java.io.Serializable;

/**
 * TrainMessage is a container for all the necessary variables for the 
 * NNTrainProcess to train a network.
 * 
 * @author cseibert 
 */
public class TrainMessage implements Serializable
{
	/** */
	private static final long serialVersionUID = 7427308198554574774L;

	/** The input train set. */
	private double[][] theInput;

	/** The expected outputs. */
	private double[][] theOutput;

	/** */
	private double[][] theValIn;

	/** */
	private double[][] theValOut;

	/** The size of the hidden layer. */
	private int theHidden;

	/** The number of iterations to train. */
	private int theIterations;

	/** The stock symbol. */
	private String theSymbol;
	
	/** 
	 * Default constructor.
	 * 
	 * @param symbol the stock symbol
	 * @param input the input training set
	 * @param output the output to train with
	 * @param valIn 
	 * @param valOut
	 * @param hidden the size of the hidden layer
	 * @param iterations the number of iterations to do during training
	 */
	public TrainMessage(String symbol, double[][] input, double[][] output, 
		double[][] valIn, double[][] valOut, int hidden, int iterations)
	{
		theSymbol = symbol;
		theInput = input;
		theOutput = output;
		theValIn = valIn;
		theValOut = valOut;
		theHidden = hidden;
		theIterations = iterations;
	}
	
	public String getSymbol()
	{
		return theSymbol;
	}
	
	public double[][] getInput()
	{
		return theInput;
	}
	
	public double[][] getOutput()
	{
		return theOutput;
	}
	
	public double[][] getValIn()
	{
		return theValIn;
	}
	
	public double[][] getValOut()
	{
		return theValOut;
	}
	
	public int getHiddenSize()
	{
		return theHidden;
	}
	
	public int getIterations()
	{
		return theIterations;
	}
}

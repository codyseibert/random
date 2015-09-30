NNStockTrainer
==============

This project is for downloading stock history and 
training neural networks for prediction.

Since I had a lot of old computers laying around my house, I decided
to try to make a distributed system for training neural networks.

To allow for a distributed system, I decided to go with 
a JMS message broker (ActiveMQ) to allow these machines to easily
communicate and java objects.  

In a running system, one would typically have multiple "Trainer" 
processes running.  Each of those Trainer processes will
consumer TrainMessages from a load balanced queue and 
start training neural networks.

Once they are done training, they will write their results, 
that is, the trained network, back into a JMS message for the 
Controller to pick up and store.

This project consists of 4 main packages:
	Controller 
	Downloader
	Predictor
	Trainer
	
Controller
	The controller is a process which consumes from the ActiveMQ
	JMS broker for NetworkMessages.  
	
	A NetworkMessage contains the information of a 
	trained network which is created by the Trainer process.
	
	Once the controller consumes a NetworkMessage, it will
	write it to the database so that the Predictor can use it.
	
Downloader
	The downloader package is used for downloading stock history
	from an external resource, parsing them into a format used
	internally to the system, and writing that history to a
	database or filesystem.
	
Predictor
	The predictor is mainly used for grabbing a network from
	the database and history for a stock  and predicting the market
	price for the days to come.
	
Trainer 
	The trainer is used for taking in parameters specific for
	training a neural network, such as training input set, number of
	hidden layers, training output, number of epochs, etc, and
	training a network.
	
	The trainer is a standalone process which uses Camel to connect
	to an ActiveMQ JMS broker and listens for TrainMessages.  
	TrainMessages contain the information needed for training. 
	
	Once the trainer is done training, it will then write the 
	results of the training, that is the Encog network serialized,
	back to ActiveMQ where the Controller consumes and saves to 
	a datastore.
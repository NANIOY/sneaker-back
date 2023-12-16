// Import the required modules
const Primus = require("primus");
const { createShoeOrder } = require('../controllers/api/v1/shoeController');

module.exports.go = (server) => {
    // Create a new Primus instance
    const primus = new Primus(server, {
        transformer: "websockets",
    });

    // Handle incoming WebSocket connections
    primus.on('connection', (spark) => {
        console.log('connected ༼ つ ◕_◕ ༽つ');

        // Handle incoming data from clients
        spark.on('data', async (data) => {
            console.log("data (❁´◡`❁)", data);

            try {
                // Call function to create new order
                const newOrder = await createShoeOrder(data);

                // Send new order to all connected clients
                primus.write({
                    type: 'new_order',
                    data: newOrder.data.shoeOrder,
                });
            } catch (error) {
                console.error('Error creating new order:', error);
            }
        });
    });
};

module.exports.go = (server) => {
    const Primus = require("primus");
    const primus = new Primus(server, {
        transformer: "websockets",
    });

    // check if connection, then console.log
    primus.on('connection', (spark) => {
        console.log('connected ༼ つ ◕_◕ ༽つ');

        const app = require('../index');
        const { createShoeOrder } = require('../controllers/api/v1/shoeController');

        // check if data, then console.log
        spark.on('data', async (data) => {
            console.log("data (❁´◡`❁)", data);

            try {
                // call function to create new order
                const newOrder = await createShoeOrder(data);

                // send new order to all connected clients
                primus.write({
                    type: 'new_order',
                    data: newOrder.data.shoeOrders,
                });
            } catch (error) {
                console.error('Error creating new order:', error);
            }
        });
    });
};

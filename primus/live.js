module.exports.go = (server) => {
    const Primus = require("primus");
    const primus = new Primus(server, {
        transformer: "websockets",
    });

    spark.on('data', async (data) => {
        console.log("data (❁´◡`❁)", data);
    
        try {
            // call function to create new order
            const newOrder = await createShoeOrder(data);
    
            // send new order to all connected clients
            primus.write({
                type: 'new_order',
                data: newOrder,
            });
        } catch (error) {
            console.error('Error creating new order:', error);
        }
    });
};

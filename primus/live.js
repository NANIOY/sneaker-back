module.exports.go = (server) => {
    const Primus = require("primus");
    const primus = new Primus(server, {
        transformer: "websockets",
    });

    // check if connection, then console.log
    primus.on('connection', (spark) => {
        console.log('connected ༼ つ ◕_◕ ༽つ');

        const app = require('../index');
        const handleNewOrder = require('../controllers/api/v1/shoeController');

        // call the function to setup new order handling
        handleNewOrder(app, primus);

        // check if data, then console.log
        spark.on('data', (data) => {
            console.log("data (❁´◡`❁)", data);

            // send data back to all clients
            primus.write(data);
        });
    });
};

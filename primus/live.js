module.exports.go = (server) => {
    const Primus = require("primus");
    const primus = new Primus(server, {
        transformer: "websockets",
    });

    // Handle incoming WebSocket connections
    primus.on('connection', (spark) => {
        console.log('connected ༼ つ ◕_◕ ༽つ');

        // Handle incoming data from clients
        spark.on('data', (data) => {
            console.log("data (❁´◡`❁)", data);

            // Broadcast data to all connected clients
            primus.write(data); // all
            // spark.write(data); // one
        });
    });
};

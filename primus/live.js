
module.exports.setupPrimus = (server) => {
    const Primus = require('primus');
    const primus = new Primus(server, {
        transformer: 'websockets',
    });

    primus.on('connection', (spark) => {
        console.log('Client connected');

        spark.on('data', (data) => {
            console.log('Received data:', data);
            primus.write(data); 
        });

        spark.on('end', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = function (RED) {
    function modbusOutNode (config) {
        RED.nodes.createNode(this, config);
        // Retrieve the config node
        let node = this;
        node.on('input', msg => {
            let errors = 0;
            if (!msg.res) { node.error('Malformed input! Input msg has no property res!'); errors++; }
            if (msg.res && !msg.res.callback) { node.error('Malformed input! Input msg has no property res.callback!'); errors++; }
            if (!msg.payload) { node.error('Malformed input! Input msg has no payload to provide!'); errors++; }
            if (errors > 0) { return msg.res.callback('ERROR: No value provided.'); }
            else { return msg.res.callback(null, msg.payload); }
        });
    }
    RED.nodes.registerType('modbus out', modbusOutNode);
};
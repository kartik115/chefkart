const conf = require("../config/" + process.env.NODE_ENV + ".js")

var mongoose = require("mongoose");
var dbURI = conf.mongo.url;
var options = conf.mongo.options;
const reconnectTimeout = 5000; //ms

console.log("mongo url", dbURI);

mongoose.Promise = global.Promise;

module.exports.init = () => {
  mongoose.connect(dbURI, options); 
}

// CONNECTION EVENTS
mongoose.connection.on('connecting', () => {
  console.info('Connecting to MongoDB...');
});
mongoose.connection.on("connected", function () {
  console.log("Mongoose connected");
});
mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function () {
  console.error(`Mongoose disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
  setTimeout(() => connect(), reconnectTimeout);
});
mongoose.connection.on('reconnected', function () {
  console.info('Reconnected to MongoDB')
})
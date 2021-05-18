module.exports = {
    "port": 8080,
    "mongo": {
        "url": "mongodb://localhost:27017/dishes",
        "options": {
            "useNewUrlParser": true,
            "useUnifiedTopology": true
        }
    },
    "redis": {
        "sentinels": [
            {
                "host": process.env.redis_Host,
                "port": 26379
            }
        ],
        "password": process.env.redis_Password,
        "name": "mymaster"
    }
}
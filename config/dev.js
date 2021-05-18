module.exports = {
    "port": 8000,
    "mongo": {
        "url": "mongodb://localhost:27017/dishes",
        "options": {
            "useNewUrlParser": true,
            "useUnifiedTopology": true,
            // "autoReconnect": true,
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
    },
    "mysql": {
        host: 'localhost',
        user: 'root',
        password: 'Qwerty@123',
        database: 'chefkart'
    },
    "secret": "mRPCcEFeHl0NGkVu"
}
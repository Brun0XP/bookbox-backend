module.exports = {
    "type": "postgres",
    "host": process.env.POSTGRES_URL,
    "port": process.env.POSTGRES_PORT,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "migrations": [
        "./src/database/migrations/*.ts"
    ],
    "entities": [
        "./src/models/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    },
    "logging": false

}
// Update with your config settings.

module.exports = {

    development : {
        client : 'postgresql',
        connection : {
            database : 'aup',
            user : 'postgres',
            password : 'postgres'
        },
        pool : {
            min : 2,
            max : 10
        },
        migrations : {
            tableName : 'knex_migrations'
        }
    },

    staging : {
        client : 'postgresql',
        connection : {
            database : 'aup',
            user : 'postgres',
            password : 'postgres'
        },
        pool : {
            min : 2,
            max : 10
        },
        migrations : {
            tableName : 'knex_migrations'
        }
    },

    production : {
        client : 'postgresql',
        connection : process.env.OPENSHIFT_POSTGRESQL_DB_URL,
        pool : {
            min : 2,
            max : 10
        },
        migrations : {
            tableName : 'knex_migrations'
        }
    }

};

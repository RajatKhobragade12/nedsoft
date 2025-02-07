const { Client } = require('pg')


const client = new Client({
    user:'postgres',
    password:'rajatrajat12',
    host:'localhost',
    database:'postgres',
    port:5432
});


client.connect().then(()=>{
    console.log('Connected database')
}).catch((err)=>{
    console.log("Error in db connection:",err)
})

module.exports = client;
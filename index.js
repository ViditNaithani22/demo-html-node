const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());

app.get('/', (req, res) => {
    try{
        
        const ip = axios.get('http://169.254.169.254/latest/meta-data/local-ipv4');
        const name = axios.get('http://169.254.169.254/latest/meta-data/hostname');

        res.send(`EC2 private IP: ${ip.data}, EC2 name: ${name.data}`);

    }catch(err){

        console.error(err.message);
        res.status(500).send('could not fetch the data');

    }
});


app.listen(80, () => {
    console.log("Server is running");
});
const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());

app.get('/', async (req, res) => {
    try{
        
        const tokenResp = await axios.put(
            'http://169.254.169.254/latest/api/token',
            null,
            { headers: { 'X-aws-ec2-metadata-token-ttl-seconds': '21600' } }
        );
        const token = tokenResp.data;

        const ipResp = await axios.get('http://169.254.169.254/latest/meta-data/local-ipv4', {
            headers: { 'X-aws-ec2-metadata-token': token }
        });
        const nameResp = await axios.get('http://169.254.169.254/latest/meta-data/hostname', {
            headers: { 'X-aws-ec2-metadata-token': token }
        });

        res.send(`EC2 private IP: ${ipResp.data}, EC2 name: ${nameResp.data}`);

    }catch(err){

        console.error(err.message);
        res.status(500).send('could not fetch the data');

    }
});


app.listen(3000,"0.0.0.0",() => {
    console.log("Server is running");
});

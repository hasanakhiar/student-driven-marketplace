const app= require('express')
require('dotenv').config();
const connectDB = require('../connect');

const app=express();

app.get('/',(req,res)=>{
    res.send('fine');
})

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT, () => console.log('Server started ...'));
    } catch (err) {
        console.log(err);
    }
};
start();
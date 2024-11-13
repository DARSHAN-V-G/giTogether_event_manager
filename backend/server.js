const express = require('express');
const app = express();
const connectDB = require('./config/mongoDB')
const cors = require('cors');
app.use(cors());
connectDB();
app.use(express.json())
require('dotenv').config()



const Event = require('./routes/FetchRoutes')
const Team = require('./routes/mongoDBroutes')
app.use('/event',Event);
app.use('/team',Team);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
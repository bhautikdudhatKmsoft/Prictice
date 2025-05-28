require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

async function main() {
    await mongoose.connect(process.env.MONGODB);
}

main()
.then(() => console.log('Db is connected.....'))
.catch(err => console.log(err.message));

const authroute = require('./routes/user.route');
const contactRoutes = require('./routes/contact.route');

app.use('/auth', authroute);
app.use('/api', contactRoutes);

app.listen(port, () => {
    console.log(`Start server at http://localhost:${port}`);
});

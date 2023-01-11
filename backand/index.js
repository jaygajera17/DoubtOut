const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
connectToMongo();
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Hello DoutbtOut')
})

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/question", require("./routes/questions"));
app.use("/api/answer", require("./routes/answers"));



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
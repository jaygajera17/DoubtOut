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
<<<<<<< HEAD
app.use("/api/comment", require("./routes/comment"));
=======
app.use("/api/admin", require("./routes/admin"));
>>>>>>> 0a775c38d76425c9df680d09ff5b8773be9004d4



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
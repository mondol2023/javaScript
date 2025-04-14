const express = require ("express");
const bodyParser = require("body-parser");
const cors = require ('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const users = { admin: "password123"};

let bookings = [];

app.post('/login', (req,res) => {
    const { username, password } = req.body;
    if (users[username] === password) {
        return res.status(200).json({ message: "Login successful!" });
    }
    else {
        return res.sendStatus(401).json({ message: "Invalid username or password" });
    }
});

app.post('/booking', (req, res) => {
    const { name, roomType, nights } = req.body;
    const cost = roomPrice[roomType] * nights;

    const newBooking = { 
        id: Date.now(),
        name, roomType, cost,
        nights: parseInt(nights),
        bookingDate: new Date(),
     };
     bookings.push(newBooking);
     return res.status(200).json({ message: "Booking successful!", booking: newBooking});

});

app.get('/admin/bookings', (req, res) => {
    return res.status(200).json({ bookings });
});


const corsOptions = {
    origin: 'http://localhost:5500',
    optionsSuccessStatus: 200,
} 

app.use(cors(corsOptions));



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
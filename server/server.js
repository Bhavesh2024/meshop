const express = require("express");
const cors = require("cors");
const app = express();
// const multer = require('multer')
const loginRoute = require('./routes/login')
const imageRoute = require('./routes/product');
const apiRoute = require ('./routes/api')
const adminRoute = require('./routes/admin');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const allowedOrigins = [
  'https://meshop-sr1f.vercel.app',
  'https://meshop-sr1f-4rdehw7bh-bhavesh2024s-projects.vercel.app',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the origin
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],  // Allowed headers
  credentials: true,  // Enable cookies and authorization headers
};

app.use(cors(corsOptions));

app.use(cookieParser())
app.use(express.json());

app.use(express.urlencoded({extended:true}))
app.get('/',(req,res) =>{
	console.log('hello');
	res.send('welcome')
})
app.use('/user',loginRoute);
app.use('/api',apiRoute);
app.use('/products/images/',imageRoute)
app.use('/admin',adminRoute)
const PORT = 5000;
app.listen(PORT, () => console.log(`Server Started at PORT::${PORT}`));

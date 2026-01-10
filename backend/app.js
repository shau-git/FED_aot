const express = require('express');
const sequelize = require('./db/connect');
require('dotenv').config(); 
const PORT = process.env.PORT || 3000; 
const cors = require('cors'); 

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://fed-aot.vercel.app/', 'https://fed-aot.onrender.com/'],
    methods: ['GET', 'POST', 'DELETE'], // Add all methods you use
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))


// middleware
const authenticateUser = require("./middleware/auth")
// errorHandling
const errorHandlerMiddleware = require("./middleware/errorHandler")
const notFound = require("./middleware/not-Found")

// routers
const userRouter = require("./routers/userRouters")
const likesRouter = require('./routers/likesRouter')


// routes
app.use('/api/user', userRouter)
app.use("/api/likes", authenticateUser, likesRouter)


// handling error
app.use(notFound) // all not found route will be catched by this middleware
app.use(errorHandlerMiddleware)



const domain = "http://localhost:"
// Database connection
sequelize.authenticate()
    .then(() => {
        console.log('DB connected successfully.');
        // Optional: dbConnect.sync({ alter: true }); // Uncomment only if you need to auto-create/update tables
        app.listen(PORT, () => {
            //console.log(`Server started on port ${PORT}`);
            console.log(`Server started => ${domain}${PORT}`);
            
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit process if DB connection fails
    });
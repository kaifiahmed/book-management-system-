import express, { request, response }  from "express"; 
import { PORT,mongoDBURL } from "./config.js"; // importing port number config file 
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import booksRoute from './routes/booksRoutes.js'
import cors from 'cors'

const app = express(); // assigning express fuction to app variable



//Middleware for parsing request body
app.use(express.json());

//middleware for handing CORS POLICY
//option 1: allow all original with defailt of cors(*)
app.use(cors());


app.get('/',(resquest , response) =>{
    console.log(resquest);
    return response.status(234).send('welcome to mern stack tutorial , i am kaifi ahmed')
});

app.use('/books', booksRoute )


//conectting to database 
mongoose
    .connect(mongoDBURL)
    .then(() => {
       console.log("App connected to database");
       //creating a server at given port //and runnig the server only when it is connceted Database
       app.listen(PORT , () => {
       console.log(`App is listenig to port : ${PORT}`);
})
    })
    .catch((error) => {
        console.log(mongoDBURL);
        console.log(error)
    })
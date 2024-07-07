import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();
// DB connection
import { connect } from './config/db.js';
connect();

const app = express();
app.use(express.json());
app.use(cors());

// test path 
import test from "./test/serverTest.js";
app.use(test);

// routes
import routes from "./routes/protectedRoutes.js"
app.use("/api/",routes);


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${server.address().port}`);
});

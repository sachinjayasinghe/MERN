import express from 'express';
import Students from '../models/student.js';
import { getStudents, postStudents } from '../controllers/studentController.js';

const studentRouter = express.Router(); //created a router called studentRouter

studentRouter.get("/", getStudents); // get all students from database using mongoose model 

studentRouter.post("/", postStudents); // add a new student to database using mongoose model

export default studentRouter;
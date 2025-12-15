import Student from "../models/student.js";

// export function getStudents(req, res){ //fetch all students from database using mongoose model
//      Student.find().then(              

//       (students)=>{
//         res.json(students); //send student as a json reponse
//       }


//      ).catch(
//       ()=>{
//         console.log("Failed to fetch students");
//         res.json({
//           message: "Failed to fetch students"
//         })
//       }
//      ) 
//  }

export async function getStudents(req,res){
  try{
    const students = await Student.find()
    res.json(students);
  }catch(error){
    res.status(500).json({
      message: "Failed to fetch students",
      error:error.message
    });
  }
}

export function postStudents(req, res){   //function for add a new student to database

    if(req.user == null){     //if user is not logged in  //req.user is set in index.js
      res.status(403).json({     
        message : "Please login to create a student"        //day 06, 2.15
      })
      return;  //to stop the function from executing further
    }
    if(req.user.role != "admin"){   //if logged in user is not admin     //day 06, 2.15
      res.status(403).json({
        message : "Please login as admin to create a student"
      })
      return;     
    }

    console.log(req.body);

    const student = new Student( //creating a new student from the Student model and save a new student in database 
      {                          
        name : req.body.name,
        age : req.body.age,
        email : req.body.email // get data from request body (from frontend)
      }
    )

    student.save().then(  
      ()=>{
        res.json({
          message: "Student saved successfully"
        });
      }).catch(
        ()=>{
          res.json({
            message: "Student not saved"
          });
        }
      )
}


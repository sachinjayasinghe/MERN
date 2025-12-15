import User from '../models/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function createUser(req, res) {

    const passwordHash = bcrypt.hashSync(req.body.password,10); //hashing the password(10 is the salt rounds)

    const userData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : passwordHash      //get data from request body (from frontend)
}

    const user = new User(userData) //create a new user instance

    user.save().then(
        ()=>{
            res.json({
                message : "User created successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Failed to create user"
            })
        }
    )
}

export function loginUser(req, res){
  const email = req.body.email;
  const password = req.body.password;  //get email and password from request body

  User.findOne(  //find a user in database using mongoose model
    {
     email : email,  //find user by email ( "email"(dark blue/2nd one) = req.body.email )
    }
  ).then(
    (user)=>{  //user was created in createUser function //user is the user object fetched from database
        if(user == null){  //if user not found
             res.status(404).json({    
                 message : "User not found"  //send user not found message
                })
                return;
                
            }else{
                const isPasswordCorrect = bcrypt.compareSync(password, user.password); //compare the password from frontend with hashed password in database(user.password)
                if(isPasswordCorrect){                                                 //"password"(dark blue) = "req.body.password"

                    const token = jwt.sign(  //create a jwt token
                        {
                            email : user.email,           
                            firstName : user.firstName,
                            lastName : user.lastName,  
                            role : user.role,                          //payload data(data to be sent to frontend)
                            isBlocked : user.isBlocked,                //this data will encrypt with the token
                            isEmailVerified : user.isEmailVerified,
                            image : user.image
                        },
                        "cbc6503"  //secret key (should be in env file in real projects)
                    )

                    res.json({
                        token : token,                //send token to frontend
                        message : "Login successful" 
                    })
                }else{
                    res.status(403).json({
                        message : "Incorrect password"
                    })
                }
            }
        }
    )
}
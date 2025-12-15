import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true // user must have a first name
    },

    lastName : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true  //one user can have only one email. so the email should be unique
    },

    password : {
        type : String,
        required : true
    },

    phone : {
        type : String,
        required : true,
        default : "Not Given" //if someone didn't give a phone no, the default value is "Not given" instead of his phone no
    },

    isBlocked : {
        type : Boolean,
        default : false  //when a new user login ( create a new user), he is should not blocked
    },
    role : {
        type : String,
        default : "user"
    },
    isEmailVerified : {
        type : Boolean,
        default : false
    },
    image : {         //link of the image(not the image)
        type : String,
        default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    } 
})

const User = mongoose.model('users', userSchema);

export default User;
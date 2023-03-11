const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const newsSchema = new mongoose.Schema({
    image: {
        type: String,
        // required:true
    },
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    catagory:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})


// newsSchema.pre('save', function (next) {
//     if (this.isModified('password')) {
//         bcrypt.hash(this.password, 8, (err, hash) => {
//             if (err) return next(err);
//             this.password = hash;
//             next();
//         })
//     }
//     // if (this.isModified('confirmPassword')) {
//     //     bcrypt.hash(this.confirmPassword, 8, (err, hash) => {
//     //         if (err) return next(err);
//     //         this.confirmPassword = hash;
//     //         next();
//     //     })
//     // }
// })

// newsSchema.methods.generateAuthToken = async function () {
//     try {
//         const newtoken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
//         // console.log(token);
//         //this.token =(newtoken);
//         await this.updateOne({ $set: { token: newtoken } });
//         return newtoken;
//     } catch (err) {
//         console.log(err);
//         return err;
//     }
// }


// newsSchema.methods.comparePassword = async function (password) {
//     if (!password) throw new Error('Password is mission,can not compare');
//     try {
//         const result = await bcrypt.compare(password, this.password);
//         return result;
//     } catch (error) {
//         console.log('Error while comparing' + error.message);
//     }
// }

// newsSchema.statics.isThisEmailInUse = async function (email) {
//     if (!email) throw new Error('Inavlid email')
//     try {
//         const user = await this.findOne({ email })
//         if (user) return false;
//         return true;
//     } catch (err) {
//         console.log('error inside isThisEmailInUse', err.message)
//         return false
//     }
// }

module.exports = mongoose.model('newsData', newsSchema)
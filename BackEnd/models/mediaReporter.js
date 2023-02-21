const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const reporterSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        // required: false
    },
    token: {
        type: String,
        // required: true
    }
    ,
    avtar: {
        type: Buffer
    }
})

reporterSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        })
    }
    // if (this.isModified('confirmPassword')) {
    //     bcrypt.hash(this.confirmPassword, 8, (err, hash) => {
    //         if (err) return next(err);
    //         this.confirmPassword = hash;
    //         next();
    //     })
    // }
})

reporterSchema.methods.generateAuthToken = async function () {
    try {
        const newtoken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        await this.updateOne({ $set: { token: newtoken } });
        return newtoken;
    } catch (err) {
        console.log(err);
        return err;
    }
}


reporterSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error('Password is mission,can not compare');
    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        console.log('Error while comparing' + error.message);
    }
}

reporterSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new Error('Inavlid email')
    try {
        const reporter = await this.findOne({ email })
        if (reporter) return false;
        return true;
    } catch (err) {
        console.log('error inside isThisEmailInUse', err.message)
        return false
    }
}

module.exports = mongoose.model('mediaReporter', reporterSchema)
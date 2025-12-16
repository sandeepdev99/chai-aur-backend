//creating the user model for a videotube website
//importing dependencies using module syntax
import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { use } from 'react';

//defining the user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
        index: true, //helps with faster search queries
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        index: true,
    },
    avatarUrl: {
        type: String,//cloudinary url for user avatar
        trim: true,
        default: 'https://example.com/default-avatar.png',
        required: true,
    },
    coverImgUrl: {
        type: String,//cloudinary url for user cover image
        trim: true,
        default: 'https://example.com/default-cover.png',
        required: false,
    },
    watchHistory: {
        type: [Schema.Types.ObjectId],
        ref: 'Video',
        default: [],
    },
    passwordHash: {
        type: String,
        required: [true, 'Password is required' ],
        minlength: 60, //assuming bcrypt hash
    },
    refreshToken: {
        type: String,
        default: null,
    }
}, {timestamps: true});

userSchema.pre('save', async function(next) {
    if (this.isModified('passwordHash')) {
        this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    }
    next(); 
});

userSchema.methods.isPasswordValid = async function(password) {
    return await bcrypt.compare(password, this.passwordHash);
};

userSchema.methods.generateAccessToken =  function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
    }, process.env.ACESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
    })
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id,
        username: this.username,
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    })
};

const User = mongoose.model('User', userSchema);

export default User;
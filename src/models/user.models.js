//creating the user model for a videotube website
//importing dependencies using module syntax
import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


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
    avatar: {
        type: String,//cloudinary url for user avatar
        trim: true,
        default: '',
        required: true,
    },
    coverImage: {
        type: String,//cloudinary url for user cover image
        trim: true,
        default: '',
        required: false,
    },
    watchHistory: {
        type: [Schema.Types.ObjectId],
        ref: 'Video',
        default: [],
    },
    password: {
        type: String,
        required: [true, 'Password is required' ],
        minlength: 8, //assuming bcrypt hash
    },
    refreshToken: {
        type: String,
        default: null,
    }
}, {timestamps: true});

function testingCode(love) {
    // to console log something for testing
    console.log("This is a test function");
    console.log("userSchema",love)
}

//pre-save hook to hash password before saving to db
userSchema.pre('save',async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

userSchema.methods.isPasswordValid = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken =  function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
    }, process.env.ACESS_TOKEN_SECRET, 
    {
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
export { testingCode };
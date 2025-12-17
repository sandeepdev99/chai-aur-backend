import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
        index: true,
    },
    thumbnailUrl: {
        type: String, //cloudinary url for video thumbnail
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000,
        default: '',
    },
    videoUrl: {
        type: String, //cloudinary url for video file
        required: true,
        trim: true,
    },
    duration: {
        type: Number, //duration in seconds
        required: true,
        min: 1,
    },
    views: {
        type: Number,
        default: 0,
        min: 0,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
}, {timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate);
const Video = mongoose.model("Video", videoSchema);
export default Video;
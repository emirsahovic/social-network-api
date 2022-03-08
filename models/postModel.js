import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
            }
        }],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }],
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema);

export default Post;

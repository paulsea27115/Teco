import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: String, required: true },
    viewCount: { type: Number, required: true, default: 0 },
    likeCount: { type: Number, required: true, default: 0 },
    like_users: [String]
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createAt',
        updatedAt: 'updatedAt'
    }
});

export default model('Post', postSchema)
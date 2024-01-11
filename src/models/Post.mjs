import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { data:Buffer, contentType:String },
    authorId: { type: String, required: true },
    category: { type: String, required: true },
    viewCount: { type: Number, required: true, default: 0 },
    likeCount: { type: Number, required: true, default: 0 },
    view_users: [{
        userId: { type: String, required: true }, // 또는 mongoose.Schema.Types.ObjectId 로 사용자의 ObjectId를 저장할 수도 있습니다.
        lastViewed: String
    }],
    like_users: [{
        userId: { type: String, required: true }
    }]
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createAt',
        updatedAt: 'updatedAt'
    }
});

export default model('Post', postSchema)
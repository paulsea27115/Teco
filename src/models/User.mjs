import { Schema, model } from "mongoose";

const userSchema = new Schema ({
    name: {type:String, required: true},
    id: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
},{
    versionKey: false,
    timestamps: {
      createdAt: 'createAt',
      updatedAt: 'updatedAt'
    }
});

export default model('User', userSchema)
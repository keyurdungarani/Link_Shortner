import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamps: {type: Number}}],
},{timestamps: true});

const URL = mongoose.model("URL", urlSchema);
export default URL;
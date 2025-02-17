
const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        ImgUrl: {
            type: String,
            default: 'https://res.cloudinary.com/dutnq2gdm/image/upload/v1739460894/D.E.M.O._Logo_2006_b2zhgh.svg',
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,

        },
        email: {
            type: String,
            required: true,

        },
        role: {
            type: String,
            default: 'user',
        },



    },
    { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("user", dataSchema);
module.exports = userModel;

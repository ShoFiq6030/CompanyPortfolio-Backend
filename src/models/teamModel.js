
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
        position: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },


    },
    { timestamps: true, versionKey: false }
);

const teamModel = mongoose.model("team", dataSchema);
module.exports = teamModel;

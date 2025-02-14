
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
        text: {
            type: String,
            required: true,
        },

    },
    { timestamps: true, versionKey: false }
);

const heroModel = mongoose.model("heroSection", dataSchema);
module.exports = heroModel;

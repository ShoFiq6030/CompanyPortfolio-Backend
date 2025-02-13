const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        logoUrl: {
            type: String,
            default: 'https://res.cloudinary.com/dutnq2gdm/image/upload/v1739460894/D.E.M.O._Logo_2006_b2zhgh.svg',
        },
        ourCompanies: {
            type: [String],
            required: true,
        },
        products: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

const NavModel = mongoose.model("navbar", dataSchema);
module.exports = NavModel;

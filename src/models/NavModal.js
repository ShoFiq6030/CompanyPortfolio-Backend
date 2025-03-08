const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
    {
        logoUrl: {
            type: String,
            default: 'https://res.cloudinary.com/dutnq2gdm/image/upload/v1739460894/D.E.M.O._Logo_2006_b2zhgh.svg',
        },
        ourCompanies: [{
            name: String,
            url: String,
        }],
        products: [{
            name: String,
            url: String,
        }],
    },
    { timestamps: true, versionKey: false }
);

const NavModel = mongoose.model("navbar", dataSchema);
module.exports = NavModel;

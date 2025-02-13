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

        headOffices: {
            house: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },

            mobile: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            website: {
                type: String,
                required: true,
            },

        },
        subOffices: {
            house: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },

            mobile: {
                type: String,
                required: true,
            }

        },


    },
    { timestamps: true, versionKey: false }
);

const footerModel = mongoose.model("footer", dataSchema);
module.exports = footerModel;

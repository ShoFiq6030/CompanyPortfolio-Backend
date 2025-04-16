
const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        rate: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        details: [
            {
                type: String,
                required: true,
            }
        ],
        category: {
            type: String,
            required: true,
            enum: [
                "Home Internet",
                "Gaming",
                "Corporate ",
                "SME"
            ],
        },

    },
    { timestamps: true, versionKey: false }
);

const packageModal = mongoose.model("packages", dataSchema);
module.exports = packageModal;

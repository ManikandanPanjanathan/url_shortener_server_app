const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
        trim: true,
    },

    shortUrl: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    customAlias: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
    },

    topic: {
        type: String,
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    clicks: {
        type: Number,
        default: 0,
    },

    analytics: [
        {
            timestamp: {
                type: Date,
                default: Date.now,
            },
            encryptedIp: {
                type: String,
                trim: true,
            },
            iv: {
                type: String,
                required: true,
            },
            userAgent: { type: Schema.Types.Mixed, default: null },
            geolocation: { type: Schema.Types.Mixed, default: null },
        },
    ],
});

module.exports = mongoose.model('Url', urlSchema);
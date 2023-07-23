import mongoose from 'mongoose';
import {hashPassword} from '../lib/utils/passwordUtils.js';

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    canProcessYunka: {
        type: Boolean,
        default: false,
    },
    canChangeAutoLetter: {
        type: Boolean,
        default: false,
    },
    canRemoveContent: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['admin', 'superAdmin'],
        default: 'admin',
    },
});

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        this.password = await hashPassword(this.password);
        next();
    } catch (err) {
        next(err);
    }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;

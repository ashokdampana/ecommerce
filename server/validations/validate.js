const { z } = require('zod');
const AppError = require('../utils/AppError');

exports.registerValid = (req, res, next) => {
    const registerSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    });
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        const message = result.error.errors.map((e) => e.message).join(', ');
        throw new AppError(message, 400);
    }
    next();
};

exports.loginValid = (req, res, next) => {
    const loginSchema = z.object({
        email: z.email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    });

    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        const message = result.error.errors.map((e) => e.message).join(', ');
        throw new AppError(message, 400);
    }
    next();
};

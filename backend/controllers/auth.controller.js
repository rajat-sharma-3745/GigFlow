import {asyncHandler} from '../utils/asyncHandler.js';
import authService from '../services/auth.service.js';
import { setTokenCookie, clearTokenCookie } from '../utils/jwt.js';
import { registerSchema, loginSchema } from '../utils/validators.js';

export const register = asyncHandler(async (req, res) => {
    const validatedData = registerSchema.parse(req.body);

    const { user, token } = await authService.register(validatedData);

    setTokenCookie(res, token);

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: { user, token }

    });
});
export const login = asyncHandler(async (req, res) => {
    const validatedData = loginSchema.parse(req.body);
    const { user, token } = await authService.login(
        validatedData.email,
        validatedData.password
    );
    setTokenCookie(res, token);
    res.status(200).json({
        success: true,
        message: 'Login successful',
        data: { user, token }
    });
});
export const logout = asyncHandler(async (req, res) => {
    clearTokenCookie(res);
    res.status(200).json({
        success: true,
        message: 'Logout successful'
    });
});
export const getProfile = asyncHandler(async (req, res) => {
    const user = await authService.getProfile(req.userId);
    res.status(200).json({
        success: true,
        data: { user }
    });
});
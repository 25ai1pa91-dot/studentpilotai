import { Router } from 'express';
import { authController } from '../controller/auth.controller';
import { validateRequest } from '../../../middleware/validation.middleware';
import {
  registerValidator,
  loginValidator,
  refreshTokenValidator,
  changePasswordValidator,
} from '../validator/auth.validator';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new student user
 *     tags: [Authentication]
 */
router.post('/register', validateRequest(registerValidator), (req, res, next) =>
  authController.register(req, res, next)
);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user and issue JWT Access and Refresh Tokens
 *     tags: [Authentication]
 */
router.post('/login', validateRequest(loginValidator), (req, res, next) =>
  authController.login(req, res, next)
);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout user and invalidate refresh session
 *     tags: [Authentication]
 */
router.post('/logout', authenticate, (req, res, next) =>
  authController.logout(req, res, next)
);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Rotate refresh token and generate new access token
 *     tags: [Authentication]
 */
router.post('/refresh', (req, res, next) =>
  authController.refreshToken(req, res, next)
);

router.post('/refresh-token', (req, res, next) =>
  authController.refreshToken(req, res, next)
);

/**
 * @swagger
 * /api/v1/auth/verify-email:
 *   post:
 *     summary: Verify student email address with 6-digit OTP
 *     tags: [Authentication]
 */
router.post('/verify-email', (req, res, next) =>
  authController.verifyEmail(req, res, next)
);

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Request password reset OTP email
 *     tags: [Authentication]
 */
router.post('/forgot-password', (req, res, next) =>
  authController.forgotPassword(req, res, next)
);

/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset password with OTP session token
 *     tags: [Authentication]
 */
router.post('/reset-password', (req, res, next) =>
  authController.resetPassword(req, res, next)
);

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get currently authenticated user details
 *     tags: [Authentication]
 */
router.get('/me', authenticate, (req, res, next) =>
  authController.getMe(req, res, next)
);

/**
 * @swagger
 * /api/v1/auth/change-password:
 *   patch:
 *     summary: Change password for currently authenticated user
 *     tags: [Authentication]
 */
router.patch(
  '/change-password',
  authenticate,
  validateRequest(changePasswordValidator),
  (req, res, next) => authController.changePassword(req, res, next)
);

export const authRoutes = router;

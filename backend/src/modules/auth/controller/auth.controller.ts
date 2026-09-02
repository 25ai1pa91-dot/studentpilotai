import { Request, Response, NextFunction } from 'express';
import { authService } from '../service/auth.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class AuthController {
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.register(req.body);
      ApiResponse.success(res, result, 'Registration successful', 201);
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const device = req.headers['user-agent'] || 'Browser';
      const ip = req.ip || '127.0.0.1';
      const result = await authService.login(req.body, device, ip);
      ApiResponse.success(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req.body.refreshToken;
      if (req.user?._id && refreshToken) {
        await authService.logout(req.user._id.toString(), refreshToken);
      }
      ApiResponse.success(res, null, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const device = req.headers['user-agent'] || 'Browser';
      const ip = req.ip || '127.0.0.1';
      const token = req.body.refreshToken || req.body.refresh_token;
      const result = await authService.refreshToken(token, device, ip);
      ApiResponse.success(res, result, 'Token refreshed successfully');
    } catch (error) {
      next(error);
    }
  }

  public async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, code } = req.body;
      const result = await authService.verifyEmail(email, code);
      ApiResponse.success(res, result, 'Email verified successfully');
    } catch (error) {
      next(error);
    }
  }

  public async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const result = await authService.forgotPassword(email);
      ApiResponse.success(res, result, 'Password reset email sent');
    } catch (error) {
      next(error);
    }
  }

  public async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { password } = req.body;
      const result = await authService.resetPassword(password);
      ApiResponse.success(res, result, 'Password reset successful');
    } catch (error) {
      next(error);
    }
  }

  public async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      ApiResponse.success(res, req.user, 'Current user profile fetched');
    } catch (error) {
      next(error);
    }
  }

  public async changePassword(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      await authService.changePassword(req.user._id.toString(), req.body);
      ApiResponse.success(res, null, 'Password changed successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();

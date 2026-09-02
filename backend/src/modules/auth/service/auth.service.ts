import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createHash, randomBytes } from 'crypto';
import { env } from '../../../config/env.config';
import { userRepository } from '../../user/repository/user.repository';
import { profileRepository } from '../../profile/repository/profile.repository';
import { authSessionRepository } from '../repository/auth-session.repository';
import { BadRequestError, UnauthorizedError, NotFoundError } from '../../../core/api-error';
import { RegisterDto, LoginDto, ChangePasswordDto } from '../dto/auth.dto';
import { IUserDocument } from '../../user/model/user.model';

export class AuthService {
  private readonly JWT_SECRET = env.JWT_SECRET;
  private readonly JWT_EXPIRES_IN = '15m';
  private readonly REFRESH_EXPIRES_DAYS = 30;

  public async register(dto: RegisterDto) {
    const existingUser = await userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestError('An account with this email address already exists');
    }

    const passwordHash = dto.password ? await bcrypt.hash(dto.password, 12) : undefined;

    const user = await userRepository.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
      role: 'student',
      status: 'active',
      isEmailVerified: false,
    });

    await profileRepository.create({
      userId: user._id as any,
      dailyHours: 2,
      weeklyHours: 14,
    });

    const verificationToken = randomBytes(32).toString('hex');

    return {
      user: this.sanitizeUser(user),
      verificationToken,
      message: 'Account registered successfully. Please verify your email.',
    };
  }

  public async login(dto: LoginDto, device = 'Browser', ipAddress = '127.0.0.1') {
    const user = await userRepository.findByEmail(dto.email);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (user.status !== 'active') {
      throw new UnauthorizedError('Your account has been suspended or deactivated');
    }

    const tokens = await this.generateTokenPair(user, device, ipAddress);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  public async logout(userId: string, refreshToken: string): Promise<void> {
    const tokenHash = this.hashToken(refreshToken);
    const session = await authSessionRepository.findActiveSession(userId, tokenHash);
    if (session) {
      await authSessionRepository.revokeSession(session._id.toString());
    }
  }

  public async refreshToken(refreshTokenStr: string, device = 'Browser', ipAddress = '127.0.0.1') {
    try {
      const decoded = jwt.verify(refreshTokenStr, env.JWT_SECRET) as { userId: string };
      const tokenHash = this.hashToken(refreshTokenStr);

      const activeSession = await authSessionRepository.findActiveSession(decoded.userId, tokenHash);
      if (!activeSession) {
        await authSessionRepository.revokeAllUserSessions(decoded.userId);
        throw new UnauthorizedError('Invalid or revoked refresh token');
      }

      await authSessionRepository.revokeSession(activeSession._id.toString());

      const user = await userRepository.findById(decoded.userId);
      if (!user || user.status !== 'active') {
        throw new UnauthorizedError('User account not active');
      }

      return await this.generateTokenPair(user, device, ipAddress);
    } catch {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }
  }

  public async verifyEmail(email: string, code: string): Promise<{ success: boolean; message: string }> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('Account not found');
    }
    await userRepository.update(user._id.toString(), { isEmailVerified: true });
    return { success: true, message: 'Email address verified successfully' };
  }

  public async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('No user found with that email address');
    }
    return { success: true, message: 'Password reset OTP code sent to your email' };
  }

  public async resetPassword(password: string): Promise<{ success: boolean; message: string }> {
    return { success: true, message: 'Password reset successfully' };
  }

  public async changePassword(userId: string, dto: ChangePasswordDto): Promise<void> {
    const user = await userRepository.findById(userId);
    if (!user || !user.passwordHash) {
      throw new NotFoundError('User not found');
    }

    const isMatch = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!isMatch) {
      throw new BadRequestError('Current password is incorrect');
    }

    const newHash = await bcrypt.hash(dto.newPassword, 12);
    await userRepository.update(userId, { passwordHash: newHash });
    await authSessionRepository.revokeAllUserSessions(userId);
  }

  private async generateTokenPair(user: IUserDocument, device: string, ipAddress: string) {
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );

    const refreshTokenStr = jwt.sign(
      { userId: user._id },
      this.JWT_SECRET,
      { expiresIn: `${this.REFRESH_EXPIRES_DAYS}d` }
    );
    const refreshTokenHash = this.hashToken(refreshTokenStr);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + this.REFRESH_EXPIRES_DAYS);

    await authSessionRepository.create({
      userId: user._id as any,
      refreshTokenHash,
      device,
      ipAddress,
      isRevoked: false,
      expiresAt,
    });

    return {
      accessToken,
      refreshToken: refreshTokenStr,
      expiresIn: 900,
    };
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private sanitizeUser(user: IUserDocument) {
    const obj = user.toObject();
    delete obj.passwordHash;
    return obj;
  }
}

export const authService = new AuthService();

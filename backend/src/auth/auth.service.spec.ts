import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

const mockUsersService = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('fake-jwt-token'),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a user successfully', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({
        _id: '123',
        email: 'test@test.com',
      });

      const result = await authService.register({
        firstName: 'Dounia',
        lastName: 'Elg',
        email: 'test@test.com',
        password: 'secret123',
        educationLevel: 'Bac+3',
        ageRange: '18-25',
      });

      expect(result).toEqual({ message: 'Registration successful' });
      expect(mockUsersService.create).toHaveBeenCalledTimes(1);
    });

    it('should throw ConflictException if email already exists', async () => {
      mockUsersService.findByEmail.mockResolvedValue({ email: 'test@test.com' });

      await expect(
        authService.register({
          firstName: 'Dounia',
          lastName: 'Elg',
          email: 'test@test.com',
          password: 'secret123',
          educationLevel: 'Bac+3',
          ageRange: '18-25',
        }),
      ).rejects.toThrow(ConflictException);

      expect(mockUsersService.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should login successfully and return a token', async () => {
      
      const hashedPassword = await bcrypt.hash('secret123', 10);
      mockUsersService.findByEmail.mockResolvedValue({
        _id: 'abc123',
        email: 'test@test.com',
        password: hashedPassword,
        role: 'USER',
        firstName: 'Dounia',
        lastName: 'Elg',
      });

      const result = await authService.login({
        email: 'test@test.com',
        password: 'secret123',
      });

      expect(result.accessToken).toBe('fake-jwt-token');
      expect(result.user.email).toBe('test@test.com');
    });

    it('should throw UnauthorizedException if email not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login({ email: 'nobody@test.com', password: 'secret123' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is wrong', async () => {
      const hashedPassword = await bcrypt.hash('correct_password', 10);
      mockUsersService.findByEmail.mockResolvedValue({
        _id: 'abc123',
        email: 'test@test.com',
        password: hashedPassword,
        role: 'USER',
        firstName: 'Dounia',
        lastName: 'Elg',
      });

      await expect(
        authService.login({ email: 'test@test.com', password: 'wrong_password' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
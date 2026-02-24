import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

const mockUsersService = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};

describe('AuthService - register', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should register a user successfully', async () => {
    mockUsersService.findByEmail.mockResolvedValue(null);
    mockUsersService.create.mockResolvedValue({ _id: '123', email: 'test@test.com' });

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
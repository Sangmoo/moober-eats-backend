import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UserService } from './users.service';

const MockRepository = {
  fineOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

const mockMailService = {
  sendVerification: jest.fn(),
};

// jest.Mock 타입의 모든 Repository 함수들
type MockRepository<T = any> = Partial<
  Record<keyof Repository<User>, jest.Mock>
>;

describe('UserService', () => {
  let service: UserService;
  let usersRepository: MockRepository<User>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: MockRepository,
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: MockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  // if ('should be defind',
  //   () => {
  //     expect(service).toBeDefined();
  //   });

  describe('createAccount', () => {
    // it('should fail if user exists', async () => {
    // usersRepository.findOne.mockResolvedValue({
    //   id: 1,
    //   email: 'Hello',
    // });
    // const result = await service.createAccount({
    //   email: '',
    //   password: '',
    //   role: 0,
    // });
    // expect(result).toMatchObject({
    //   ok: false,
    //   error: 'There is a user with that email already',
    // });
    // });
  });
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
  it.todo('verifyEmail');
});

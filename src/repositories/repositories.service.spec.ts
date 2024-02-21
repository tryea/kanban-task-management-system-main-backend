// src/repositories/repositories.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesService } from './repositories.service';
import { UserRepository } from './repository/user-repository';
import { PrismaModule } from '../../src/prisma/prisma.module';

describe('RepositoriesService', () => {
  let service: RepositoriesService;

  beforeEach(async () => {
    const repos = [RepositoriesService, UserRepository];

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [...repos],
      exports: [...repos],
    }).compile();

    service = module.get<RepositoriesService>(RepositoriesService);
  });

  it('repository service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('user attribute in repository service should be defined', () => {
    expect(service?.user).toBeDefined();
  });

  describe('user repository', () => {
    it('should be defined', () => {
      expect(service?.user).toBeDefined();
    });

    it('createUser method should be defined', () => {
      expect(service?.user?.createUser).toBeDefined();
    });

    it('findUserById method should be defined', () => {
      expect(service?.user?.findUserById).toBeDefined();
    });

    it('updateUser method should be defined', () => {
      expect(service?.user?.updateUser).toBeDefined();
    });

    it('deleteUser method should be defined', () => {
      expect(service?.user?.deleteUser).toBeDefined();
    });

    describe('createUser method', () => {
      beforeAll(async () => {
        // clear all users data
        await service.user.table.deleteMany();
      });

      // afterAll(async () => {
      //   // clear all users data
      //   await service.user.table.deleteMany();
      // });

      it('should create a new user', async () => {
        const user = await service.user.createUser({
          fullname: 'user 1',
          email: 'user1@mail.com',
          password: '12345678',
        });

        expect(user).toBeDefined();
      });

      it('should throw an error if user already exists', async () => {
        await expect(
          service.user.createUser({
            fullname: 'user 1',
            email: 'user1@mail.com',
            password: '12345678',
          }),
        ).rejects.toThrow('Email already exists');
      });
    });
  });
});

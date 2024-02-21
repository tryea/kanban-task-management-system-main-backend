// src/repositories/repository/user-repository.ts
import { Injectable } from '@nestjs/common';
import { Prisma, users } from '@prisma/client';
import { PrismaService } from '../../../src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  get table() {
    return this.prisma.users;
  }

  /**
   * Creates a new user in the database.
   *
   * @param data - the data for the new user
   * @returns the newly created user
   */
  async createUser(data: Prisma.usersCreateInput): Promise<users> {
    const user = await this.table.findUnique({ where: { email: data.email } });
    if (user !== null) {
      throw new Error('Email already exists');
    }

    return this.table.create({ data });
  }

  async findUserById(id: number): Promise<users | null> {
    return this.table.findUnique({
      where: { id },
    });
  }

  async updateUser(id: number, data: Prisma.usersUpdateInput): Promise<users> {
    return this.table.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<users> {
    return this.table.delete({
      where: { id },
    });
  }
}

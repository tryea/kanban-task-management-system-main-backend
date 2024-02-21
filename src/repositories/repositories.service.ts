// src/repositories/repositories.service.ts

import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user-repository';

@Injectable()
export class RepositoriesService {
  constructor(private _user: UserRepository) {}

  //this.respositories.user
  get user() {
    return this._user;
  }
}

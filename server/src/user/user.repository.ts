import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [];

  async save(users) {
    this.users.push(users);
    console.log(`A new user in arr! Users: ${JSON.stringify(this.users)}`);
  }

  async list() {
    return this.users;
  }

  async existEmail(email: string) {
    const IsUser = this.users.find((user) => user.email === email);

    return IsUser !== undefined;
  }
}

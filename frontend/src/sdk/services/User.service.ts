import { User } from '../@types/User';
import Service from '../Service';
import { generateQueryString } from '../utils';

class UserService extends Service {
  static getAllUsers(search: User.Query): User.PagedModelDetailed {
    const queryString = generateQueryString(search);
    return this.Http.get<User.PagedModelDetailed[]>(
      '/users'.concat(queryString),
    ).then(this.getData);
  }

  static getDetailedUser(userId: number) {
    return this.Http.get<User.Detailed>(`/users/${userId}`).then(this.getData);
  }

  static createUser(user: User.Input) {
    return this.Http.post<User.Detailed>('/users', user).then(this.getData);
  }

  static updateExistingUser(userId: number, user: User.UpdateInput) {
    return this.Http.put<User.Detailed>(`/users/${userId}`, user).then(
      this.getData,
    );
  }

  static deleteExistingUser(userId: number) {
    return this.Http.delete(`/users/${userId}`).then(this.getData);
  }
}

export default UserService;

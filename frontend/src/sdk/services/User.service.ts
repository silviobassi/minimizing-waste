import { User } from '../@types/User';
import Service from '../Service';

class UserService extends Service {
  static getAllUsers() {
    return this.Http.get<User.CollectionDetailed>('/users').then(this.getData);
  }

  static fetchUser(userId: number) {
    return this.Http.get<User.Detailed>(`/users/${userId}`).then(this.getData);
  }

  static createUser(user: User.Input) {
    return this.Http.post<User.Detailed>('/users', user).then(this.getData);
  }
}

export default UserService;
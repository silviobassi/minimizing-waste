import { useCallback, useState } from 'react';
import { User } from '../../@types/User';
import SupplyService from '../../services/Supply.service';
import UserService from '../../services/User.service';

export default function useUsers() {
  const [users, setUsers] = useState<User.CollectionDetailed[]>([]);

  const fetchUsers = useCallback(() => {
    UserService.getAllUsers().then(setUsers);
  }, []);

  return {
    fetchUsers,
    users,
  };
}

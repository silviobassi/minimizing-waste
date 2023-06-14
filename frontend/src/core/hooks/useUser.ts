import { useCallback, useState } from "react";
import { User } from "../../sdk/@types";
import { UserService } from "../../sdk/services";

export default function useUser() {
  const [user, setUser] = useState<User.Detailed>()

  const fetchUser = useCallback((userId: number) => {
    UserService.getDetailedUser(userId).then(setUser)
  }, [])

  return {
    user,
    fetchUser
  }
}
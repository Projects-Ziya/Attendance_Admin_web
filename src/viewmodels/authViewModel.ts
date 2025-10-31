import Cookies from "js-cookie";
import { login } from "../services/AuthService";

export const AuthVM = {
  async handleLogin(email: string, password: string, remember: boolean) {
    const data = await login(email, password); 

    if (data.success) {
      
      Cookies.set("access", data.access, { expires: 1 });
      Cookies.set("refresh", data.refresh, { expires: 7 });

   
      Cookies.set("user", JSON.stringify(data.user), { expires: remember ? 7 : 1 });
    }

    return data; 
  },

  handleLogout() {
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.remove("user");
  },

  isLoggedIn(): boolean {
    return !!Cookies.get("access");
  },

  getCurrentUser() {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
  },
};

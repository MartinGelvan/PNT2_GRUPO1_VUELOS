
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';  

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,     
    userName: '',   
  }),
  actions: {
    setUser(user) {
      this.user = user;
     
      if (user && user.name) {
        this.setUserName(user.name);
      }
    },
    logout() {
    
      localStorage.removeItem('auth-token');

      
      this.user = null;
      this.userName = ''; 

     
      const router = useRouter();
      router.push('/login');  
    },
    setUserName(name) {
      this.userName = name;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
    getUserName: (state) => state.userName,  
  }
});

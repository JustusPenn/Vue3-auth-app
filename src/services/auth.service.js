import api from "./api";
import TokenService from "./token.service"

class AuthService {
    login({username, password}){
        return api.post('/auth/signin', {
            username,
            password
        }).then(response => {
            if (response.data.accessToken) {
                // localStorage.setItem('user', JSON.stringify(response.data));
                TokenService.setUser(response.data);
            }

            return response.data;
        });
    }

    logout(){
        // localStorage.removeItem('user');
        TokenService.removeUser();
    }

    register({username, email, password}) {
        return api.post('/auth/signup', {
            username,
            email,
            password
        });
    }
}

export default new AuthService();
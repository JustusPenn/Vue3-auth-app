import api from "./api";
// import authHeader from "./auth-header";

// const API_URL = 'http://localhost:8080/api/test/';

class UserService {
    getPublicContent() {
        return api.get('/test/all');
    }

    getUserBoard() {
        return api.get('/test/user');
    }

    getModeratorBoard() {
        return api.get('/test/mod');
    }

    getAdminBoard() {
        return api.get('/test/admin');
    }
}

export default new UserService();
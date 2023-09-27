import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const instance = axios.create({
    baseURL: '/api/', // Базовый URL API
});

// Функция для выполнения запросов с авторизацией
const refreshAuthLogic = failedRequest => {
    // логика обновления токена
    return axios.post('/api/token/refresh/')
        .then(tokenRefreshResponse => {
            // Сохраняем новый токен в localStorage или где-либо еще
            const newAccessToken = tokenRefreshResponse.data.access;
            localStorage.setItem('access_token', newAccessToken);
            failedRequest.response.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return Promise.resolve();
        })
        .catch(error => {
            // Если не удалось обновить токен, направляем пользователя на страницу входа
            window.location.href = '/login';
            return Promise.reject(error);
        });
};

// Создаем interceptor для обновления токенов
createAuthRefreshInterceptor(instance, refreshAuthLogic);

export default instance;

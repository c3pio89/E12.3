import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Импортируем Axios
import './Categorystile.css';
function CategoryDetail() {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        // Создаем Axios-инстанс с базовым URL
        const api = axios.create({
            baseURL: '/api/', // Укажите правильный путь к вашему API
        });

        // Отправляем GET-запрос к API для получения деталей категории по categoryId
        api.get(`categories/${categoryId}/`)
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => {
                console.error('Error fetching category details:', error);
            });
    }, [categoryId]);

    if (!category) {
        return <div>Loading...</div>;
    }

    return (
        <div className="category-detail-container">
            <h2 className="category-detail-title">{category.name}</h2>
            <p className="category-detail-description">{category.description}</p>
        </div>
    );
}

export default CategoryDetail;

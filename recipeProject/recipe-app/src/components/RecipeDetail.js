import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Detailstyle.css';

function RecipeDetail() {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [categoryName, setCategoryName] = useState('');  // Добавлено

    useEffect(() => {
        // Логирование
        if (!recipeId) {
            console.log("Recipe ID is undefined or null");
        }

        const api = axios.create({
            baseURL: '/api/',
        });

        api.get(`recipes/${recipeId}/`)
            .then(response => {
                setRecipe(response.data);

                // Дополнительный запрос для получения названия категории
                return api.get(`categories/${response.data.category}/`);
            })
            .then(response => {
                setCategoryName(response.data.name);  // Устанавливаем название категории
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                console.log('Making API request to:', 'http://localhost:8000/api/recipes/' + recipeId);

            });
    }, [recipeId]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-detail-container">
            <h2 className="recipe-detail-title">{recipe.title}</h2>
            <p className="recipe-detail-ingredients">Ingredients: {recipe.ingredients}</p>
            <p className="recipe-detail-instructions">Instructions: {recipe.instructions}</p>
            <p className="recipe-detail-category">Category: {categoryName}</p>
        </div>
    );
}

export default RecipeDetail;

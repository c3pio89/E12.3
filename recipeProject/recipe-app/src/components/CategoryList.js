import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [recipesByCategory, setRecipesByCategory] = useState({});

    useEffect(() => {
        const api = axios.create({
            baseURL: '/api/',
        });

        api.get('categories/')
            .then(response => {
                setCategories(response.data);

                const promises = response.data.map(category => (
                    api.get(`recipes/?category=${category.id}`)
                        .then(response => response.data)
                        .catch(error => {
                            console.error('Error fetching recipes:', error);
                            return []; // Вернуть пустой массив в случае ошибки
                        })
                ));

                Promise.all(promises)
                    .then(recipeDataArray => {
                        const recipesByCategory = {};
                        recipeDataArray.forEach((recipes, index) => {
                            const category = response.data[index];
                            recipesByCategory[category.id] = recipes;
                        });
                        setRecipesByCategory(recipesByCategory);
                    });
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    console.log("Categories:", categories);
    console.log("Recipes by Category:", recipesByCategory);

    return (
        <div>
            {categories.map(category => (
                <div key={category.id}>
                    <h2>{category.name}</h2>
                    <ul>
                        {recipesByCategory[category.id]?.map(recipe => (
                            <li key={recipe.id}>
                                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default CategoryList;

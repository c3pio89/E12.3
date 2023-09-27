import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Liststyle.css';  // Предполагается, что у вас есть такой файл для стилей

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/recipes/')  // Используем ваш URL API
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Список рецептов</h1>
      <div className="row">
        {recipes.map(recipe => (
          <div className="col-md-4" key={recipe.id}>
            <div className="card mb-4">
              <img src="image_url_here" className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.ingredients}</p>
                <Link to={`/recipes/${recipe.id}`} className="btn btn-primary">Подробнее</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;

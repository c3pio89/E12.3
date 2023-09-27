from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, RecipeViewSet, CategoryListAPIView, RecipeListAPIView, CategoryDetailAPIView, \
    RecipeCreateAPIView, CategoryCreateAPIView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'recipes', RecipeViewSet, basename='recipe')

urlpatterns = [
    path('', include(router.urls)),
    path('categories_list/', CategoryListAPIView.as_view(), name='category-list'),
    path('recipes/', RecipeListAPIView.as_view(), name='recipe-list'),
    path('categories_detail/<int:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),
]

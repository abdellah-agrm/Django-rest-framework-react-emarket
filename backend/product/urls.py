from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_all_products, name = 'products'),
    path('products/<str:pk>/', views.get_product, name = 'get_product'),
    path('categories/', views.get_categories, name='categories'),
    
    path('products/new', views.new_product, name = 'new_product'),
    path('products/update/<str:pk>/', views.update_product, name = 'update_product'),
    path('products/delete/<str:pk>/', views.delete_product, name = 'delete_product'),

    path('<str:pk>/reviews', views.new_review, name = 'new_review'),
    path('<str:pk>/reviews/delete', views.delete_review, name = 'delete_review'),

    path('myproducts/', views.get_my_products, name = 'get_my_products'),
]
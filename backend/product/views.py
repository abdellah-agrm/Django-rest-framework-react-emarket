# Django Rest framework :
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Review, Category
from django.db.models import Avg
from django.http import JsonResponse

# Django Serializers : 
from .serializers import ProductSerializer, ReviewSerializer
from account.serializers import UserSerializer
# Django Filters :
from .filters import ProductsFilter
# Django Pagination :
from rest_framework.pagination import PageNumberPagination
# Django permissions (+ : from rest_framework.decorators import permission_classes): 
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_products(request):
  filterset = ProductsFilter(request.GET, queryset=Product.objects.all().order_by('id'))
  # Pagination :
  paginator = PageNumberPagination()
  paginator.page_size = 45 # Set the number of items per page as needed

  queryset = paginator.paginate_queryset(filterset.qs, request)
  serializer = ProductSerializer(queryset, many=True)
  # Adds : 
  count = filterset.qs.count()
  return Response({"products":serializer.data, "Number of products":count})

@api_view(['GET'])
def get_product(request, pk):
  product = get_object_or_404(Product, id=pk)
  serializer = ProductSerializer(product, many=False)
  return Response({"product":serializer.data})

def get_categories(request):
    categories = [choice[0] for choice in Category.choices]
    return JsonResponse({'categories': categories})


# Create new product :
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_product(request):
  data = request.data
  serializer = ProductSerializer(data = data)

  if serializer.is_valid():
    product = Product.objects.create(**data, user=request.user)
    res = ProductSerializer(product, many=False)

    return Response({"✅":"The product has been added successfully!", "new product":res.data})
  else:
    return Response(serializer.errors)


# Update product :
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_product(request, pk):
  product = get_object_or_404(Product, id=pk)

  if product.user != request.user :
    return Response({"⛔":"You can not update this product!"},
    status=status.HTTP_403_FORBIDDEN)

  else :
    product.name = request.data['name']
    product.description = request.data['description'] 
    product.price = request.data['price'] 
    product.brand = request.data['brand'] 
    product.category = request.data['category'] 
    product.ratings = request.data['ratings'] 
    product.stock = request.data['stock'] 
    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response({"✅":"The product has been updated successfully!", "updated product":serializer.data})


# Delete product :
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_product(request, pk):
  product = get_object_or_404(Product, id=pk)

  if product.user != request.user :
    return Response({"⛔":"You can not delete this product!"},
    status=status.HTTP_403_FORBIDDEN)
  else :
    product.delete()
    return Response({"✅":"The product has been deleted successfully!"}, 
    status=status.HTTP_200_OK)


# ------------------------------------------------------------------------------------- #
# ###################################### Review ####################################### #
# ------------------------------------------------------------------------------------- #

# Create new review :
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_review(request,pk):
  user = request.user
  product = get_object_or_404(Product, id=pk)
  data = request.data
  review = product.reviews.filter(user=user)

  if data['rating'] <= 0 or data['rating'] > 5 :
    return Response({"⛔":"Please select ratin between 1 to 5!"}, 
    status = status.HTTP_400_BAD_REQUEST)

  elif review.exists():
    new_review = {'rating':data['rating'], 'comment':data['comment']}
    review.update(**new_review)

    rating = product.reviews.aggregate(avg_ratings = Avg('rating'))
    product.ratings = rating['avg_ratings']
    product.save()
    return Response({'✅':'The product review has been updated successfully!'})
  
  else :
    Review.objects.create(
      user = user,
      product = product,
      rating = data['rating'],
      comment = data['comment']
    )
    rating = product.reviews.aggregate(avg_ratings = Avg('rating'))
    product.ratings = rating['avg_ratings']
    product.save()

    return Response({'✅':'The product review has been added successfully!'})


# Delete review :
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_review(request,pk):
  user = request.user
  product = get_object_or_404(Product, id=pk)
  review = product.reviews.filter(user=user)

  if review.exists():
    review.delete()
    rating = product.reviews.aggregate(avg_ratings = Avg('rating'))

    if rating['avg_ratings'] is None :
      rating['avg_ratings'] = 0
      product.ratings = rating['avg_ratings']
      product.save()
      return Response({'✅':'The product review has been deleted successfully!'})

  else :
    return Response({"⛔":"The product review not founded!"},
    status=status.HTTP_404_NOT_FOUND)


# Get the user product :
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_products(request):
  user = UserSerializer(request.user)
  userId = user.data['id']
  products = Product.objects.filter(user_id=userId)
  serializer = ProductSerializer(products, many=True)
  return Response({"my_products":serializer.data})
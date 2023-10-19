import django_filters
from .models import Product

class ProductsFilter(django_filters.FilterSet):
  name = django_filters.CharFilter(lookup_expr='iexact')
  keyword = django_filters.CharFilter(field_name="name", lookup_expr="icontains") # search by name use in part of name
  minPrice = django_filters.NumberFilter(field_name="price" or 0, lookup_expr="gte") # product with price greater than 
  maxPrice = django_filters.NumberFilter(field_name="price" or 10000, lookup_expr="lte") # product with price less than

  class Meta:
    model = Product
    # fields = ['category', 'brand']
    fields = ('category', 'brand', 'keyword', 'minPrice', 'maxPrice')
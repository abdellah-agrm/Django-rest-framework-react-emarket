from django.http import JsonResponse

# exp link : localhost:8000/api/{here}
def handler404(request, exception):
  message = ('This path not found!')
  response = JsonResponse(data={'error':message})
  response.status_code = 404
  return response

# exp link : localhost:8000/api/products/{here}
def handler500(request):
  message = ('This product not found!')
  response = JsonResponse(data={'error':message})
  response.status_code = 500
  return response
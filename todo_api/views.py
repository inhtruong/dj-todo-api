
# import viewsets
from rest_framework import viewsets

# import local data
from .serializers import TodoSerializer
from .models import TodoModel

# create a viewset
class TodoViewSet(viewsets.ModelViewSet):
    # define queryset
    queryset = TodoModel.objects.all()

    # specify serializer to be used
    serializer_class = TodoSerializer
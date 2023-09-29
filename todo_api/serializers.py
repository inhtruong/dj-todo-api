
# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from .models import TodoModel

# Create a model serializer
class TodoSerializer(serializers.HyperlinkedModelSerializer):
    # specify model and fields
    class Meta:
        model = TodoModel
        fields = ('title', 'status', 'date')
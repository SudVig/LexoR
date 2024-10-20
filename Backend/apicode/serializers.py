from rest_framework import serializers
from .models import *

class User_serializer(serializers.ModelSerializer):
    class Meta:
        model=User
        # fields=["name,email"]
        fields='__all__'

class SnippetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippets
        fields = '__all__'

class ProblemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problems
        fields = '__all__'

class TestcaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testcase
        fields = ['tid', 'tinput', 'toutput', 'status', 'pid']

class SolvedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solved
        fields = '__all__'
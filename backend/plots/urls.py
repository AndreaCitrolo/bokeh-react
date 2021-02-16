from django.urls import path

from .views import FlowersView

urlpatterns = [
    path('plots/flowers', FlowersView.as_view(), name='show-flowers'),
]
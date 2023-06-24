from django.urls import path, include
from multifiles_upload.views import DocketViewSet
from rest_framework import routers
app_name = 'multifiles_upload'

router = routers.DefaultRouter(trailing_slash=False)
router.register('docket', DocketViewSet)

urlpatterns = [
] + router.urls
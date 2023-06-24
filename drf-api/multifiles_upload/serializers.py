# Create your tests here.
from multifiles_upload.models import Docket, FileUpload
from rest_framework import serializers


class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        fields = "__all__"


class DocketSerializer(serializers.ModelSerializer):
    files = serializers.ListField(
        child=serializers.FileField(), required=False
    )
    uploaded_items = FileUploadSerializer(read_only=True, many=True)

    class Meta:
        model = Docket
        fields = "__all__"



# class MultipleFileSerializer(serializers.Serializer):
#     files = serializers.ListField(
#         child=serializers.FileField()
#     )

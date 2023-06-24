from multifiles_upload.models import Docket, FileUpload
from multifiles_upload.serializers import DocketSerializer
from rest_framework import viewsets, response, status



class DocketViewSet(viewsets.ModelViewSet):
    queryset = Docket.objects.all()
    serializer_class = DocketSerializer   
    
    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return response.Response(
            {'success': bool(queryset), 'data': serializer.data if queryset else [], 'detail': '' if queryset else 'No datas found.'}, status=status.HTTP_200_OK if queryset else status.HTTP_404_NOT_FOUND)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if not serializer.is_valid(raise_exception=False):
            errors_list = [f"{key}: {value[0]}" for key, value in serializer.errors.items()]
            return response.Response({'success': False, 'detail': errors_list[0]}, status=status.HTTP_400_BAD_REQUEST)
        files = serializer.validated_data.get("files")
        
        print('files -> ', files)
        if files:
            if files_list := [FileUpload(docket=instance, file=file) for file in files]:
                FileUpload.objects.bulk_create(files_list)
        serializer.save()

        return response.Response({'success': True, 'detail': 'Docket updated successfully.', 'data': serializer.data}, status=status.HTTP_200_OK)

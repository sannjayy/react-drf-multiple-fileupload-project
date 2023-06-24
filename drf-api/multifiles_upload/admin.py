from django.contrib import admin

from multifiles_upload.models import Docket, FileUpload

# Register your models here.
admin.site.register(Docket)
admin.site.register(FileUpload)
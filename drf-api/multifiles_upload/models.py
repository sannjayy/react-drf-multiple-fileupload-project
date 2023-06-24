from django.db import models

# Create your models here.


class Docket(models.Model):
    title = models.CharField(max_length=160)

    def __str__(self) -> str:
        return self.title
    


class FileUpload(models.Model):
    docket = models.ForeignKey(Docket, on_delete=models.CASCADE, related_name='uploaded_items')
    file = models.FileField(upload_to='uploads/')

    def __str__(self) -> str:
        return self.docket.title
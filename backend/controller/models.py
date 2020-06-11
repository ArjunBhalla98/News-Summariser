from django.db import models


# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=1000)
    text = models.TextField()
    source = models.CharField(max_length=100)
    link = models.CharField(max_length=500)

    @classmethod
    def create_article(cls, title, text, source, link):
        return cls(title=title, text=text, source=source, link=link)

    def __str__(self):
        return self.title

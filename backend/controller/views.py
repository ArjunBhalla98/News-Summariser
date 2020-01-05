from rest_framework import viewsets
from .serializers import ArticleSerializer
from .models import Article

# Note for self: This is literally just a controller, it handles http reqs and responses
class ArticleView(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        source = self.request.query_params.getlist("source")
        qs = Article.objects.none()

        for src in source:
            qs = qs.union(Article.objects.filter(source=src))

        return qs

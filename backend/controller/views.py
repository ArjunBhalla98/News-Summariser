from rest_framework import viewsets
from .serializers import ArticleSerializer
from .models import Article
from .api_caller import get_data


# Note for self: This is literally just a controller, it handles http reqs and responses
class ArticleView(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        source = self.request.query_params.getlist("source")
        if "hackernews" in source:  # add a condition here for refreshing too
            self.update_hn()

        qs = Article.objects.none()

        for src in source:
            qs = qs.union(Article.objects.filter(source=src))

        return qs.distinct()

    def update_hn(self):
        json_list = get_data(3)  #  placeholder number. should come from req

        for item in json_list:  # Map wasn't working?
            title = item['title']

            try:
                text = item['text']
            except KeyError:
                text = "There is no text body available for this article."

            try:
                link = item['url']
            except KeyError:
                link = "http://www.hackernews.com"

            source = "hackernews"
            self.save_article_to_database(title, text, link, source)

    def save_article_to_database(self, title, text, link, source):
        Article.objects.create(title=title,
                               text=text,
                               source=source,
                               link=link)

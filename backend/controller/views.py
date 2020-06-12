from rest_framework import viewsets
from .serializers import ArticleSerializer
import json
from .models import Article
from django.core import serializers
from .api_caller import get_data, scrape_html_article_tags, get_object_jsons


# Note for self: This is literally just a controller, it handles http reqs and responses
class ArticleView(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer

    def get_queryset(
        self):  # This will need to be rehauled if custom URLs are req'd
        source = self.request.query_params.getlist("source")
        qs = []
        if "hacker news" in source:
            qs += self.get_hn()
            source.remove("hacker news")

        if source != []:
            qs += list(
                map(self.create_article_from_json, get_object_jsons(source)))

        return set(qs)

    def get_hn(self):
        json_list = get_data(3)  #  placeholder number. should come from req
        articles = []
        for item in json_list:  # Map wasn't working?
            title = item['title']

            try:
                text = item['text']
            except KeyError:
                text = "There is no text body available for this article."

            try:
                link = item['url']
            except KeyError:
                link = "http://news.ycombinator.com"

            source = "hackernews"
            a = Article.objects.create(title=title,
                                       text=text,
                                       source=source,
                                       link=link)
            articles.append(a)
        return articles

    def create_article_from_json(self, data):
        obj = json.loads(data)
        return Article.objects.create(title=obj['title'],
                                      text=obj['text'],
                                      source=obj['source'],
                                      link=obj['link'])

    def save_article_to_database(self, title, text, link, source):
        Article.objects.create(title=title,
                               text=text,
                               source=source,
                               link=link)

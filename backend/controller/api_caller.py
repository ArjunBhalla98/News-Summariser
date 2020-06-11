import requests
import json
import bs4
from newsapi import NewsApiClient
from collections import defaultdict

baseurl = "https://hacker-news.firebaseio.com/v0/item/"
story_list_url = "https://hacker-news.firebaseio.com/v0/newstories.json"
API_KEY = "bc221b9c1ead4225bc0d22010397469d"


def get_data(n):
    best_stories = requests.get(story_list_url).json()[:n]
    # HN currently does not support batch calls so this will have to do
    stories_jsons = list(
        map(lambda item: requests.get(baseurl + str(item) + ".json").json(),
            best_stories))

    # When you eventually want to add in the actual shortening of the articles, make a separate controller for
    # calling the respective API caller and document_parser, and doing all the logic for it.
    return stories_jsons


def get_object_jsons(sources_list):
    newsapi = NewsApiClient(api_key=API_KEY)
    source_string = ','.join(
        list(map(lambda x: x.replace(' ', '-'), sources_list)))

    top_headlines = newsapi.get_top_headlines(sources=source_string,
                                              language='en',
                                              page_size=20)

    jsons = []
    counts = defaultdict(int)
    for article in top_headlines['articles']:
        source = article['source']['name']

        if counts[source] < 3:
            title = article['title']
            try:
                text = article['description']
            except:
                text = "No body text available for this article."
            link = article['url']
            new_obj = json.dumps({
                "text": text,
                "source": source,
                "link": link,
                "title": title
            })
            jsons.append(new_obj)
            counts[source] += 1

    return jsons


def scrape_html_article_tags(base_url):
    raw_html = requests.get(base_url).content
    soup = bs4.BeautifulSoup(raw_html)
    articles = soup.find_all('article')
    qs = []

    for article in articles[:2]:  # unrelated number to num of articles
        headline_links = article.find_all('a',
                                          class_='related_story_headline',
                                          href=True)
        source = "el pais"
        for link_tag in headline_links:
            title = link_tag.contents[0]
            link = base_url + link_tag['href'] if "elpais.com" not in link_tag[
                'href'] else link_tag['href']
            text = get_text(link)
            # text = "No text"
            qs.append(
                json.dumps({
                    "title": title,
                    "link": link,
                    "source": source,
                    "text": text
                }))

    return qs


def get_text(link):
    raw_html = requests.get(link).content
    soup = bs4.BeautifulSoup(raw_html)
    div = soup.find('div', {"class": "a_b article_body | color_gray_dark"})
    if div:
        p = div.find('p')
        text = p.getText()  # Because my summarizer works with english
        return text[:text.find(".") + 1]
    else:
        return "No text body is available for this article"
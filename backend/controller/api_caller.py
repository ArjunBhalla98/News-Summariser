import requests

# Just for now, write one that works with hackernews API
baseurl = "https://hacker-news.firebaseio.com/v0/item/"
story_list_url = "https://hacker-news.firebaseio.com/v0/newstories.json"


def get_data(n):
    best_stories = requests.get(story_list_url).json()[:n]
    # HN currently does not support batch calls so this will have to do
    stories_jsons = list(
        map(lambda item: requests.get(baseurl + str(item) + ".json").json(),
            best_stories))

    # When you eventually want to add in the actual shortening of the articles, make a separate controller for
    # calling the respective API caller and document_parser, and doing all the logic for it.
    return stories_jsons
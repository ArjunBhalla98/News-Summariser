import nltk
import os
import re
import math
import operator
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize

nltk.download("averaged_perceptron_tagger")
nltk.download("stopwords")
nltk.download("punkt")
STOPWORDS = set(stopwords.words("english"))
WORDLEMMATIZER = WordNetLemmatizer()


def lemmatize_words(words):
    lemmatized_words = []
    for word in words:
        lemmatized_words.append(WORDLEMMATIZER.lemmatize(word))
    return lemmatized_words


def remove_special_characters(text):
    regex = r"[^a-zA-Z0-9\s]"
    text = re.sub(regex, "", text)
    return text


def get_word_frequency(words):
    """
    Gets frequency of each words in a list of words. Returns a dictionary of these
    frequencies.
    """
    words = [word.lower() for word in words]
    dict_freq = {}
    words_unique = []

    for word in words:
        if word not in words_unique:
            words_unique.append(word)
            dict_freq[word] = 1
        else:
            dict_freq[word] += 1

    return dict_freq


def pos_tagging(text):
    pos_tag = nltk.pos_tag(text.split())
    pos_tagged_noun_verb = []
    allowed_tags = [
        "NN", "NNP", "NNS", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ"
    ]

    for word, tag in pos_tag:
        if tag in allowed_tags:
            pos_tagged_noun_verb.append(word)
    return pos_tagged_noun_verb


def tf_score(word, sentence):
    freq_sum = 0
    word_frequency_in_sentence = 0
    len_sentence = len(sentence)

    for word_in_sentence in sentence.split():
        if word == word_in_sentence:
            word_frequency_in_sentence = word_frequency_in_sentence + 1

    tf = word_frequency_in_sentence / len_sentence
    return tf


def idf_score(no_of_sentences, word, sentences):
    no_of_sentence_containing_word = 0

    for sentence in sentences:
        sentence = remove_special_characters(str(sentence))
        sentence = re.sub(r"\d+", "", sentence)
        sentence = sentence.split()
        sentence = [
            word for word in sentence
            if word.lower() not in STOPWORDS and len(word) > 1
        ]
        sentence = [word.lower() for word in sentence]
        sentence = [WORDLEMMATIZER.lemmatize(word) for word in sentence]
        if word in sentence:
            no_of_sentence_containing_word = no_of_sentence_containing_word + 1
    idf = math.log10(no_of_sentences / no_of_sentence_containing_word)
    return idf


def tf_idf_score(tf, idf):
    return tf * idf


def word_tfidf(dict_freq, word, sentences, sentence):
    word_tfidf = []
    tf = tf_score(word, sentence)
    idf = idf_score(len(sentences), word, sentences)
    tf_idf = tf_idf_score(tf, idf)
    return tf_idf


def sentence_importance(sentence, dict_freq, sentences):
    """
    Calculates the importance of a sentence in the context of the document.
    """
    sentence_score = 0
    sentence = remove_special_characters(str(sentence))
    sentence = re.sub(r"\d+", "", sentence)
    pos_tagged_sentence = []
    no_of_sentences = len(sentences)
    pos_tagged_sentence = pos_tagging(sentence)

    for word in pos_tagged_sentence:
        if word.lower(
        ) not in STOPWORDS and word not in STOPWORDS and len(word) > 1:
            word = word.lower()
            word = WORDLEMMATIZER.lemmatize(word)
            sentence_score = sentence_score + word_tfidf(
                dict_freq, word, sentences, sentence)
    return sentence_score


def get_summary(text, n):
    """
    Returns a summary of the text that is n sentences long.
    """
    # try:
    #     text = text.decode('utf8').encode('ascii', errors='ignore')
    # except:
    #     text = text.encode('ascii', errors='ignore')
    tokenized_sentence = sent_tokenize(text)
    text = remove_special_characters(str(text))
    text = re.sub(r"\d+", "", text)
    tokenized_words_with_stopwords = word_tokenize(text)
    tokenized_words = [
        word for word in tokenized_words_with_stopwords
        if word not in STOPWORDS
    ]
    tokenized_words = [word for word in tokenized_words if len(word) > 1]
    tokenized_words = [word.lower() for word in tokenized_words]
    tokenized_words = lemmatize_words(tokenized_words)
    word_freq = get_word_frequency(tokenized_words)

    c = 0
    sentence_to_importance = {}
    idx_to_sentence = {}

    for sent in tokenized_sentence:
        sentenceimp = sentence_importance(sent, word_freq, tokenized_sentence)
        sentence_to_importance[c] = sentenceimp
        idx_to_sentence[c] = sent
        c = c + 1

    importance_ranked_sentence_idxes = sorted(sentence_to_importance.items(),
                                              key=operator.itemgetter(1),
                                              reverse=True)

    important_sent_idxes_ordered = sorted(
        [i[0] for i in importance_ranked_sentence_idxes[:n]])

    summary = [idx_to_sentence[i] for i in important_sent_idxes_ordered]

    summary = " ".join(summary)
    return summary


if __name__ == "__main__":
    file = "input.txt"
    file = open(file, "r")
    text = file.read()
    get_summary(text, 5)

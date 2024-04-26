import json
import os
import nltk
from nltk import word_tokenize
from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords
import ssl
import requests

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download('all')

signs = "!~@#$%^&*()_+<>?:.,’;[]\\|'\"\'–«‘1234567890'”`“"


def decompose_conceptnet_response(response):
    edges = []

    for edge in response['edges']:
        start = edge['start']['label']
        end = edge['end']['label']
        relation = edge['rel']['label']
        edges.append((start, relation, end))
    return edges


def convert_to_normal_json(raw_data_conceptnet_response):
    nodes = []
    links = []
    for item in raw_data_conceptnet_response:
        source_node = item[0]
        relation = item[1]
        target_node = item[2]

        if source_node not in nodes:
            nodes.append(source_node)
        if target_node not in nodes:
            nodes.append(target_node)

        links.append({"source": source_node, "target": target_node})

    nodes_json = [{"id": node, "name": node, "val": 1} for node in nodes]

    result = {"nodes": nodes_json, "links": links}

    return result


def process_text_conceptnet(raw_data):
    nltk.download('stopwords')
    stop_word = set(stopwords.words('english'))
    for sign in signs:
        stop_word.add(sign)
    sentences = list(set(sent_tokenize(raw_data)))
    for sindex in range(len(sentences)):
        for sign in signs:
            if sign in sentences[sindex]:
                sentences[sindex] = sentences[sindex].replace(sign, ' ')
    for word in stop_word:
        if word in sentences:
            sentences.remove(word)

    sent_words = word_tokenize(sentences[0].lower())
    all_words = ''
    for word in sent_words:
        all_words += word + '&'
    results = requests.get(
        f'http://api.conceptnet.io//query?node=/c/en/{all_words}').json()
    result = decompose_conceptnet_response(results)
    result = convert_to_normal_json(result)
    return result

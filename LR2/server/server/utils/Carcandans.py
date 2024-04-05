from nltk.text import Text
import nltk
import os
import json
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

signs = "!~@#$%^&*()_+<>?:.,;[]\\|'\"\'–«‘1234567890©"

plain_text_path = os.path.join(os.getcwd(), "..", "content")

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words("english"))
for sign in signs:
    stop_words.add(sign)
raw_text_document = open('plaintext.txt', 'r', encoding="utf-8")
raw_text_content = raw_text_document.read()
tokenized_text = [nltk.pos_tag(word_tokenize(
    t)) for t in sent_tokenize(raw_text_content)]
all_words = []
for sentence in tokenized_text:
    for word in sentence:
        all_words.append(word[0])
frequency = nltk.FreqDist(all_words)
dict_of_content = dict()
for sentence in tokenized_text:
    for word in sentence:
        dict_of_content[word[0]] = [lemmatizer.lemmatize(
            word[0]), word[1], frequency[word[0]]]
carcandans = dict()
text = Text(token.lower() for token in word_tokenize(raw_text_content))
for key in frequency.keys():
    if key not in stop_words:
        carcandans[key] = [frequency.get(key), text.concordance_list(key)]
carcandans_file = open('carcandans.json', 'w+', encoding="utf-8")
json_document = open('corpus.json', 'w+', encoding="utf-8")
json.dump(carcandans, carcandans_file, indent=4, ensure_ascii=False)
json.dump(dict_of_content, json_document, indent=4, ensure_ascii=False)
carcandans_file.close()
json_document.close()
raw_text_document.close()

import json
import os
import nltk
from nltk import word_tokenize
from nltk.tokenize import sent_tokenize
import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download('all')

metadata = {
    "CC": "союз",
    "CD": "кардинальное число",
    "DT": "определитель",
    "EX": 'существование там',
    "FW": "иностранное слово",
    "IN": "предлог/подчинительный союз",
    "JJ": 'прилагательное',
    "VP": "глагольная группа",
    "JJR": 'прилагательное, сравнительная степень',
    "JJS": 'прилагательное, превосходная степень',
    "LS": "маркер списка  1)",
    "MD": "модальный глагол сосотавное сказуемое",
    "NN": 'существительное, единственное число',
    "NNS": 'существительное, множественное число',
    "PP": "предложная группа",
    "NNP": 'имя собственное, единственное число',
    "NNPS": 'имя собственное, множественное число',
    "PDT": 'предопределитель',
    "POS": "притяжательное окончание",
    "PRP": "личное местоимение, ",
    "PRP$": "притяжательное местоимение",
    "RB": "наречие",
    "RBR": "наречие, сравнительная степень",
    "RBS": "наречие, превосходная степень",
    "RP": "частица",
    "S": "Простое повествовательное предложение",
    "SBAR": "Предложение, введенное (возможно пустым) подчинительным союзом",
    "SBARQ": "Прямой вопрос, введенный вопросительным словом или вопросительной группой",
    "SINV": "Инвертированное повествовательное предложение, т.е. такое, в котором подлежащее следует за глаголом в прошедшем времени или модальным глаголом.",
    "SQ": "Инвертированный вопрос да/нет, или главное предложение вопроса, следующее за вопросительной группой в SBARQ",
    "SYM": "Символ",
    "VBD": "глагол, прошедшее время",
    "VBG": "глагол, герундий/презенс-партицип  берущий",
    "VBN": "глагол, прошедшее причастие  взятый",
    "VBP": "глагол, настоящее время, ед. число, не 3-е лицо",
    "VBZ": "глагол, настоящее время, 3-е лицо, ед. число",
    "WDT": "вопросительный определитель",
    "WP": "вопросительное местоимение",
    "WP$": "притяжательное вопросительное местоимение",
    "WRB": "вопросительное наречие",
    "TO": 'to',
    "UH": "междометие",
    "VB": "глагол, исходная форма",
}

current_path = os.getcwd()

print(current_path)

current_path_components = current_path.split(os.path.sep)
print(current_path_components)

corpus_path = os.path.join(os.path.sep.join(current_path_components), "content")
print(corpus_path)

corpus = open(os.path.join(corpus_path, "corpus.json"), 'r', encoding='utf-8')
corpus_dict = json.load(corpus)
corpus.close()


class Value:
    morpheme: str
    type: str
    count: int

    def __init__(self, morpheme: str, nltk_type: str, count: int):
        self.morpheme = morpheme
        self.type = nltk_type
        self.count = count


def tokenize(text: str) -> dict:
    words = word_tokenize(text)

    result = dict()

    for word in words:
        if corpus_dict.get(word):
            content = corpus_dict[word]
            if content[1]:
                result[word] = Value(morpheme=content[0], nltk_type=metadata.get(content[1]), count=content[2])

    return result

signs = "!~@#$%^&*()_+<>?:.,’;[]\\|'\"\'–«‘1234567890'”`“"

def process_text(raw_data):
    sentences = sent_tokenize(raw_data)
    for sindex in range(len(sentences)):
        for sign in signs:
            if sign in sentences[sindex]:
                sentences[sindex] = sentences[sindex].replace(sign, ' ')
    sentence_dict = {sentence: [] for sentence in sentences}
    grammar = nltk.RegexpParser('''
    NP: {<DT>?<JJ>*<NN.*>}
    P: {<IN>}           
    V: {<V.*>}          
    PP: {<P> <NP>}      
    VP: {<V> <NP|PP>*}  
    ADJP: {<JJ>}        
    S: {<NP> <VP>}      
    ''')
    for sentence in sentences:
        tree = grammar.parse(nltk.pos_tag(
            word_tokenize(sentence)))
        sentence_dict[sentence].append(tree)
    result = []
    for sentence in sentence_dict.keys():
        result.append((sentence, sentence_dict.get(sentence)))
    return result

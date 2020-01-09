# -*- coding: utf-8 -*-
"""
Created on Sun Dec  9 22:49:03 2018

@author: User
"""

import pandas as pd
df = pd.read_csv('C:\\Users\\User\\Desktop\\FYP\\Get Tweets\\pre-processing\\Tweetsv.csv', header=None,encoding='utf-8')

data = df[0]
labels = df[1]

from sklearn.pipeline import Pipeline
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.model_selection import train_test_split, GridSearchCV
text_clf = Pipeline([('vect', CountVectorizer()),
                     ('tfidf', TfidfTransformer()),
                     ('clf', MultinomialNB())])
tuned_parameters = {
    'vect__ngram_range': [(1, 1), (1, 2), (2, 2)],
    'tfidf__use_idf': (True, False),
    'tfidf__norm': ('l1', 'l2'),
    'clf__alpha': [1, 1e-1, 1e-2]
}


x_train, x_test, y_train, y_test = train_test_split(data, labels, test_size=0.2, random_state=42)

print("Model is being trained!!!")
print("Please Wait....")
from sklearn.metrics import classification_report
clf = GridSearchCV(text_clf, tuned_parameters, cv=10, scoring='accuracy')
print("Reached line 34")
clf.fit(x_train.values.astype('U'), y_train.values.astype('U'))
print("-----DONE-----")
print(classification_report(y_test, clf.predict(x_test), digits=4))
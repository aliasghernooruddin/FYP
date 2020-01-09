import tweepy
import pandas as pd
from credentials import apis
from flask import jsonify,Response
import os 
import firebase_admin
import google.cloud
from firebase_admin import credentials, firestore
from flask_cors import CORS
import json

cred = credentials.Certificate("./firebaseCredentials.json")
FIRESTORE = firebase_admin.initialize_app(cred)

db = firestore.client()


from flask import Flask
app = Flask(__name__)
CORS(app)

@app.route('/getTweets/<username>')
def getTweets(username):
    try:
        #applied list comprehension
        tweets = [user.text for user in tweepy.Cursor(apis.user_timeline, screen_name=username, include_rts=False).items(1000)]
        
        if len(tweets) >= 30:
            df = pd.DataFrame(columns=['Tweets','D','P','R','S','V'])
            df['Tweets'] = tweets

            files = os.listdir('./keywords')
            json = [0,1,2,3,4]
            
            for index,file in enumerate(files):
                json[index] = pd.read_json('./keywords/' + file, typ='series')

            for value,file in enumerate(json):
                for files in zip(file.keys(),file.values):
                    for index,tweets in enumerate(df.Tweets):
                        if files[0].lower() in tweets.lower(): df.iloc[index, [value+1]] = files[1]

            labels = df.iloc[:,1:6].sum()
            total = labels.sum()
        
            final_value = {}
            for value in zip(labels.keys(),labels.values):
                final_value[value[0]] = (value[1]/total) * 100   

            doc_ref = db.collection(u'TwitterData').document(username.lower())
            doc_ref.update({
                u'D': final_value['D'],
                u'P': final_value['P'],
                u'R': final_value['R'],
                u'S': final_value['S'],
                u'V': final_value['V']
            })

            return jsonify(final_value)

        else:
            return Response("Not much data to process")

    except:
        return Response("No Internet Connection or server down")


@app.route('/getData')
def getData():
    docs = db.collection(u'TwitterData').get()

    documents = []
    for doc in docs:
        documents.append(doc.to_dict())

    return json.dumps(documents)

@app.route('/getUserData/<username>')
def getUserData(username):
    doc_ref = db.collection(u'TwitterData').document(username.lower()).get()

    doc = doc_ref.to_dict()
    doc['profilePicture'] = doc['profilePicture'].replace('normal','200x200')
    return json.dumps(doc)
import tweepy #https://github.com/tweepy/tweepy

#Twitter API credentials
consumer_key='6L537g5grVVV7qYaBA65TvWtr'
consumer_secret='fBco2UHMlkD7WHiDMU2R9f4ZSlCUEnBWAFA8vUfnEQst5mj1OZ'
access_key='875362759-cfuXuhiIhdhH3kpKMrL6zyKSJYYnetl4OanSs0K4'
access_secret='CprxuIjjpoqMb48eDYPUq1Mmp7CHqNfJCobzISCADJUvy'

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_key, access_secret)
apis = tweepy.API(auth, wait_on_rate_limit=True)




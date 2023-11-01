from bson import json_util
from flask import Flask, jsonify, render_template
import pymongo
import json

app = Flask(__name__)

# setup mongo connection
serverUrl = "mongodb://localhost:27017"
client = pymongo.MongoClient(serverUrl)

# connect to mongo db (hoobastank) and collection (class)
db = client.genius
song_collection = db.songs


@app.route("/")
def default():
    return render_template('index.html')


@app.route("/api/songs")
def api():
    data = song_collection.find()
    return json_util.dumps(data)


if __name__ == '__main__':
    app.run(debug=True)

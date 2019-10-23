from flask import Flask
from flask import request
import json
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.json_util import dumps
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/assign"
mongo = PyMongo(app)

@app.route('/',methods=['GET'])
def show_items():
    marks=mongo.db.marks.find({})
    return dumps (marks)


@app.route('/sort')
def Sorting():
    page= int(request.args.get("page", 1))
    sort_key = request.args.get("sort", "subject")
    order_by = int(request.args.get("order", "-1"))
    skip_count= (page-1) * 10
    marks = mongo.db.marks.find({}).sort(sort_key, order_by).skip(skip_count).limit(10)
    return dumps (marks)
import json
from flask import Flask, request
from flask_cors import CORS
from pymongo import MongoClient

cluster = MongoClient("mongodb+srv://tatia:tatia@cluster0.fw1ro.mongodb.net/TODOLIST?retryWrites=true&w=majority")
db = cluster["test"]
collection = db["items"]
usersCollection = db["users"]

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})


@app.route('/addUser', methods=["POST"])
def addUser():
    count = 0
    for _ in usersCollection.find({"name": request.json['name']}):
        count += 1

    if count != 0:
        return {"answer": False}
    temp = {"name": request.json['name'], "password": request.json["password"], "mail": request.json["mail"]}
    x = usersCollection.insert_one(temp)
    currId = x.inserted_id
    return {"answer": True, "returnedId": str(currId)}


@app.route('/checkUser', methods=["POST"])
def checkUser():
    userID = 0
    count = 0
    for user in usersCollection.find({"name": request.json['name'], "password": request.json["password"]}):
        count += 1
        userID = user["_id"]
    if count != 0:
        return {"answer": True, "returnedId": str(userID)}
    return {"answer": False}


@app.route('/', methods=["POST"])
def index():
    list = []
    print(request.json["user"])
    for x in collection.find({"user": request.json["user"]}):
        jsonObj = {
            "id": str(x["_id"]),
            "name": x["name"],
            "completed": x["completed"],
            "currentText": x["currentText"],
            "isEditMode": x["isEditMode"]
        }
        list.append(jsonObj)
    return json.dumps(list)


@app.route('/delete', methods=["POST"])
def post():
    id = request.json['id']
    for x in collection.find({}):
        if str(x["_id"]) == id:
            collection.delete_one(x)
    return {"answer": "success"}


@app.route('/add', methods=["POST"])
def addElem():
    name = request.json['name']
    user = request.json['user']
    temp = {"name": name, "completed": False, "currentText": name, "isEditMode": False, "user": user}
    x = collection.insert_one(temp)
    currId = x.inserted_id
    return {"returnedId": str(currId)}


@app.route('/check', methods=["POST"])
def checking():
    currId = request.json['id']
    newElem = request.json['newElem']
    print(newElem)
    for x in collection.find({}):
        if str(x["_id"]) == currId:
            collection.replace_one(
                x,
                {
                    "name": newElem["name"],
                    "completed": newElem["completed"],
                    "currentText": newElem["currentText"],
                    "isEditMode": newElem["isEditMode"],
                    "user": x["user"]
                }
            )
    return {"answer": True}


app.run(debug=True, port=5000)

from flask import Flask, request
from food_calculation import get_all_recommendations
from random import randint
import requests

app= Flask(__name__)

"""
To Do:
Create endpoints for taking recommendation: 
    -> flow 
        -> user sends personal model to endpoint 
        -> process data 
        -> return recommendations
"""
def process_data(data):
    fields = ["carbs", "protein", "sugar", "fat"]
    return_list = []
    for f in fields:
        return_list.append(data[f])
    return return_list

@app.route("/")
def get_status():
    return "running"

@app.route("/getRecommendation/<uid>", methods =["GET"])
def get_recommendation(uid):
    return_json = {}
    list_of_recs = []
    url_string = "http://localhost:3001/db/getPersonalModel/" + uid 
    r = requests.get(url_string)
    data = r.json()["data"]
    personal_model = process_data(data)
    print(personal_model)
    if request.method == "GET":
        data = request.get_json()
        number_of_recs = 10
        recs = get_all_recommendations("food1.tsv", personal_model)
        for i in range(number_of_recs):
            index = randint(0,len(recs))
            try:
                list_of_recs.append(recs[index])
            except:
                pass
        return_json["recommendations"] = list_of_recs
        return return_json
    else:
        return "false"


# http://localhost:3001/db/getPersonalModel/rzNHETzjjvSOpiTHIBuVHYxvdFH3
# rzNHETzjjvSOpiTHIBuVHYxvdFH3
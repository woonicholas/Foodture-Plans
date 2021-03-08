from flask import Flask, request
from food_calculation import get_all_recommendations
from random import randint
app= Flask(__name__)

"""
To Do:
Create endpoints for taking recommendation: 
    -> flow 
        -> user sends personal model to endpoint 
        -> process data 
        -> return recommendations
"""


@app.route("/")
def get_status():
    return "running"

@app.route("/getRecommendation", methods =["POST"])
def get_recommendation():
    return_json = {}
    list_of_recs = []
    if request.method == "POST":
        data = request.get_json()
        personal_model = data["personal_model"]
        number_of_recs = data["number_of_recs"] 
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



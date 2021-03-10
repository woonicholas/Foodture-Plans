import numpy as np 
from scipy import spatial
import csv

### Vector Structure 
# [carbs, fats, protein, sugar ]

''' To Do


# calculate the personal model 
    # take all existing data points and calculate them as a feature vector 
    # average out all the values for the personal model
    # create the feature vector 
# label data source and store it somewhere 
    # for calculations of their vector, need to store the value -> this may take long 
# get best recs from data set 
# return top 50 
# based on diet and calorie count, return necessary 5-10 results 

normalize data 
'''
model_fields = ["product_name", "carbohydrates_100g","proteins_100g","sugars_100g", "fat_100g"]

# extracts the necessary index to clean the data
def extract_data_index(data_field, tsv_list):
    element = 0 
    for item in tsv_list:
        if item == data_field:
            return element 
        element +=1 
    return -1 

def get_data_indices(desired_field_list, master_field_list):
    indices_list = []
    for i in desired_field_list:
        index = 0 
        for j in master_field_list:
            if j == i:
                indices_list.append(index)
            index += 1 
    return indices_list

def extract_item_data(desired_model_fields, indices, item):
    return_item = {}
    item_feature_vector = []
    for i in range(len(indices)):

        if desired_model_fields[i] != "product_name":
            try:
                item_feature_vector.append(float(item[indices[i]]))
                return_item[desired_model_fields[i]] = int(float(item[indices[i]]))
            except:
                return_item[desired_model_fields[i]] = item[indices[i]]
        else:
            return_item[desired_model_fields[i]] = item[indices[i]]


    return_item["feature_vector"] = item_feature_vector 
    return_item["calories"] = item[63]
    return return_item

def calculate_cosine_similarity(personal_vector, item_vector):
    return 1 - spatial.distance.cosine(personal_vector, item_vector)


def build_data_set(file_name, desired_fields):
    tsv_file = open(file_name, encoding="utf8")
    read_tsv = csv.reader(tsv_file, delimiter="\t")
    tsv_to_list = list(read_tsv)
    master_data_fields = tsv_to_list[0]
    model_field_index = get_data_indices(desired_fields, master_data_fields)
    data_set = []
    for item in tsv_to_list[1:]:
        if item[33] == "United States":
            data_set.append(extract_item_data(model_fields, model_field_index, item))
    return data_set

def calculate_recommendation_score(data_set, personal_vector):
    ranking = []
    for i in data_set:
        valid = True
        if len(i["feature_vector"]) != 4:
            valid = False
        if valid:
            score = calculate_cosine_similarity(personal_vector, i["feature_vector"])
            if score > .80:
                ranking.append(i)
    return ranking



def get_all_recommendations(file_name, personal_model):
    model_fields = ["product_name", "carbohydrates_100g","proteins_100g","sugars_100g", "fat_100g"]
    d = build_data_set(file_name, model_fields)
    ranking = calculate_recommendation_score(d, personal_model)

    return ranking

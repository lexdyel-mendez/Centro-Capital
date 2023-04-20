from functions.exc2JSON import exc2JSON, sheetIter
from functions.xlsReq import xlsReq
from backend.handlers.Unemployment import Unemployment_Handler
import flask
from flask import request, Flask, jsonify
from flask_cors import CORS, cross_origin
from backend.mongoflask import MongoJSONEncoder, ObjectIdConverter
from backend.dao.unemployment import Unemployment_DAO
import os

#Creating a path to save our output
path="results/"
if not os.path.exists(path):
    os.makedirs(path)

#First we need to call to the website to make sure the data is updated and fresh
currFilename = xlsReq()

#We have the file, now we need to see how many sheets exist and inside there manage the creation
json_files = exc2JSON(currFilename)

if __name__ == '__main__':
    print(json_files)




# Attempting to update database

# app = Flask(__name__, static_folder="../frontend/centro-capital-frontend/build", static_url_path="/")
# app.json_encoder = MongoJSONEncoder
# app.url_map.converters['objectid'] = ObjectIdConverter
# CORS(app)

# with app.app_context():
#     print(Unemployment_Handler().updateUnemployment(jsonify(json_files)))
#     app.run()

# dao = Unemployment_DAO()
# new_id, timestamp = dao.updateUnemployment(jsonify(json_files))
# print(jsonify(new_id=new_id,insertion_time=timestamp,docs_added=len(jsonify(json_files))))
import flask
from flask import request, Flask
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory
# from handlers.gdp import GDP_Handler
# from handlers.Unemployment import Unemployment_Handler
# from mongoflask import MongoJSONEncoder, ObjectIdConverter

app = Flask(__name__, static_folder="../../frontend/centro-capital-frontend/build", static_url_path="")
# app.json_encoder = MongoJSONEncoder
# app.url_map.converters['objectid'] = ObjectIdConverter
CORS(app)

home = "/centro-capital"
@app.route(home)
@cross_origin()
def index():
    return {"Welcome": "Welcome to Centro Capital!!!"}

@app.route("/")
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


# @app.route(home + "/gdp", methods=['POST','GET', 'DELETE', 'PUT'])
# def gdp_page():
#     """
#     It's a function that handles the GDP data
#     :return: The GDP_Handler is being returned.
#     """
#     # if request.method == "POST":
#     #     return GDP_Handler().insertNewGDP(request.json)
#     if request.method == "GET":
#         if not request.json:
#             return GDP_Handler().getAllGPD()
#         else:
#             return GDP_Handler().getYearlyGPD(request.json)
#     # elif request.method == 'DELETE':
#     #     return GDP_Handler().deleteYearlyGDP(request.json)
#     # elif request.method == 'PUT':
#     #     return GDP_Handler().updateGDPbyYear(request.json)
#     else:
#         return {'Message': 'Failed to Load'}


# @app.route(home +'/updateGDP', methods=['POST'])
# def updateGDP():
#     if request.method == 'POST' and len(request.json) != 0:
#         return GDP_Handler().insertManyGDP(request.json)
#     else:
#         return {'Message': 'Failed to load'}

# @app.route(home + '/unemploymentYearly', methods = ['GET'])
# def getUnemploymentYearly():
#     """
#     This function returns a list of all the unemployment rates for each year in the database
#     :return: A list of all the unemployment data for the year.
#     """
#     if request.method == 'GET':
#         if len(request.json) == 0:
#             return Unemployment_Handler().getAllUnemploymentYearly()
#         else:
#             return Unemployment_Handler().getUnemploymentYear(request.json)
#     else:
#         return {"Message": 'Failed to Load'}

# @app.route(home +'/updateUnemployment', methods=['POST'])
# def updateUnemployment():
#     """
#     This function updates the unemployment data in the database
#     :return: The unemployment rate for a given year.
#     """
#     if request.method == 'POST' and len(request.json) != 0:
#         return Unemployment_Handler().updateUnemployment(request.json)
#     else:
#         return {"Message Error":"Failed to Load"}

if __name__ == '__main__':
    app.run()

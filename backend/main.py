import flask
from flask import request, Flask
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory
from backend.handlers.gdp import GDP_Handler
from backend.handlers.Unemployment import Unemployment_Handler
from backend.mongoflask import MongoJSONEncoder, ObjectIdConverter

from backend.dataSources.bde.functions.exc2JSON import exc2JSON as bdeData
from backend.dataSources.bde.functions.xlsReq import xlsReq

app = Flask(__name__, static_folder="../frontend/centro-capital-frontend/build", static_url_path="/")
app.json_encoder = MongoJSONEncoder
app.url_map.converters['objectid'] = ObjectIdConverter
CORS(app)

home = "/centro-capital"
@app.route(home)
@cross_origin()
def index():
    return {"Welcome": "Welcome to Centro Capital!!!"}

@app.route("/")
@cross_origin()
def serve():
    return app.send_static_file("index.html")


@app.route(home + "/gdp", methods=['GET'])
def gdp_page():
    """
    It's a function that handles the GDP data
    :return: The GDP_Handler is being returned.
    """

    if request.method == "GET":
        if not request.json:
            return GDP_Handler().getAllGPD()
        else:
            return GDP_Handler().getYearlyGPD(request.json)

    else:
        return {'Message': 'Wrong request method. Only GET acceptable'}


@app.route(home +'/updateGDP', methods=['POST'])
def updateGDP():
    if request.method == 'POST' and len(request.json) != 0:
        return GDP_Handler().insertManyGDP(request.json)
    else:
        return {'Message': 'Wrong request method. Only POST acceptable'}

@app.route(home + '/unemploymentYearly', methods = ['GET'])
def getUnemploymentYearly():
    """
    This function returns a list of all the unemployment rates for each year in the database
    :return: A list of all the unemployment data for the year.
    """
    if request.method == 'GET':
        if len(request.json) == 0:
            return Unemployment_Handler().getAllUnemploymentYearly()
        else:
            return Unemployment_Handler().getUnemploymentYear(request.json)
    else:
        return {"Message": 'Wrong request method. Only GET acceptable'}

@app.route(home +'/updateUnemployment', methods=['POST'])
def updateUnemployment(data = bdeData(xlsReq(),'Unemployment Rate')):
    """
    This function updates the unemployment data in the database
    :return: The unemployment rate for a given year.
    """
    if request.method == 'POST' and len(data) != 0:
        if 'Error' not in data.keys():
            # print(data.keys())
            # exit()
            return Unemployment_Handler().updateUnemployment(data)
        else:
            return (data)
    else:
        return {"Message Error":"Wrong request method. Only POST acceptable"}

if __name__ == '__main__':
    app.run(debug=True)

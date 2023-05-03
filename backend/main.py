import flask
import os
from flask import request, Flask
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory
from backend.handlers.gdp import GDP_Handler
from backend.handlers.Unemployment import Unemployment_Handler
from backend.handlers.employment import Employment_Handler
from backend.handlers.comparator import Comparator as CompareHandler
from backend.mongoflask import MongoJSONEncoder, ObjectIdConverter
from whitenoise import WhiteNoise


from backend.handlers.civpop import CivPop_Handler


from backend.dataSources.bde.functions.exc2JSON import exc2JSON as bdeData
from backend.dataSources.bde.functions.xlsReq import xlsReq
port = int(os.environ.get("PORT", 5000))

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
    # return app.send_static_file("index.html")
    return send_from_directory(app.static_folder, 'index.html')



## GDP
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


@app.route(home +'/updateGDP', methods=['POST'])
def updateGDP():
    if request.method == 'POST' and len(request.json) != 0:
        return GDP_Handler().insertManyGDP(request.json)
    else:
        return {'Message': "Can't insert empty data"}

## UNEMPLOYMENT

@app.route(home + '/unemploymentYearly', methods = ['GET'])
def getUnemploymentYearly():
    """
    This function returns a list of all the unemployment rates for each year in the database
    :return: A list of all the unemployment data for the year.
    """
    if request.method == 'GET':
        if len(request.json) != 0:
            return Unemployment_Handler().getUnemploymentYear(request.json)
    else:
        return {"Message": 'Failed to Load'}

@app.route(home + '/allUnemploymentYearly', methods = ['GET'])
def getAllUnemploymentYearly():
    if request.method == 'GET':
        return Unemployment_Handler().getAllUnemploymentYearly()
    else:
        return {"Message": 'Failed to Load'}

@app.route(home +'/updateUnemployment', methods=['POST'])
def updateUnemployment(data = bdeData(xlsReq(),'Unemployment Rate')):
    """
    This function updates the unemployment data in the database
    :return: The unemployment rate for a given year.
    """
    if request.method == 'POST' and len(data) != 0:
        if 'Error' not in data.keys():
            return Unemployment_Handler().updateUnemployment(data)
        else:
            return (data)
    else:
        return {"Message Error":"Can't insert empty data"}


@app.route(home +'/unemployment/stats/',defaults={'stat':None}, methods=['GET'])
@app.route(home +'/unemployment/stats/<stat>', methods=['GET'])
def getUnemploymentStats(stat):
    if request.method =='GET':
        if len(request.json) == 0:
            if stat is None:
                return Unemployment_Handler().getUnemploymentStats()
            else:
                return Unemployment_Handler().getUnemploymentSpecStats(stat)
        # else:
        #     return Unemployment_Handler().getYearUnemploymentStats(request.json)

# EMPLOYMENT

@app.route(home + '/employmentYearly', methods = ['GET'])
def getEmploymentYearly():
    """
    This function returns a list of all the unemployment rates for each year in the database
    :return: A list of all the unemployment data for the year.
    """
    if request.method == 'GET':
        if len(request.json) == 0:
            return Employment_Handler().getAllEmploymentYearly()
        else:
            return Employment_Handler().getEmploymentYear(request.json)

# @app.route(home + '/employmentmean', methods=['GET'])
# def getEmploymentMeanYearly():
#     if request.method == "GET":
#         if len(request.json) == 0:
#             return Employment_Handler().getAllEmploymentMeanYearly()
#         else:
#             return Employment_Handler().getEmploymentMeanByYear(request.json)

@app.route(home +'/updateEmployment', methods=['POST'])
def updateEmployment(data = bdeData(xlsReq(),'Employment Rate ')):
    if request.method == 'POST' and len(data) != 0:
        if 'Error' not in data.keys():
            return Employment_Handler().updateEmployment(data)
        else:
            return {"Error scrapping data":data}

@app.route(home +'/employment/stats/',defaults={'stat':None}, methods=['GET'])
@app.route(home +'/employment/stats/<stat>', methods=['GET'])
def getEmploymentStats(stat):
    if request.method =='GET':
        if len(request.json) == 0:
            if stat is None:
                return Employment_Handler().getEmploymentStats()
            else:
                return Employment_Handler().getEmploymentSpecStats(stat)
        # else:
        #     return Unemployment_Handler().getYearUnemploymentStats(request.json)


## Civilian Pppulation
@app.route(home +'/updateCivPop', methods=['POST'])
def updateCivPopulation(data = bdeData(xlsReq(),'Civilian Population')):
    if request.method == 'POST' and len(data) != 0:
        if 'Error' not in data.keys():
            return CivPop_Handler().updateCivPop(data)
        else:
            return (data)
    else:
        return {"Message Error":"Can't insert empty data"}


@app.route(home + '/populationYearly', methods = ['GET'])
def getPopulationYearly():
    if request.method == 'GET':
        if len(request.json) == 0:
            return CivPop_Handler().getAllPopulationYearly()
        else:
            # return {"Error":"Population by year not implemented"}
            return CivPop_Handler().getPopulationYear(request.json)


@app.route(home + '/population/stats/', defaults={'stat': None}, methods=['GET'])
@app.route(home + '/population/stats/<stat>', methods=['GET'])
def getPopulationStats(stat):
    if request.method == 'GET':
        # if len(request.json) == 0:
        if stat is None:
            return CivPop_Handler().getCivPopStats()
        else:
            return CivPop_Handler().getCivPopSpecStats(stat)

# Employment Total

@app.route(home +'/updateEmploymentTotal', methods=['POST'])
def updateEmploymentTotal(data = bdeData(xlsReq(),'Employment, Total')):
    if request.method == 'POST' and len(data) != 0:
        if 'Error' not in data.keys():
            return Employment_Handler().updateEmploymentTotal(data)
        else:
            return {"Error scrapping data":data}

@app.route(home + '/employmentTotalYearly', methods = ['GET'])
def getEmploymentTotalYearly():
    """
    This function returns a list of all the unemployment rates for each year in the database
    :return: A list of all the unemployment data for the year.
    """
    if request.method == 'GET':
        return Employment_Handler().getAllEmploymentTotalYearly()



#Comparetor
@app.route(home +'/compare/stats/<metric1>/<metric2>',defaults={'stat':None}, methods=['GET'])
@app.route(home +'/compare/stats/<metric1>/<metric2>/<stat>', methods=['GET'])
def compareMetricStats(metric1, metric2, stat):
    if request.method == "GET":
        if stat is None:
            print("Enters the correct main route")
            return CompareHandler().compareAllStats(metric1,metric2)
        else:
            return {"Error":"Individual Years compare not implemented"}
            # return CompareHandler().compareSpecStat(metric1,metric2,stat)


@app.errorhandler(404)
def catch_all(e):
    return serve()


# Serve static files with WhiteNoise
app.wsgi_app = WhiteNoise(app.wsgi_app, root=app.static_folder, index_file='index.html')


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=port, debug=True)
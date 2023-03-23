import flask
from flask import request, Flask
from backend.handlers.gdp import GDP_Handler
from backend.mongoflask import MongoJSONEncoder, ObjectIdConverter

app = Flask(__name__)
app.json_encoder = MongoJSONEncoder
app.url_map.converters['objectid'] = ObjectIdConverter

home = "/centro-capital"
@app.route(home)
def index():
    return flask.jsonify({"Welcome":["Welcome to Centro Capital!!!"]})


@app.route(home + "/gdp", methods=['POST','GET', 'DELETE', 'PUT'])
def gdp_page():
    """
    It's a function that handles the GDP data
    :return: The GDP_Handler is being returned.
    """
    if request.method == "POST":
        return GDP_Handler().insertNewGDP(request.json)
    elif request.method == "GET":
        if not request.json:
            return GDP_Handler().getAllGPD()
        else:
            return GDP_Handler().getYearlyGPD(request.json)
    elif request.method == 'DELETE':
        return GDP_Handler().deleteYearlyGDP(request.json)
    elif request.method == 'PUT':
        return GDP_Handler().updateGDPbyYear(request.json)
    else:
        return {'Message': 'Failed to Load'}

if __name__ == '__main__':
    app.run(debug=True)

from flask import request, Flask
from handlers.gdp import GDP_Handler
from mongoflask import MongoJSONEncoder, ObjectIdConverter

app = Flask(__name__)
app.json_encoder = MongoJSONEncoder
app.url_map.converters['objectid'] = ObjectIdConverter

home = "/centro-capital"
@app.route(home)
def index():
    return 'Welcome to Centro Capital'


@app.route(home + "/gdp", methods=['POST','GET'])
def gdp_page():
    print('Enter gdp Page')
    if request.method == "POST":
        return GDP_Handler().insertNewGDP(request.json)
    elif request.method == "GET":
        if request.args:
            print(request.args)
            return GDP_Handler().getYearlyGPD(request.args)
        else:
            return GDP_Handler().getAllGPD()
    else:
        return {'Message': 'Failed to Load'}

if __name__ == '__main__':
    app.run(debug=True)

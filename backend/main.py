from flask import request, Flask
import pymongo


mongo = pymongo.MongoClient("mongodb+srv://lexdyel-mendez:transitdev08@centro-capital-east.xroqnlt.mongodb.net/?retryWrites=true&w=majority")["centro_capital_dev"]

app = Flask(__name__)


home = "/centro-capital"
@app.route(home)
def index():
    return 'Welcome to Centro Capital'

if __name__ == '__main__':
    app.run(debug=True)
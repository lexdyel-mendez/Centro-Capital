from flask import Flask
from flask_pymongo import PyMongo
import pymongo


app = Flask(__name__)

app.config['MONGO_URI'] = "mongodb+srv://lexdyel-mendez:transitdev08@centro-capital-east.xroqnlt.mongodb.net/?retryWrites=true&w=majority"

# mongo = PyMongo(app)["centro_capital_dev"]
mongo = pymongo.MongoClient("mongodb+srv://lexdyel-mendez:transitdev08@centro-capital-east.xroqnlt.mongodb.net/?retryWrites=true&w=majority")["centro_capital_dev"]


from application import routes
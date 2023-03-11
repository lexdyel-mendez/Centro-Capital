import pymongo
from backend.config.mongo_config import mongo_config


class GDP_DAO:
    def __init__(self, ):
        mongo = pymongo.MongoClient(
            f"mongodb+srv://{mongo_config['user']}:{mongo_config['passwrd']}@centro-capital-east.xroqnlt.mongodb.net/?retryWrites=true&w=majority")[
            mongo_config['dbname']]
        self.gdp_db = mongo.gross_domestic_product

    def add_year_GDP(self, gdp, year):
        new_id = self.gdp_db.insert({
            'gdp_value': gdp,
            'year': year
        })
        return new_id

    def getAllGDP(self):
        docs = []
        cursor = self.gdp_db.find({})
        for doc in cursor:
            # Testing purpose
            # print(doc)
            docs.append(doc)
        return docs

    def getYearlyGDP(self, year):
        doc = self.gdp_db.find_one({'year':year})
        return doc


import pymongo
from backend.config.mongo_config import mongo_config
from datetime import datetime

class Unemployment_DAO:

    def __init__(self, ):
        """
        The function connects to the MongoDB Atlas cluster and returns a database object
        """
        mongo = pymongo.MongoClient(
            f"mongodb+srv://{mongo_config['user']}:{mongo_config['passwrd']}@centro-capital-east.xroqnlt.mongodb.net/?retryWrites=true&w=majority")[
            mongo_config['dbname']]
        self.unemployment_db = mongo.unemployment_rate

    def getAllUnemploymentYearly(self):
        """
        It returns a list of dictionaries, each dictionary containing the unemployment rate for all years
        :return: A list of dictionaries.
        """
        lates_doc = list(self.unemployment_db.find().sort("_id", -1))[0]
        yearly = lates_doc['unemployment_rate_per_year']
        # print (yearly)
        return yearly

    def getUnemploymentByYear(self, year):
        """
        It returns the unemployment rate for a given year

        :param year: The year you want to get the unemployment rate for
        :return: A dictionary with the year as the key and the values as the value.
        """
        lates_doc = list(self.unemployment_db.find().sort("_id", -1))[0]
        # Trying to get the unemployment rate for a given year. If the year is not present in the latest dataset, it
        # returns an error.
        try:
            year_vals = lates_doc['unemployment_rate_per_year'][str(year)]
        except:
            return {"Error": "Year not present in latest Dataset"}
        return {str(year): year_vals}

    def updateUnemployment(self, json):
        """
        It takes a JSON object, adds a timestamp, and inserts it into the database

        :param json: The json object that contains the unemployment data
        :return: The new_id and the insert_time are being returned.
        """
        insert_time = datetime.now()
        data = {'unemployment_rate_per_year':json,'last_updated':insert_time}
        new_id = self.unemployment_db.insert(data)
        return new_id,insert_time



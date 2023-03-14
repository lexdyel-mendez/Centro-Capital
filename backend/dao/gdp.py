import pymongo
from backend.config.mongo_config import mongo_config


class GDP_DAO:

    def __init__(self, ):
        """
        The function connects to the MongoDB Atlas cluster and returns a database object
        """
        mongo = pymongo.MongoClient(
            f"mongodb+srv://{mongo_config['user']}:{mongo_config['passwrd']}@centro-capital-east.xroqnlt.mongodb.net/?retryWrites=true&w=majority")[
            mongo_config['dbname']]
        self.gdp_db = mongo.gross_domestic_product

    def add_year_GDP(self, gdp, year):
        """
        It takes in a GDP value and a year, and inserts a new document into the gdp_db collection

        :param gdp: the GDP value for the year
        :param year: The year of the GDP data
        :return: The id of the new entry in the database.
        """
        new_id = self.gdp_db.insert({
            'gdp_value': gdp,
            'year': year
        })
        return new_id

    def getAllGDP(self):
        """
        This function returns all the documents in the GDP collection
        :return: A list of dictionaries.
        """
        docs = []
        cursor = self.gdp_db.find({})
        for doc in cursor:
            docs.append(doc)
        return docs

    def getYearlyGDP(self, year):
        """
        This function takes in a year and returns the GDP for that year

        :param year: the year you want to get the GDP for
        :return: A dictionary of the GDP data for the given year.
        """
        doc = self.gdp_db.find_one({'year':year})
        return doc

    def deleteYearlyGDP(self, year):
        """
        This function deletes a document from the collection based on the year

        :param year: The year of the GDP data you want to delete
        :return: The delete_id is being returned.
        """
        del_id = self.gdp_db.delete_one({'year':year})
        return del_id

    def updateGDPbyYear(self, year, nGDP):
        """
        The function takes in a year and a new GDP value, and updates the GDP value for that year in the database

        :param year: The year of the GDP data you want to update
        :param nGDP: the new GDP value
        :return: The number of documents updated.
        """
        # Filters the value that we want to update
        filter = {'year': year}
        # Values to be updated.
        newvalues = {"$set": {'gdp': nGDP}}
        doc = self.gdp_db.update_one(filter, newvalues,upsert=False)
        return doc


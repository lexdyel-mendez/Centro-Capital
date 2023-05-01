import pymongo
from backend.config.mongo_config import mongo_config
from datetime import datetime
import numpy as np

class Unemployment_DAO:

    def __init__(self, ):
        """
        The function connects to the MongoDB Atlas cluster and returns a database object
        """
        mongo = pymongo.MongoClient(
            f"mongodb+srv://{mongo_config['user']}:{mongo_config['passwrd']}@centro-capital-east.xroqnlt.mongodb.net/?retryWrites=true&w=majority")[
            mongo_config['dbname']]
        self.unemployment_db = mongo.unemployment_rate
        self.unemployment_meta = mongo.unemployment_rate_metadata

    def getAllUnemploymentYearly(self):
        """
        It returns a list of dictionaries, each dictionary containing the unemployment rate for all years
        :return: A list of dictionaries.
        """
        lates_doc = list(self.unemployment_db.find().sort("_id", -1))[0]
        yearly = lates_doc['unemployment_rate_per_year']
        # print (f"In unemployment dao{yearly=}")
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
        self.fillMetadata(data,new_id)

        return new_id,insert_time

    def getUnemploymentYearMean(self, year):
        lates_doc = self.unemployment_db.find_one(sort=[('_id', -1)])
        # print(lates_doc)
        try:
            year_vals = lates_doc['unemployment_rate_per_year'][str(year)]
        except:
            return {"Error": "Year not present in latest Dataset"}

        # Define the aggregation pipeline
        # pipeline = [
        #     {"$project": {"values": {"$objectToArray": "$unemployment_rate_per_year.2014"}}},
        #     {"$project": {"values": {"$map": {"input": "$values", "as": "item", "in": "$$item.v"}}}},
        #     {"$unwind": "$values"},
        #     {"$group": {"_id": None, "average": {"$avg": "$values"}}}
        # ]

        # Run the aggregation pipeline and get the result
        # result = list(self.unemployment_db.aggregate(pipeline))

        # Using numpy in backend
        result = self.getUnemploymentByYear(year)[f"{year}"].values()
        arr = np.array(list(result))
        # print(np.mean(arr))


        # Print the total average
        # print("Total average:", np.mean(arr))


        return {str(year): np.mean(arr)}

    def fillMetadata(self, data, new_id):
        yearly_rate = data['unemployment_rate_per_year']
        yearly_mean = {}
        yearly_std = {}
        yearly_min = {}
        yearly_max = {}

        for year,months in yearly_rate.items():
            if year.isnumeric():
                arr = np.array(list(months.values()))
                # dictList = list({yearly_rate[year]:yearly_rate[year].values()})
                min_month =min(months, key=lambda k:months[k])
                max_month = max(months, key=lambda k:months[k])
                yearly_min[year] = {min_month:yearly_rate[year][min_month]}
                yearly_max[year] = {max_month: yearly_rate[year][max_month]}
                mean = np.mean(arr)
                std = np.std(arr)
                yearly_mean[year] = mean
                yearly_std[year] = std
        # print((yearly_min))

        doc = {'yearly_mean': yearly_mean,
               'yearly_std': yearly_std,
               'yearly_min':yearly_min,
               'yearly_max':yearly_max,
               '_id': new_id}

        self.unemployment_meta.insert(doc)

    def getUnemploymentStats(self):
        # lates_doc = list(self.unemployment_meta.find().sort("_id", -1))[0]
        # stats = {k:v for k,v in lates_doc.items()}
        # stats.pop("_id")
        # print(stats)
        return self.unemployment_meta.find().sort("_id", -1)

    def getYearUnemploymentStats(self):

        return self.getUnemploymentStats()

    def getUnemploymentSpecStats(self, stat):
        stat_map = {
            'mean':'yearly_mean',
            'std': 'yearly_std',
            'min': 'yearly_min',
            'max': 'yearly_max'
        }

        lates_doc = list(self.unemployment_meta.find().sort("_id", -1))[0]

        # query = {}

        ret_stat = lates_doc[str(stat_map[stat])]
        # print(f'{stat} = {ret_stat}')
        return {stat:ret_stat}



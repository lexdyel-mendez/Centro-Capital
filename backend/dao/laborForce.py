import pymongo
from backend.config.mongo_config import mongo_config
from datetime import datetime
import numpy as np


class LaborForce_DAO:

    def __init__(self, ):
        """
        The function connects to the MongoDB Atlas cluster and returns a database object
        """
        mongo = pymongo.MongoClient(
            f"mongodb+srv://{mongo_config['user']}:{mongo_config['passwrd']}@centro-capital-east.xroqnlt.mongodb.net/?retryWrites=true&w=majority")[
            mongo_config['dbname']]
        self.laborf_db = mongo.laborforce_total
        self.laborf_meta = mongo.laborforce_total_metadata


    def updateLaborForce(self, json):

        insert_time = datetime.now()
        data = {'laborforce_total_per_year': json, 'last_updated': insert_time}
        new_id = self.laborf_db.insert(data)
        self.fillMetadata(data, new_id)

        return new_id, insert_time

    def fillMetadata(self, data, new_id):
        yearly_rate = data['laborforce_total_per_year']
        yearly_mean = {}
        yearly_std = {}
        yearly_min = {}
        yearly_max = {}

        for year, months in yearly_rate.items():
            if year.isnumeric():
                arr = np.array(list(months.values()))
                # dictList = list({yearly_rate[year]:yearly_rate[year].values()})
                min_month = min(months, key=lambda k: months[k])
                max_month = max(months, key=lambda k: months[k])
                yearly_min[year] = {min_month: yearly_rate[year][min_month]}
                yearly_max[year] = {max_month: yearly_rate[year][max_month]}
                mean = np.mean(arr)
                std = np.std(arr)
                yearly_mean[year] = mean
                yearly_std[year] = std
        # print((yearly_min))

        doc = {'yearly_mean': yearly_mean,
               'yearly_std': yearly_std,
               'yearly_min': yearly_min,
               'yearly_max': yearly_max,
               '_id': new_id}

        self.laborf_meta.insert(doc)

    def getLaborForceYearly(self):
        lates_doc = list(self.laborf_db.find().sort("_id", -1))[0]
        yearly = lates_doc['laborforce_total_per_year']
        # print (f"In unemployment dao{yearly=}")
        return yearly

    def getLaborForceStats(self):
        val = self.laborf_meta.find().sort("_id", -1)
        # print(val)
        return val
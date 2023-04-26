import numpy as np
import pymongo
from backend.config.mongo_config import mongo_config
from datetime import datetime

class CivPop_DAO:

    def __init__(self, ):
        """
        The function connects to the MongoDB Atlas cluster and returns a database object
        """
        mongo = pymongo.MongoClient(
            f"mongodb+srv://{mongo_config['user']}:{mongo_config['passwrd']}@centro-capital-east.xroqnlt.mongodb.net/?retryWrites=true&w=majority")[
            mongo_config['dbname']]
        self.civpop_db = mongo.population
        self.civpop_meta = mongo.population_metadata

    def updateCivPop(self, json):
        insert_time = datetime.now()
        data = {'civilian_population_per_year': json, 'last_updated':insert_time}
        new_id = self.civpop_db.insert(data)

        self.fillMetadata(data, new_id)

        return new_id, insert_time

    def fillMetadata(self, data, new_id):

            yearly_rate = data['civilian_population_per_year']
            yearly_mean = {}
            yearly_std = {}
            yearly_min = {}
            yearly_max = {}

            print(f'{yearly_rate=}')
            # exit(3)

            for year, months in yearly_rate.items():
                if year.isnumeric():
                    arr = np.array(list(months.values()))
                    # print(f"{arr=}")
                    min_month = min(months, key=lambda k: months[k])
                    max_month = max(months, key=lambda k: months[k])
                    yearly_min[year] = {min_month: yearly_rate[year][min_month]}
                    yearly_max[year] = {max_month: yearly_rate[year][max_month]}
                    mean = np.mean(arr)
                    std = np.std(arr)
                    yearly_mean[year] = mean
                    # print(f"{yearly_mean=}")
                    yearly_std[year] = std


            doc = {'yearly_mean': yearly_mean,
                   'yearly_std': yearly_std,
                   'yearly_min': yearly_min,
                   'yearly_max': yearly_max,
                   '_id': new_id}

            print(yearly_mean)
            # exit(3)


            self.civpop_meta.insert(doc)

    def getAllPopulationYearly(self):
        lates_doc = list(self.civpop_db.find().sort("_id", -1))[0]
        yearly = lates_doc['civilian_population_per_year']
        # print (yearly)
        return yearly

    def getPopulationYear(self, year):
        lates_doc = list(self.civpop_db.find().sort("_id", -1))[0]
        # Trying to get the employment rate for a given year. If the year is not present in the latest dataset, it
        # returns an error.
        try:
            year_vals = lates_doc['civilian_population_per_year'][str(year)]
        except:
            return {"Error": "Year not present in latest Dataset"}
        print(year_vals)
        return {str(year): year_vals}

    def getPopulationStats(self):
        # print(f"{self.civpop_meta.find().sort('_id', -1)}")
        # exit()
        return self.civpop_meta.find().sort('_id', -1)

    def getPopulationSpecStats(self, stat):
        stat_map = {
            'mean': 'yearly_mean',
            'std': 'yearly_std',
            'min': 'yearly_min',
            'max': 'yearly_max'
        }

        lates_doc = list(self.civpop_meta.find().sort("_id", -1))[0]

        # query = {}

        ret_stat = lates_doc[str(stat_map[stat])]
        print(f'{stat} = {ret_stat}')
        return {stat: ret_stat}
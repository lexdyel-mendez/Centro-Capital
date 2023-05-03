import numpy as np
import pymongo
from backend.config.mongo_config import mongo_config
from datetime import datetime

class Employment_DAO:

    def __init__(self, ):
        """
        The function connects to the MongoDB Atlas cluster and returns a database object
        """
        mongo = pymongo.MongoClient(
            f"mongodb+srv://{mongo_config['user']}:{mongo_config['passwrd']}@centro-capital-east.xroqnlt.mongodb.net/?retryWrites=true&w=majority")[
            mongo_config['dbname']]
        self.employment_db = mongo.employment_rate
        self.employment_meta = mongo.employment_rate_metadata
        self.employmentTotal_db = mongo.employment_total
        self.employmentTotal_meta = mongo.employment_total_metadata

    def updateEmployment(self, json):
        insert_time = datetime.now()
        data = {'employment_rate_per_year': json, 'last_updated': insert_time}
        new_id = self.employment_db.insert(data)
        self.fillMetadata(data,new_id)

        return new_id, insert_time
    
    def getAllEmploymentYearly(self):
        """
        It returns a list of dictionaries, each dictionary containing the employment rate for all years
        :return: A list of dictionaries.
        """
        lates_doc = list(self.employment_db.find().sort("_id", -1))[0]
        yearly = lates_doc['employment_rate_per_year']
        # print (yearly)
        return yearly

    def getEmploymentByYear(self, year):
        """
        It returns the employment rate for a given year

        :param year: The year you want to get the employment rate for
        :return: A dictionary with the year as the key and the values as the value.
        """
        lates_doc = list(self.employment_db.find().sort("_id", -1))[0]
        # Trying to get the employment rate for a given year. If the year is not present in the latest dataset, it
        # returns an error.
        try:
            year_vals = lates_doc['employment_rate_per_year'][str(year)]
        except:
            return {"Error": "Year not present in latest Dataset"}
        return {str(year): year_vals}


    def fillMetadata(self, latest_data, latest_id):
        yearly_rate = latest_data['employment_rate_per_year']
        yearly_mean = {}
        yearly_std = {}
        yearly_min = {}
        yearly_max = {}

        for year,months in yearly_rate.items():
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

        doc = {'yearly_mean':yearly_mean,
               'yearly_std':yearly_std,
               'yearly_min': yearly_min,
               'yearly_max': yearly_max,
               '_id':latest_id}


        self.employment_meta.insert(doc)
        # print(f'{yearly_rate=}')

    def getEmploymentMeanYearly(self):
        lates_doc = list(self.employment_meta.find().sort("_id", -1))[0]
        yearly = lates_doc['yearly_mean']
        # print (yearly)
        return yearly

    def getEmploymentMeanByYear(self, year):
        lates_doc = list(self.employment_meta.find().sort("_id", -1))[0]
        yearly = lates_doc['yearly_employment_mean'][str(year)]
        # print (yearly)
        return {str(year):yearly}

    def getEmploymentStats(self):
        # lates_doc = list(self.employment_meta.find().sort("_id", -1))[0]
        # stats = {k: v for k, v in lates_doc.items()}
        # stats.pop("_id")
        # print(stats)
        return self.employment_meta.find().sort("_id", -1)

    def getEmploymentSpecStats(self, stat):
        stat_map = {
            'mean': 'yearly_mean',
            'std': 'yearly_std',
            'min': 'yearly_min',
            'max': 'yearly_max'
        }

        lates_doc = list(self.employment_meta.find().sort("_id", -1))[0]

        # query = {}

        ret_stat = lates_doc[str(stat_map[stat])]
        # print(f'{stat} = {ret_stat}')
        return {stat: ret_stat}

# Employment Total

    def updateEmploymentTotal(self, json):
        insert_time = datetime.now()
        data = {'employment_total_per_year': json, 'last_updated': insert_time}
        new_id = self.employmentTotal_db.insert(data)
        self.TotalfillMetadata(data, new_id)

        return new_id, insert_time

    def TotalfillMetadata(self, latest_data, latest_id):
        yearly_rate = latest_data['employment_total_per_year']
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
               '_id': latest_id}

        self.employmentTotal_meta.insert(doc)

    def getAllEmploymentTotalYearly(self):
        lates_doc = list(self.employmentTotal_db.find().sort("_id", -1))[0]
        # print(lates_doc)
        yearly = lates_doc['employment_total_per_year']
        # print (yearly)
        return yearly

    def getEmploymentTotalStats(self):
        return self.employmentTotal_meta.find().sort('_id', -1)

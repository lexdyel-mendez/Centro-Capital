from backend.dao.unemployment import Unemployment_DAO
from flask import jsonify

class Unemployment_Handler:

    def getAllUnemploymentYearly(self):
        """
        It takes in a year, and returns the unemployment rate for all years
        :return: The unemployment rate for each year.
        """
        dao = Unemployment_DAO()
        docs = dao.getAllUnemploymentYearly()
        return jsonify(docs)

    def getUnemploymentYear(self, json):
        """
        This function takes in a year and returns the unemployment data for that year

        :param json: a dictionary containing the year
        :return: A list of dictionaries.
        """
        year = json['year']
        dao = Unemployment_DAO()
        docs = dao.getUnemploymentByYear(year)
        return docs

    def updateUnemployment(self, json):
        """
        It takes a JSON object, passes it to the DAO, and returns a JSON object with the new ID, timestamp, and number of
        documents added

        :param json: a list of dictionaries, each of which contains the following keys:
        :return: The new_id, timestamp, and docs_added are being returned.
        """
        dao = Unemployment_DAO()
        new_id, timestamp = dao.updateUnemployment(json)
        return jsonify(new_id=new_id,insertion_time=timestamp,docs_added=len(json))

    def getUnemploymentYearMean(self,json):
        year = json['year']
        dao = Unemployment_DAO()
        mean = dao.getUnemploymentYearMean(year)
        return jsonify(unemployment_rate_year_average=mean)

    def getUnemploymentStats(self):
        dao = Unemployment_DAO()
        stats = list(dao.getUnemploymentStats())[0]
        return jsonify(Unemployment_Stadistics=stats)

    def getYearUnemploymentStats(self, json):
        try:
            year = json['year']
        except:
            return jsonify(Error = "No year Specified")

        dao = Unemployment_DAO()
        stats = dao.getYearUnemploymentStats()
        return jsonify(Unemployment_Year_Stadistics=stats)

    def getUnemploymentSpecStats(self, stat):
        dao = Unemployment_DAO()

        stat = dao.getUnemploymentSpecStats(stat)

        return jsonify(Unemployment_Specific_Stat=stat)


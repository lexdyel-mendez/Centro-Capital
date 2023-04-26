from backend.dao.employment import Employment_DAO
from flask import jsonify

class Employment_Handler:

    def getAllEmploymentYearly(self):
        """
        It takes in a year, and returns the unemployment rate for all years
        :return: The unemployment rate for each year.
        """
        dao = Employment_DAO()
        docs = dao.getAllEmploymentYearly()
        return jsonify(docs)

    def getEmploymentYear(self, json):
        """
        This function takes in a year and returns the unemployment data for that year

        :param json: a dictionary containing the year
        :return: A list of dictionaries.
        """
        year = json['year']
        dao = Employment_DAO()
        docs = dao.getEmploymentByYear(year)
        return jsonify(Employment_by_Year=docs)

    def updateEmployment(self, json):
        """
        It takes a JSON object, passes it to the DAO, and returns a JSON object with the new ID, timestamp, and number of
        documents added

        :param json: a list of dictionaries, each of which contains the following keys:
        :return: The new_id, timestamp, and docs_added are being returned.
        """
        dao = Employment_DAO()
        new_id, timestamp = dao.updateEmployment(json)
        return jsonify(new_id=new_id,insertion_time=timestamp,docs_added=len(json))

    def getAllEmploymentMeanYearly(self):
        dao = Employment_DAO()
        docs = dao.getEmploymentMeanYearly()
        return jsonify(Yearly_Employment_Mean=docs)

    def getEmploymentMeanByYear(self, json):
        year = json['year']
        dao = Employment_DAO()
        docs = dao.getEmploymentMeanByYear(year)
        return jsonify(Employment_Mean_by_Year=docs)

    def getEmploymentStats(self):
        dao = Employment_DAO()
        stats = list(dao.getEmploymentStats())[0]
        return jsonify(Employment_Stadistics=stats)

    def getEmploymentSpecStats(self, stat):
        dao = Employment_DAO()

        stat = dao.getEmploymentSpecStats(stat)

        return jsonify(Employment_Specific_Stat=stat)

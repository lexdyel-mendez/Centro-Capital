from backend.dao.civilianpopulation import CivPop_DAO
from flask import jsonify

class CivPop_Handler:

    def getAllPopulationYearly(self):
        dao = CivPop_DAO()
        docs = dao.getAllPopulationYearly()
        return jsonify(docs)

    def getPopulationYear(self, json):
        """
        This function takes in a year and returns the unemployment data for that year

        :param json: a dictionary containing the year
        :return: A list of dictionaries.
        """
        year = json['year']
        dao = CivPop_DAO()
        docs = dao.getPopulationYear(year)
        return jsonify(Population_by_Year=docs)

    def updateCivPop(self, json):
        """
        It takes a JSON object, passes it to the DAO, and returns a JSON object with the new ID, timestamp, and number of
        documents added

        :param json: a list of dictionaries, each of which contains the following keys:
        :return: The new_id, timestamp, and docs_added are being returned.
        """
        dao = CivPop_DAO()
        new_id, timestamp = dao.updateCivPop(json)
        return jsonify(new_id=new_id,insertion_time=timestamp,docs_added=len(json))

    def getCivPopStats(self):
        dao = CivPop_DAO()
        stats = list(dao.getPopulationStats())[0]
        print(f"{stats=}")
        # exit()
        return jsonify(Population_Stadistics=stats)

    def getCivPopSpecStats(self, stat):
        dao = CivPop_DAO()

        stat = dao.getPopulationSpecStats(stat)

        return jsonify(Population_Specific_Stat=stat)






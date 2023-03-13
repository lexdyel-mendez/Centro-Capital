from backend.dao.gdp import GDP_DAO
from flask import jsonify

class GDP_Handler:
    def build_gdp_args(self,obj_id,gdp,year):
        """
        It takes in the parameters of obj_id, gdp, and year and returns a dictionary with the keys of obj_id, gdp, and year.

        :param obj_id: The id of the object you want to update
        :param gdp: The GDP of the country
        :param year: The year of the GDP data
        :return: A dictionary with the keys obj_id, gdp, and year.
        """
        result = {}
        result["obj_id"] = obj_id
        result["gdp"] = gdp
        result["year"] = year
        return result

    def insertNewGDP(self, json):
        """
        This function takes in a JSON object and checks if the object has the required attributes. If it does, it creates a
        new GDP object and adds it to the database

        :param json: the json object that contains the information for the new GDP
        :return: a json object with the new GDP and the status code 201.
        """
        gdp = json["gdp"]
        year = json["year"]
        if gdp and year:
            dao = GDP_DAO()
            doc_id = dao.add_year_GDP(gdp,year)
            saved_gdp = self.build_gdp_args(str(doc_id),gdp,year)
            return jsonify(New_GDP = saved_gdp), 201
        else:
            return jsonify(Error="Unexpected attributes in post request"), 400

    def getAllGPD(self):
        """
        It gets all the GDP data from the database and returns it as a JSON object
        :return: A list of dictionaries.
        """
        dao = GDP_DAO()
        docs = dao.getAllGDP()
        return jsonify(docs)

    def getYearlyGPD(self, json):
        """
        This function takes in a year and returns the GDP for that year

        :param json: a dictionary containing the attributes of the JSON body
        :return: The GDP for the given year.
        """
        year = json['year']
        if year:
            dao = GDP_DAO()
            doc = dao.getYearlyGDP(year)
            return jsonify(doc)
        else:
            return jsonify(Error="Unexpected attributes in post request"), 400

    def deleteYearlyGDP(self, json):
        """
        This function deletes a GDP entry from the database based on the year

        :param json: a dictionary containing the year of the GDP to be deleted
        :return: The GDP_DAO is returning the GDP for the year that was inputted.
        """
        year = json['year']
        if year and self.getYearlyGPD(json):
            dao = GDP_DAO()
            dao.deleteYearlyGDP(year)
            return jsonify(DeleteStatus="OK"), 200
        else:
            return jsonify(Error="GDP Year not found"), 404

    def updateGDPbyYear(self, json):
        year = json['year']
        nGDP = json['gdp']
        dao = GDP_DAO()
        print(isinstance(dao.getYearlyGDP(year), None))
        doc_id = dao.getYearlyGDP(year)['_id']

        if year and self.getYearlyGPD(json):

            dao.updateGDPbyYear(year,nGDP)
            updt_gdp = self.build_gdp_args(str(doc_id),nGDP,year)
            return jsonify(updt_gdp), 200
        else:
            return jsonify(Error="GDP Year not found"), 404




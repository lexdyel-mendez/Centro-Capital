from backend.dao.gdp import GDP_DAO
from flask import jsonify

class GDP_Handler:
    def build_gdp_args(self,obj_id,gdp,year):
        result = {}
        result["obj_id"] = obj_id
        result["gdp"] = gdp
        result["year"] = year
        return result

    def insertNewGDP(self, json):
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
        dao = GDP_DAO()
        docs = dao.getAllGDP()
        return jsonify(docs)

    def getYearlyGPD(self, args):
        year = args['year']
        if year:
            dao = GDP_DAO()
            doc = dao.getYearlyGDP(year)
            return jsonify(doc)
        else:
            return jsonify(Error="Unexpected attributes in post request"), 400



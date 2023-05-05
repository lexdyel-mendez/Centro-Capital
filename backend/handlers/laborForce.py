from backend.dao.laborForce import LaborForce_DAO
from flask import jsonify

class LaborForce_Handler:


    def updateLaborForce(self, json):
        dao = LaborForce_DAO()
        new_id, timestamp = dao.updateLaborForce(json)
        return jsonify(new_id=new_id, insertion_time=timestamp, docs_added=len(json))

    def getLaborForceYearly(self):
        dao = LaborForce_DAO()
        docs = dao.getLaborForceYearly()
        return jsonify(LaborForce_Yearly=docs)

    def getLaborForceStats(self):
        dao = LaborForce_DAO()
        stats = list(dao.getLaborForceStats())[0]
        return jsonify(LaborForce_Stadistics=stats)

from backend.dao.unemployment import Unemployment_DAO
from backend.dao.employment import Employment_DAO
from flask import jsonify


class Comparator:


    def compareAllStats(self, metric1, metric2):

        metric_map = {
            'unmplmnt':Unemployment_DAO().getUnemploymentStats(),
            'emplmnt':Employment_DAO().getEmploymentStats()

        }

        metric1_stats = metric_map[metric1]
        metric2_stats = metric_map[metric2]

        print(f'{metric1_stats=}')
        print(f'{metric2_stats=}')

        return {"Error":"Method in implementation"}
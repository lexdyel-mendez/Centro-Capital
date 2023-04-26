from backend.dao.unemployment import Unemployment_DAO
from backend.dao.employment import Employment_DAO
from backend.dao.civilianpopulation import CivPop_DAO
from flask import jsonify


class Comparator:


    def compareAllStats(self, metric1, metric2):

        metric_map = {
            'unmplmnt':list(Unemployment_DAO().getUnemploymentStats())[0],
            'emplmnt':list(Employment_DAO().getEmploymentStats())[0],
            'civpop':list(CivPop_DAO().getPopulationStats())[0]
        }

        try:
            metric1_stats = metric_map[metric1]
        except:
            return {"Error": f"Metric {metric1} not in database try {metric_map.keys()}"}
        try:
            metric2_stats = metric_map[metric2]
        except:
            return {"Error": f"Metric {metric2} not in database try {metric_map.keys()}"}

        # print(f'{metric1_stats=}')
        # print(f'{metric2_stats=}')

        return jsonify(Metric_1={str(metric1):metric1_stats},Metric2={str(metric2):metric2_stats})

    def compareSpecStat(self, metric1, metric2, stat):


        metric_map = {
            'unmplmnt': list(Unemployment_DAO().getUnemploymentSpecStats(stat).values()),
            'emplmnt': list(Employment_DAO().getEmploymentSpecStats(stat).values()),
            'civpop': list(CivPop_DAO().getPopulationSpecStats(stat).values())
        }

        try:
            metric1_stats = metric_map[metric1]
        except:
            return {"Error":f"Metric {metric1} not in database try {metric_map.keys()}"}
        try:
            metric2_stats = metric_map[metric2]
        except:
            return {"Error": f"Metric {metric2} not in database try {metric_map.keys()}"}

        # print(f'{metric1} stats: {metric1_stats}')
        # print(f'{metric2} stats: {metric2_stats}')

        return jsonify(Compare_Specific={metric1:metric1_stats,metric2:metric2_stats}, Metric=stat)



from backend.dao.unemployment import Unemployment_DAO
from backend.dao.employment import Employment_DAO
from backend.dao.civilianpopulation import CivPop_DAO
from flask import jsonify


class Comparator:


    def compareAllStats(self, metric1, metric2):

        match metric1:
            case 'unmplmnt':
                metric1_stats = list(Unemployment_DAO().getAllUnemploymentYearly().items())[:-3]
            case 'emplmnt':
                metric1_stats = list(Employment_DAO().getAllEmploymentYearly().items())[:-3]
            case 'civpop':
                metric1_stats = list(CivPop_DAO().getAllPopulationYearly().items())[:-3]
            case 'emplmntTot':
                metric1_stats = list(Employment_DAO().getAllEmploymentTotalYearly().items())[:-3]
            case _:
                return {"Error": "Metric one not present in database"}

        match metric2:
            case 'unmplmnt':
                metric2_stats = list(Unemployment_DAO().getAllUnemploymentYearly().items())[:-3]
            case 'emplmnt':
                metric2_stats = list(Employment_DAO().getAllEmploymentYearly().items())[:-3]
            case 'civpop':
                metric2_stats = list(CivPop_DAO().getAllPopulationYearly().items())[:-3]
            case 'emplmntTot':
                metric2_stats = list(Employment_DAO().getAllEmploymentTotalYearly().items())[:-3]
            case _:
                return {"Error": "Metric two not present in database"}



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

        return jsonify(Compare_Specific={metric1:metric1_stats,metric2:metric2_stats}, Metric=stat)

        #
        # metric1_stats = metric_map[metric1]
        # metric2_stats = metric_map[metric2]
        #
        # print(f'{list(metric1_stats)=}')
        # print(f'{list(metric2_stats)=}')
        #
        # return jsonify(Metric_1={str(metric1): metric1_stats}, Metric2={str(metric2): metric2_stats})
        #
        #

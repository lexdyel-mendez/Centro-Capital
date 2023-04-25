from backend.dao.unemployment import Unemployment_DAO
from backend.dao.employment import Employment_DAO
from flask import jsonify


class Comparator:


    def compareAllStats(self, metric1, metric2):

        metric_map = {
            'unmplmnt':list(Unemployment_DAO().getUnemploymentStats())[0],
            'emplmnt':list(Employment_DAO().getEmploymentStats())[0]
        }

        metric1_stats = metric_map[metric1]
        metric2_stats = metric_map[metric2]

        print(f'{metric1_stats=}')
        print(f'{metric2_stats=}')

        return jsonify(Metric_1={str(metric1):metric1_stats},Metric2={str(metric2):metric2_stats})

    def compareSpecStat(self, metric1, metric2, stat):

        metric_map = {
            'unmplmnt': list(Unemployment_DAO().getUnemploymentSpecStats(stat).values()),
            'emplmnt': list(Employment_DAO().getEmploymentSpecStats(stat).values())
        }

        print(f'{len(metric_map[metric1])=}')

        return jsonify(Compare_Specific={'metric':stat,metric1:metric_map[metric1],metric2:metric_map[metric2] })

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

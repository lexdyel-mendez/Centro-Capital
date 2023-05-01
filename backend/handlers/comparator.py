from backend.dao.unemployment import Unemployment_DAO
from backend.dao.employment import Employment_DAO
from backend.dao.civilianpopulation import CivPop_DAO
from flask import jsonify


class Comparator:


    def compareAllStats(self, metric1, metric2):

        # yearly_monthly = {year: list(daoyearly[year].values())[:-3] for year in daoyearly}
        # print({year : Unemployment_DAO().getAllUnemploymentYearly()[year] for year in Unemployment_DAO().getAllUnemploymentYearly().keys()})
        # exit(1)

        # metric_map = {
        #     'unmplmnt': {year : Unemployment_DAO().getAllUnemploymentYearly()[year] for year in list(Unemployment_DAO().getAllUnemploymentYearly().keys())[:-3]},
        #     'emplmnt':{year : Employment_DAO().getAllEmploymentYearly()[year] for year in list(Employment_DAO().getAllEmploymentYearly().keys())[:-3]},
        #     'civpop':{year : CivPop_DAO().getAllPopulationYearly()[year] for year in list(CivPop_DAO().getAllPopulationYearly().keys())[:-3]}
        # }

        match metric1:
            case 'unmplmnt':
                # metric1_stats = {year : Unemployment_DAO().getAllUnemploymentYearly()[year] for year in list(Unemployment_DAO().getAllUnemploymentYearly().keys())[:-3]}
                metric1_stats = list(Unemployment_DAO().getAllUnemploymentYearly().items())[:-3]
            case 'emplmnt':
                # metric1_stats = {year : Employment_DAO().getAllEmploymentYearly()[year] for year in list(Employment_DAO().getAllEmploymentYearly().keys())[:-3]}
                metric1_stats = list(Employment_DAO().getAllEmploymentYearly().items())[:-3]
            case 'civpop':
                # metric1_stats = {year : CivPop_DAO().getAllPopulationYearly()[year] for year in list(CivPop_DAO().getAllPopulationYearly().keys())[:-3]}
                metric1_stats = list(CivPop_DAO().getAllPopulationYearly().items())[:-3]
            case _:
                return {"Error": "Metric one not present in database"}

        match metric2:
            case 'unmplmnt':
                # metric2_stats = {year : Unemployment_DAO().getAllUnemploymentYearly()[year] for year in list(Unemployment_DAO().getAllUnemploymentYearly().keys())[:-3]}
                metric2_stats = list(Unemployment_DAO().getAllUnemploymentYearly().items())[:-3]
            case 'emplmnt':
                # metric2_stats = {year : Employment_DAO().getAllEmploymentYearly()[year] for year in list(Employment_DAO().getAllEmploymentYearly().keys())[:-3]}
                metric2_stats = list(Employment_DAO().getAllEmploymentYearly().items())[:-3]
            case 'civpop':
                # metric2_stats = {year : CivPop_DAO().getAllPopulationYearly()[year] for year in list(CivPop_DAO().getAllPopulationYearly().keys())[:-3]}
                metric2_stats = list(CivPop_DAO().getAllPopulationYearly().items())[:-3]
            case _:
                return {"Error": "Metric two not present in database"}



        print(f'{metric1_stats=}')
        print(f'{metric2_stats=}')

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
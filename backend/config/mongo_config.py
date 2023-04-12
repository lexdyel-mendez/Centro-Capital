#Database configuration settings
import os
# mongo_config = {
#     'user':'lexdyel-mendez',
#     'passwrd':'transitdev08',
#     'dbname':"centro_capital_dev"
# }

mongo_config = {
    'user':os.getenv("MONGO_USER"),
    'passwrd':os.getenv("MONGO_PASS"),
    'dbname':os.getenv('MONGO_DBNAME')
}
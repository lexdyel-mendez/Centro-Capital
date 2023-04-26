#Database configuration settings
import os

mongo_config = {
    'user':'lexdyel-mendez',
    'passwrd':'transitdev08',
    'dbname':"centro_capital_dev"
}

# mongo_config = {
#     'user':os.environ.get('MONGO_USER', None),
#     'passwrd':os.environ.get("MONGO_PASS", None),
#     'dbname':os.environ.get('MONGO_DBNAME', None)
# }
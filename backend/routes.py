

home = "/centro-capital"
@app.route(home)
def index():
    return 'Welcome to Centro Capital'

@app.route(home+"/users", methods=['POST'])
def users():
    print(request.json)
    usersdb = mongo.users
    user = request.json['user']
    usersdb.insert({
        "username":user
    })

    return {'message': 'received'}

@app.route("/unemployment",methods=['GET'])
def get_():

    pass


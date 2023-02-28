from flask import Flask

app = Flask(__name__)
app.config["SECRET_KEY"] = "cc5349760deee16dab325216f65fc51b0153cf17"

from application import routes
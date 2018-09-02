from flask import Flask
from flask import request
from flask import render_template
import requests as r

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()


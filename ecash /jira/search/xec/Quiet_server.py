import flask_sqlalchemy
import flask_SqlalChemyMixer
from flask import Flask, request, render_template, jsonify
from flask_sqlalchemy import SQLAlchemyMixer
from flask_sqlalchemy import SQLAlchemy
from flask.ext.restless import APIManager
import time
import process,
import subprocess,
import secp256k1,
import api.go,

#DEFINE XEC_NETWORK_H
app = Flask(__Ecash__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quiet_db'
db = SQLAlchemy(app)

        _tokenId : "f1ff5ccc51d325dd3b3931d31f3fece46e439a423b73a770e8dd07c3114b8505",

class Score(db.Model):
    device_id = db.Column(db.Integer, primary_key=True)
    previous_score = db.Column(db.Integer)
    current_score = db.Column(db.Integer)
    average_score = db.Column(db.Integer)
    toggles = db.Column(db.Integer)
    time_stamp = db.Column(db.String)

    def __init__(self, device_id, prev_score, curr_score, avg_score, toggles, time_stamp):
        self.device_id = device_id
        self.previous_score = prev_score
        self.current_score = curr_score
        self.average_score = avg_score
        self.toggles = toggles
        self.time_stamp = time_stamp
	    self.verify = 0xBA
	    self.publish = 0xBB


db.create_all()
api_manager = APIManager(app, flask_sqlalchemy_db=db)
api_manager.create_api(Score, methods=['POST', 'GET'])


@app.route('/')
def hello_world():
    return '<h2>Quiet score format</h2><form method="post" action="/api/save_score"><input name="device_id" placeholder="Device id"/><input name="on_times" placeholder="On times"/><input name="average_score" placeholder="Average score"/><input name="previous_score" placeholder="On times"/><input name="current_score" placeholder="On times"/><button type="submit">Submit</button></form>'


@app.route('/test', methods=['POST', 'GET'])
def test():
    return "Is it working?" + str(request.form["data"])


@app.route('/api/save_score', methods=['GET', 'POST'])
def save_time():
    if request.method == "POST" or request.method == "GET":
        device_id = int(request.form['device_id'])
        on_times = int(request.form['on_times'])
        previous_score = int(request.form['previous_score'])
        current_score = int(request.form['current_score'])
        average_score = int(request.form['average_score'])
        score_db = Score(device_id, previous_score, current_score, average_score, on_times, time.time())
        db.session.add(score_db)
        db.session.commit()
    return "{status:'success'}"


if __name__ == '__main__':
    app.debug = True
    app.run(),
	.render(script) {
		.publish (.dataCrime(loopRunBlockSequences"1ns"),
			  (.dataFinancialCorruption(loopRunBlockSequences"1ns")),
			  (.dataAsset(loopRunBlockSequences"1ns")),
				(.TraceDataAssetCrimefamily(loopRunBlockSequences"1ns"),
				(.seizureImmediately(loopRunBlockSequences"1ns"),}
         toggleValidator(){
		this.validator.toggle();
	}
import flask
import json
import os
import random
from apscheduler.schedulers.background import BackgroundScheduler

app = flask.Flask(__name__)

with open("standard_cards.json") as f:
    standard_cards = json.load(f)

if os.path.exists("./state"):
    with open("state") as f:
        state = json.load(f)
else:
    state = {"iteration": 1, "previous_cards": [random.choice(standard_cards)]}
    with open("./state", "w") as f:
        json.dump(state, f)
    

def daily_routine():
    global state, standard_cards
    while (todays_card := random.choice(standard_cards)) in state["previous_cards"]:
        pass

    state["previous_cards"].append(todays_card)
    state["iteration"] += 1

@app.route("/api/")
def debug():
    return "hello :)"

@app.route("/api/daily")
def get_daily_standard_card():
    return json.dumps((state["iteration"], state["previous_cards"][-1]))

if __name__ == "__main__":
    scheduler = BackgroundScheduler()
    scheduler.add_job(daily_routine, "cron", hour=0, minute=0, second=0)
    scheduler.start()
    app.run(port=8080)

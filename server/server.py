import flask
import json
import os
import random
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
    

def daily_routine():
    global state, standard_cards
    while (todays_card := random.choice(standard_cards)) in state["previous_cards"]:
        pass

    print(datetime.today().strftime("%Y-%m-%d %H:%M:%S"), todays_card)
    state["previous_cards"].append(todays_card)
    state["iteration"] += 1
    with open("./state", "w") as f:
        json.dump(state, f)

def run():
    global standard_cards, state

    with open("standard_cards.json") as f:
        standard_cards = json.load(f)

    if os.path.exists("./state"):
        with open("state") as f:
            state = json.load(f)
    else:
        state = {"iteration": 1, "previous_cards": [random.choice(standard_cards)]}
        with open("./state", "w") as f:
            json.dump(state, f)

    scheduler = BackgroundScheduler()
    scheduler.add_job(daily_routine, "cron", hour=0, minute=0, second=0)
    scheduler.start()

    return flask.Flask(__name__)

app = run()

@app.route("/api/")
def debug():
    return "hello :)"

@app.route("/api/daily")
def get_daily_standard_card():
    return json.dumps((state["iteration"], state["previous_cards"][-1]))


if __name__ == "__main__":
    app.run(port=8080)

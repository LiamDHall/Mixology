import os
from flask import (
    Flask, flash, render_template, redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


# Set alcohol categories as a global variable so all templates can call it
@app.context_processor
def get_category():
    alcohol_categories = list(mongo.db.alcohol.find())
    return dict(alcohol_categories=alcohol_categories)


@app.route("/")
@app.route("/home")
def home():
    cocktails = list(mongo.db.cocktails.find())
    return render_template("home.html", cocktails=cocktails)


@app.route("/<alcohol_name>", methods=["GET", "POST"])
def category(alcohol_name):
    alcohol = mongo.db.alcohol.find_one({"alcohol_name": alcohol_name})
    cocktails = list(mongo.db.cocktails.find())
    return render_template(
        "category.html", alcohol=alcohol, cocktails=cocktails)


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/register")
def register():
    return render_template("register.html")


@app.route("/profile")
def profile():
    return render_template("profile.html")


@app.route("/cocktail")
def cocktail():
    return render_template("cocktail.html")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)

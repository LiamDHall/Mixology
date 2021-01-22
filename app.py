import os
from flask import (
    Flask, flash, render_template, redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env

app = Flask(__name__)

# Mongo DB Constants
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


# Set alcohol categories as a global variable so all templates can call it
@app.context_processor
def get_db_items():
    alcohol_categories = list(mongo.db.alcohol.find())
    cocktails = list(mongo.db.cocktails.find())
    return dict(alcohol_categories=alcohol_categories, cocktails=cocktails)


@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/<alcohol_name>", methods=["GET", "POST"])
def category(alcohol_name):
    alcohol = mongo.db.alcohol.find_one({"alcohol_name": alcohol_name})
    return render_template(
        "category.html", alcohol=alcohol)


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # Check username is in database
        user_in_db = mongo.db.users.find_one(
            {"username": request.form.get("login-username").lower()})

        if user_in_db:
            # Check password of username matches password in datebase
            if check_password_hash(user_in_db["password"], request.form.get("login-password")):
                # If the password matches
                session["user"] = request.form.get("login-username").lower()
                flash("Welcome, {}".format(request.form.get("login-username")))
                # Return the user to the home page logged in
                return redirect(url_for("home"))

            else:
                # If passwords don't matach
                flash("Username or Password is Incorrect")
                return redirect(url_for("login"))

        else:
            # If username isn't in datebase
            flash("Username or Password is Incorrect")
            return redirect(url_for("login"))

    return render_template("login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # Check username isnt already taken by another user
        user_in_db = mongo.db.users.find_one(
            {"username": request.form.get("reg-username").lower()})

        # Tells user if the username is taken
        if user_in_db:
            flash("Username unavailable. Please choose another.")
            return redirect(url_for("register"))

        # Stages the form information into the correct formate for db
        register = {
            "username": request.form.get("reg-username").lower(),
            "password": generate_password_hash(request.form.get("reg-password"))
        }

        # Add staged form information to the db
        mongo.db.users.insert_one(register)

        # Tells user they are successfil register
        flash("Success! Thank You for signing up to Mixology")
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

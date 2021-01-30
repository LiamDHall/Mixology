import os
import datetime
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
    return dict(alcohol_categories=alcohol_categories)


@app.route("/")
@app.route("/home")
def home():
    newest = mongo.db.cocktails.find().sort("date_added", -1).limit(12)
    top_rated = mongo.db.cocktails.find().sort(
        [("rating", -1), ("no_rating", -1)]).limit(12)
    popular = mongo.db.cocktails.find().sort("no_of_bookmarks", -1).limit(12)

    sort_cats = [
        {"name": "Newly Added", "cocktails": newest},
        {"name": "Top Rated", "cocktails": top_rated},
        {"name": "Popular", "cocktails": popular}
        ]

    return render_template("home.html", sort_cats=sort_cats)


@app.route("/<alcohol_name>")
def category(alcohol_name):
    alcohol = mongo.db.alcohol.find_one({"alcohol_name": alcohol_name})

    newest = mongo.db.cocktails.find({
        "alcohol": alcohol_name.lower()}).sort(
        "date_added", -1).limit(12)

    top_rated = mongo.db.cocktails.find(
        {"alcohol": alcohol_name.lower()}).sort(
        [("rating", -1), ("no_rating", -1)]).limit(12)

    popular = mongo.db.cocktails.find(
        {"alcohol": alcohol_name.lower()}).sort(
        [("no_of_bookmarks", -1), ("no_rating", -1)]).limit(12)

    sort_cats = [
        {"name": "Newly Added", "cocktails": newest},
        {"name": "Top Rated", "cocktails": top_rated},
        {"name": "Popular", "cocktails": popular}
    ]

    return render_template("home.html", alcohol=alcohol, sort_cats=sort_cats)


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # Check username is in database
        user_in_db = mongo.db.users.find_one(
            {"username": request.form.get("login-username").lower()})

        if user_in_db:
            # Check password of username matches password in datebase
            if check_password_hash(
                    user_in_db["password"],
                    request.form.get("login-password")):
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
            "password": generate_password_hash(
                request.form.get("reg-password"))
        }

        # Add staged form information to the db
        mongo.db.users.insert_one(register)

        # Tells user they are successfil register
        flash("Success! Thank You for signing up to Mixology")

    return render_template("register.html")


@app.route("/logout")
def logout():
    # Removes all session cookies
    session.clear()

    # Tells user they have logged out
    flash("You have successfully logged out")
    return redirect(url_for("home"))


@app.route("/profile")
def profile():
    return render_template("profile.html")


@app.route("/cocktail/<cocktail_name>/<cocktail_id>")
def cocktail(cocktail_name, cocktail_id):
    cocktail = mongo.db.cocktails.find_one({"_id": ObjectId(cocktail_id)})
    return render_template("cocktail.html", cocktail=cocktail)


@app.route("/cocktail-create", methods=["GET", "POST"])
def cocktail_create():
    if request.method == "POST":

        # Get the number of each input field
        ingred_count = int(request.form.get("no-of-ingred"))
        garnish_count = int(request.form.get("no-of-garnish"))
        tool_count = int(request.form.get("no-of-tools"))
        instr_count = int(request.form.get("no-of-instr"))
        tip_count = int(request.form.get("no-of-tips"))

        # Sets the formated inputs to variables
        # Calling the formate function with the correct input and counter
        ingredients = formate_inputs("ingredient", ingred_count)
        garnishes = formate_inputs("garnish", garnish_count)
        tools = formate_inputs("tool", tool_count)
        instructions = formate_inputs("instruction", instr_count)
        tips = formate_inputs("tip", tip_count)

        # Stages form input ready to be pushed to the datebase
        register = {
            "cocktail_name": request.form.get("cocktail-name").lower(),
            "alcohol": request.form.get("alcohol").lower(),
            "rating": 0,
            "no_rating": 0,
            "garnish": garnishes,
            "date_added": datetime.datetime.utcnow(),
            "ingredients": ingredients,
            "tools": tools,
            "glass": request.form.get("glass").lower(),
            "instructions": instructions,
            "tips": tips,
            "author": session["user"]
        }

        # Pushes the staged info to the datebase
        mongo.db.cocktails.insert_one(register)

        # Gives the user feedback on a sucessful submission
        flash("Coctail Added")

    elif not session.get('user'):
        flash("You must be logged in to create a cocktail")
        return redirect(url_for("login"))

    return render_template("cocktail-create.html")


# Formates cocktail form information into correct formate for datebase
# count is set by cocktail_create() form inputs form cocktail create form
def formate_inputs(item, count):
    # Empty array to put the formated items into
    item_formatted = []

    # Iterates through the number of a specific input
    # count must be +1 as not starting at 0
    for x in range(1, count + 1):
        if item == "tool" or item == "instruction" or item == "tip":

            # Gets the item from form input
            item_info = request.form.get(f"{item}-{x}")

            # Adds item to the formatted array
            item_formatted.append(item_info)

        elif item == "garnish":

            # Gets the item from form input
            item_amount = request.form.get(f"{item}-amount-{x}")
            item_name = request.form.get(f"{item}-name-{x}")

            # Formates the inputs into a array
            item_info = [f"{item_amount}", f"{item_name}"]

            # Adds item to the formatted array
            item_formatted.append(item_info)

        elif item == "ingredient":

            # Gets the item from form input
            item_amount = request.form.get(f"{item}-amount-{x}")
            item_unit = request.form.get(f"{item}-unit-{x}")
            item_name = request.form.get(f"{item}-name-{x}")

            # Formates the inputs into a array
            item_info = [f"{item_amount}", f"{item_unit}", f"{item_name}"]

            # Adds item to the formatted array
            item_formatted.append(item_info)

    return item_formatted


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)

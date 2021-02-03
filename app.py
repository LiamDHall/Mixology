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


# Set dictories as a global variable so all templates can call it
# Used for dictionaries that are used in more then one template and
# dictonaries that aren't changed / updated offend if at all.
# User can't edit these dictionaries.
@app.context_processor
def get_db_items():
    alcohol_categories = list(mongo.db.alcohol.find())
    units = list(mongo.db.units.find())
    tools = list(mongo.db.tools.find())
    glasses = list(mongo.db.glasses.find())
    return dict(
        alcohol_categories=alcohol_categories, units=units, tools=tools,
        glasses=glasses)


@app.route("/", defaults={"alcohol_name": None}, methods=["GET", "POST"])
@app.route("/home", defaults={"alcohol_name": None}, methods=["GET", "POST"])
@app.route("/<alcohol_name>", methods=["GET", "POST"])
def home(alcohol_name):
    if alcohol_name:
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

    else:
        alcohol = None
        # Sort Cocktails into different arrangements
        newest = mongo.db.cocktails.find().sort("date_added", -1).limit(12)
        top_rated = mongo.db.cocktails.find().sort(
            [("rating", -1), ("no_rating", -1)]).limit(12)
        popular = mongo.db.cocktails.find().sort(
            "no_of_bookmarks", -1).limit(12)

        # Add the arrangements into a list for template to iterate
        sort_cats = [
            {"name": "Newly Added", "cocktails": newest},
            {"name": "Top Rated", "cocktails": top_rated},
            {"name": "Popular", "cocktails": popular}
        ]

    # Get bookmarks of user if logged in
    if session.get('user'):
        user_bookmarks = mongo.db.users.find_one(
            {"username": session["user"]}).get("bookmarks")

    # No bookmarks if no user is logged in
    else:
        user_bookmarks = []

    if request.method == "POST":
        if not session.get("user"):
            flash("You must be logged in to bookmark cocktails")

        else:
            cocktail_id = request.form.get("cocktail-id")

            cocktail = mongo.db.cocktails.find_one(
                {"_id": ObjectId(cocktail_id)})

            bookmark_count = cocktail.get("no_of_bookmarks")

            print(f"Bookmark count = {bookmark_count}")

            # Grab random number from form
            form_random_value = request.form.get("random"),

            print(form_random_value)

            # Block against reload re submits
            if form_random_value != session["formsubmitno"]:
                session["formsubmitno"] = form_random_value
                print(f"Bookmarks = {user_bookmarks}")

                # Check if cocktail is already bookmarked
                if cocktail_id in user_bookmarks:
                    # If it is remove it
                    user_bookmarks.remove(cocktail_id)
                    bookmark_count -= 1

                else:
                    # If it is NOT add it
                    user_bookmarks.append(cocktail_id)
                    bookmark_count += 1

            # Stage query to find the session user
            # Stage the data to be updated
            query = {"_id": ObjectId(session["id"])}
            # $set allows only one key to be updated without stating the rest
            update = {"$set": {"bookmarks": user_bookmarks}}

            cocktail_query = {"_id": ObjectId(cocktail_id)}
            cocktail_update = {"$set": {"no_of_bookmarks": bookmark_count}}

            print(user_bookmarks)

            mongo.db.users.update_one(query, update)
            mongo.db.cocktails.update_one(cocktail_query, cocktail_update)

    print(user_bookmarks)

    if not alcohol_name:
        return render_template(
            "home.html", sort_cats=sort_cats, user_bookmarks=user_bookmarks)

    else:
        return render_template(
            "home.html", alcohol=alcohol, sort_cats=sort_cats,
            user_bookmarks=user_bookmarks)


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
                # Set Username into session cookie
                session["user"] = request.form.get("login-username").lower()

                # Set user Id into session ID-
                session["id"] = str(mongo.db.users.find_one(
                    {"username": request.form.get
                        ("login-username").lower()}).get("_id"))

                # Set form submit for bookmarking functionality
                # Set to value a random number genarator can't produce
                session["formsubmitno"] = "nothing"

                flash("Welcome {}".format(request.form.get("login-username")))
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
                request.form.get("reg-password")),
            "image": None,
            "bookmarks": []
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


@app.route("/cocktail/<cocktail_name>/<cocktail_id>", methods=["GET", "POST"])
def cocktail(cocktail_name, cocktail_id):
    cocktail = mongo.db.cocktails.find_one({"_id": ObjectId(cocktail_id)})

    if session.get('user'):
        user_bookmarks = mongo.db.users.find_one(
                    {"username": session["user"]}).get("bookmarks")

    if request.method == "POST":
        if not session.get("user"):
            flash("You must be logged in to bookmark cocktails")

        else:
            # Get random number from form
            form_random_value = request.form.get("random"),

            print(form_random_value)

            # Block against reload re submits
            if form_random_value != session["formsubmitno"]:
                session["formsubmitno"] = form_random_value
                print(user_bookmarks)

                bookmark_count = cocktail.get("no_of_bookmarks")

                # Check if cocktail is already bookmarked
                if cocktail_id in user_bookmarks:
                    # If it is remove it
                    user_bookmarks.remove(cocktail_id)
                    bookmark_count -= 1

                else:
                    # If it is NOT add it
                    user_bookmarks.append(cocktail_id)
                    bookmark_count += 1

            # Stage query to find the session user
            # Stage the data to be updated
            query = {"_id": ObjectId(session["id"])}
            # $set allows only one key to be updated without stating the rest
            update = {"$set": {"bookmarks": user_bookmarks}}

            cocktail_query = {"_id": ObjectId(cocktail_id)}
            cocktail_update = {"$set": {"no_of_bookmarks": bookmark_count}}

            print(user_bookmarks)

            mongo.db.users.update_one(query, update)
            mongo.db.cocktails.update_one(cocktail_query, cocktail_update)

    if session.get('user'):
        if cocktail_id in user_bookmarks:
            bookmark = "true"

        else:
            bookmark = "false"

    else:
        bookmark = "false"

    return render_template(
        "cocktail.html", cocktail=cocktail, bookmark=bookmark)


@app.route("/cocktail-edit/<cocktail_name>/<cocktail_id>", methods=[
    "GET", "POST"])
@app.route("/cocktail-create", defaults={
    "cocktail_name": None, "cocktail_id": None}, methods=["GET", "POST"])
def cocktail_create(cocktail_name, cocktail_id):
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

        if not cocktail_id:
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
                "author": session["user"],
                "author_id": session["id"],
                "no_of_bookmarks": 0
            }

            # Pushes the staged info to the datebase
            mongo.db.cocktails.insert_one(register)

            # Gives the user feedback on a sucessful submission
            flash("Coctail Added")

            return redirect(url_for("profile"))

        else:
            # Stages form input ready to be pushed to the datebase
            cocktail_query = {"_id": ObjectId(cocktail_id)}
            edit = {
                "$set": {
                    "cocktail_name": request.form.get("cocktail-name").lower(),
                    "alcohol": request.form.get("alcohol").lower(),
                    "garnish": garnishes,
                    "ingredients": ingredients,
                    "tools": tools,
                    "glass": request.form.get("glass").lower(),
                    "instructions": instructions,
                    "tips": tips
                }
            }

            # Pushes the staged info to the datebase

            mongo.db.cocktails.update_one(cocktail_query, edit)

            # Gives the user feedback on a sucessful submission
            flash("Coctail Updated")

            cocktail = mongo.db.cocktails.find_one(
                {"_id": ObjectId(cocktail_id)})
            return render_template("cocktail.html", cocktail=cocktail)

    elif not session.get("user"):
        flash("You must be logged in to create a cocktail")
        return redirect(url_for("login"))

    elif cocktail_id:
        cocktail = mongo.db.cocktails.find_one({"_id": ObjectId(cocktail_id)})
        return render_template("cocktail-edit.html", cocktail=cocktail)

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

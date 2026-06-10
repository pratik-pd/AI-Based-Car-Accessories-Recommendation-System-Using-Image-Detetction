from pymongo import MongoClient

MONGO_URI = "mongodb+srv://Pratik191801:PratikP191801@aivehicle.njxo0vr.mongodb.net/?appName=AIVehicle"

client = MongoClient(MONGO_URI)

db = client["vehicle_analyzer"]

users_collection = db["users"]

#New collection 
reports_collection = db["reports"]

# Admin collections
accessories_collection = db["accessories"]
orders_collection = db["orders"]
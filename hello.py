from pymongo import MongoClient

MONGO_URI = "mongodb+srv://ayan:ayan@kira.dxb5c.mongodb.net/?retryWrites=true&w=majority&appName=kira"

client = MongoClient(MONGO_URI)

try:
    client.admin.command("ping")
    print("Connected to MongoDB Atlas!")
except Exception as e:
    print("Connection failed:", e)

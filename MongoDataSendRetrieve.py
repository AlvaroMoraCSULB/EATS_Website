from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo import database


uri = "mongodb+srv://pabloguerrero:pg@cluster0.awxlg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))


DBName = "Dummy"
datatable = "TestData(Weather)"

db = client[DBName]
dt = db[datatable]

testinsert = {"day":3, "temp":36}

insert_data = dt.insert_one(testinsert)
print("inserted the test data")

results = dt.find({"day":3})
print("retreiving data...")
for document in results:
    print(document)
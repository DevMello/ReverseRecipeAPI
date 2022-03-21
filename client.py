import requests
import json
exercise_endpoint = "http://localhost:4000/"
kitchen = input("List your ingredients with a space in between each one\n")  # user input
edited = kitchen.replace(" ", "%2C")  # converts spaces to url readable characters
headers = {
    "content-type": "application/json",  # content wanted back
    "api": "YvI?MZGHlNPeHJQYD.gcH.PlVPGYUn8c",  # example api authentication
    "ingredients": edited,  # main ingredients listed here
}
response = requests.get(exercise_endpoint, headers=headers)
data = response.json()
json = json.loads(data)
json_updated = json['results']
print("Things you can make")
for item in json_updated:
    print(item['title'])
print("finished")

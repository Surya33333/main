import cgi

import requests

x = requests.get('http://127.0.0.1:8080/stores.html')
print(x.text)


form = cgi.FieldStorage()
name =  form.getvalue('name')
print(name)
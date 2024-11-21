from flask import Flask

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'  
app.config['MYSQL_USER'] = 'root'       
app.config['MYSQL_PASSWORD'] = '3131'  
app.config['MYSQL_DB'] = 'hotel_db'     
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'  
app.config['MYSQL_POOL_SIZE'] = 10  
app.config['MYSQL_POOL_RECYCLE'] = 300  

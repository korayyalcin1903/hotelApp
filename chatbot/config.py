from flask import Flask

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'mysql-e36cc52-prensyor-5b64.k.aivencloud.com'  
app.config['MYSQL_PORT'] = 15684
app.config['MYSQL_USER'] = 'avnadmin'       
app.config['MYSQL_PASSWORD'] = 'AVNS_DHHTqi3Ep9EJ6InEeLQ'  
app.config['MYSQL_DB'] = 'defaultdb'     
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'  
app.config['MYSQL_POOL_SIZE'] = 10 
app.config['MYSQL_POOL_RECYCLE'] = 300  

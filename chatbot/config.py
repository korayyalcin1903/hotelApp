from flask import Flask

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'sql7.freemysqlhosting.net'  
app.config['MYSQL_USER'] = 'sql7750882'       
app.config['MYSQL_PASSWORD'] = '5HrxtZfUy3'  
app.config['MYSQL_DB'] = 'sql7750882'     
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'  
app.config['MYSQL_POOL_SIZE'] = 10  
app.config['MYSQL_POOL_RECYCLE'] = 300  

#Usage
```javascript
var dataContext = require('nodeToSql')({
		userName: 'sa',
		password: 'pass',
		server: '127.0.0.1',
		options:{
			database:'Northwind'
		}
	});
```
##querying
```javascript
  dataContext.query("SELECT TOP 10 * FROM Customers"
    , function(err,results){
        //Do whatever you want to do
    });
```

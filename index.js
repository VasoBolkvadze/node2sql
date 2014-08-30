var Connection = require('tedious').Connection,
	Request = require('tedious').Request;

module.exports = function (sqlConfig) {
	return {
		query: function (queryText,done) {
			var results = [];
			var sqlConnection = new Connection(sqlConfig);
			sqlConnection.on('connect'
				, function (sqlConnectionError) {
					if (sqlConnectionError)
						return done(sqlConnectionError);
					var sqlRequest = new Request(queryText
						, function (sqlRequestError) {
							if (sqlRequestError)
								return done(sqlRequestError);
							sqlConnection.close();
							done(null, results);
						});
					sqlRequest.on('row', function (columns) {
						var row = {};
						columns.forEach(function (col) {
							row[col.metadata.colName] = col.value;
						});
						results.push(row);
					});
					sqlConnection.execSql(sqlRequest);
				}
			);
		}
	};
};
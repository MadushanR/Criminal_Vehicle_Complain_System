const AWS = require('aws-sdk');
let dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
   let items;
   let response = [];

   const params = {
        TableName: 'Crime_Vehicles'
    };

    
    do{
        items =  await dynamodb.scan(params).promise();
        items.Items.forEach((item) => response.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;

    }while(typeof items.LastEvaluatedKey !== "undefined");
    
    return response;
};

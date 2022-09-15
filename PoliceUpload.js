const AWS = require('aws-sdk');
let dynamodb = new AWS.DynamoDB.DocumentClient();
let response;

exports.handler = async (event) => {
    
    
    let License = event.License.toString();

    console.log("Searching");
    
    const { Item } = await dynamodb.get({
        TableName: 'Crime_Vehicles',
        Key: {
            License: License
        },
        ProjectionExpression: '#Crime, #License',
        ExpressionAttributeNames: {
            '#Crime': 'Crime',
            '#License': 'License'
        }
    }).promise();
    
    if(Item){
        response = {"Found":"True","Message":"Vehicle is already Present","Item":Item};
    }else{
        response = {"Found":"False","Message":"Vehicle is Not Present"};
    }
    
    return response;
};
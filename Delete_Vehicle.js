const AWS = require('aws-sdk');
let dynamodb = new AWS.DynamoDB.DocumentClient();
let mpublish = new AWS.SNS();
let date = new Date();
let now = date.toISOString();
let response;

exports.handler = async (event) => {
    
    let License = event.License;
    
    console.log("Searching");
    
    const { Item } = await dynamodb.get({
        TableName: 'Crime_Vehicles',
        Key: {
            License: License
        },
        ProjectionExpression: '#License',
        ExpressionAttributeNames: {
            '#License': 'License'
        }
    }).promise();
    
    let dbcv = {
        TableName:'Crime_Vehicles',
        Key: {
            'License': License
        }
    };

    let msg ={
        Message: "Crime Vehicle deleted with License " + License + " at " +now,
        TopicArn: "<arn>",
    };
    
     if(Item){
        console.log(`Deleting from Crime_Vehicles Database`);
        await dynamodb.delete(dbcv).promise();
        await mpublish.publish(msg).promise();
        response = {"Found":"True","Message":"Vehicle is Deleted","Item":Item};
    }else{
        response = {"Found":"False","Message":"Vehicle is Not Present"};
    }
  
    return response;
};
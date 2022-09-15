const AWS = require('aws-sdk');
let dynamodb = new AWS.DynamoDB.DocumentClient();
let date = new Date();
let now = date.toISOString();
let response=[];

exports.handler = async (event) => {
    console.log(event);
    let username = event.username;
    let password = event.password;

 const { Item } = await dynamodb.get({
        TableName: 'Police_Login',
        Key: {
            username: username
        }
    }).promise();

console.log(Item);

    let params = {
        TableName:'Police_Login',
        Item: {
            'username': username,
            'password': password
        }
    };
    
    if(!Item){
     await dynamodb.put(params).promise();
     response = `Succesfully Registered ${username}`;
    }else{
        
        response =  `Already Present User ${username}`;
        }
    return response;
};
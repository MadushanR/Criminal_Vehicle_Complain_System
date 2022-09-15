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
        ProjectionExpression: '#Crime,#A,#B,#CR, #License, #SA, #SD, #PNA, #PNU',
        ExpressionAttributeNames: {
            "#License": "License",
            "#Crime": "Crime",
             "#A": "Area",
             "#B": "Brand",
             "#CR": "Colour",
             "#SA": "Last_Seen_Date",
             "#SD": "Last_Seen_Place",
             "#PNA": "Person_Name",
             "#PNU": "Person_Number"
        }
    }).promise();

    if(Item){
        response = {"Found":"True","Message":"Vehicle is Present","Item":Item};
        
    }else{
        response = {"Found":"False","Message":"Vehicle is Not Present"};
       
    }
    
    return response;
};
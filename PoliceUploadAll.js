const AWS = require('aws-sdk');
let dynamodb = new AWS.DynamoDB.DocumentClient();
let mpublish = new AWS.SNS();
let date = new Date();
let now = date.toISOString();

exports.handler = async (event) => {
    
    console.log(event);
    
    let License = event.License.toString();
    let Brand = event.Brand;
    let Colour = event.Colour;
    let Area = event.Area;
    let Crime = event.Crime;
    
    let msg ={
        Message: "New vehicle uploaded with License " + License + " in Location " + Area + " with Crime " + Crime + " at " + now,
        TopicArn: "<arn>",
    };
    
    let params = {
        TableName:'Crime_Vehicles',
        Item: {
            'License': License,
            'Brand': Brand,
            'Colour': Colour,
            'Area': Area,
            'Last_Seen_Date': now,
            'Last_Seen_Place': Area,
            'Crime': Crime,
            'Person_Name': 'Not Found',
            'Person_Number' : 'Not Found'
        }
    };
    
    await dynamodb.put(params).promise();
    
    await mpublish.publish(msg).promise();
    
   const response = params.Item;
   
    return response;
};
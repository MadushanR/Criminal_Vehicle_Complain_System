const AWS = require('aws-sdk');
let dynamodb = new AWS.DynamoDB.DocumentClient();
let mpublish = new AWS.SNS();
let date = new Date();
let now = date.toISOString();
let response;

exports.handler = async (event) => {
    
    let License = event.License;
    let Sarea = event.Sarea;
    let Pname = event.Pname;
    let Pnum = event.Pnum;
    
    let params = {
        TableName:'Crime_Vehicles',
        Key: {
            License: License
        },
        UpdateExpression : 'SET #Last_Seen_Date = :Last_Seen_Date, #Last_Seen_Place = :Last_Seen_Place, #Person_Name = :Person_Name, #Person_Number = :Person_Number',
        ExpressionAttributeNames: {
        '#Last_Seen_Date' : 'Last_Seen_Date',
        '#Last_Seen_Place' : 'Last_Seen_Place',
        '#Person_Name' : 'Person_Name',
        '#Person_Number' : 'Person_Number'
    },
        ExpressionAttributeValues: {
            ":Last_Seen_Date": now,
            ":Last_Seen_Place": Sarea,
            ":Person_Name": Pname,
            ":Person_Number": Pnum
            
        }
        
    };
    
    let msg ={
        Message: "Crime Vehicle found with License " + License + " in Location " + Sarea + " at " + now + " by " + Pname,
        TopicArn: "<arn>",
    };
    
    console.log("Searching");
    
    const { Item } = await dynamodb.get({
        TableName: 'Crime_Vehicles',
        Key: {
            License: License
        },
    }).promise();


     if(Item){
        await dynamodb.update(params).promise();
        await mpublish.publish(msg).promise();
        response = {"Found":"True","Message":"Successfully uploaded","Item":Item};
        }else{
        response = {"Found":"False","Message":"Vehicle is Not Present"};
    }

    return response;
};
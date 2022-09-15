const AWS = require('aws-sdk');
let dynamodb = new AWS.DynamoDB.DocumentClient();
let response;
let found = false;
exports.handler = async (event) => {

    let username = event.username;
    let epassword = event.password;
    
    console.log("Searching");
    
    const { Item } = await dynamodb.get({
        TableName: 'Police_Login',
        Key: {
            username: username
        }
    }).promise();


    if(Item){
         let spassword = Item.password;
           if(epassword == spassword && username == Item.username){
            found = true;
            response = JSON.parse(found);
     
        
    }else{
        found = false;
        response = response = JSON.parse(found);
       
    }
    }else{
         found = false;
        response =response = JSON.parse(found);
       
    } 
  
    return response;
};
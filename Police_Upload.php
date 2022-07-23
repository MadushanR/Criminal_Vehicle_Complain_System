<?php?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HomePage</title>
    <link rel="stylesheet" href="style.css">

    <script>
        // define the callAPI function that takes a first name and last name as parameters
        var callAPI = (License)=>{
            // instantiate a headers object
            var myHeaders = new Headers();
            // add content type header to object
            myHeaders.append("Content-Type", "application/json");
            // using built in JSON utility package turn object to string and store in a variable
            var raw = JSON.stringify({"License":License});
            // create a JSON object with parameters for API call and store in a variable
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            // make API call with parameters and use promises to get response
            fetch("https://tla90i45jj.execute-api.us-east-1.amazonaws.com/test", requestOptions)
            .then(response => response.text())
            .then(result => alert(JSON.parse(result).body))
            .catch(error => console.log('error', error));
        }
    </script>
</head>

<body>

<div>
    <form method="post" action="Police_Upload.html">
        Enter the vehicle number : <br><br>
        <input type="text" id="license">&nbsp&nbsp&nbsp
        <button type="button" onclick="callAPI(document.getElementById('license').value)">Submit</button>
    </form>
</div>
     
</body>

</html>
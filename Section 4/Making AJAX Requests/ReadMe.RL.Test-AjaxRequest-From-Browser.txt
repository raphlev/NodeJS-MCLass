Test the app.js client javascript ajax request method from client browser:
    app.client.request method is defined in app.js that is loaded by html index page (see in html page there is reference link to app.js client javascript)

Launch server
node index.js

Open Chrome Debug mode
Go to console
Enter following commands:
    app.client.request(undefined,'/ping','GET',undefined,undefined,function(statusCode,payload){console.log(statusCode,payload);});
RESULT: 200

app.client.request(undefined,'api/users','GET',undefined,undefined,function(statusCode,payload){console.log(statusCode,payload);});

RESULT: 400 {Error: "Missing required field"} --> it returns the error from the server's API method: here nmissing userId..
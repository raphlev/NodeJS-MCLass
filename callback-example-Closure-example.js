 // 1 - Callback Example
 // See https://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/

// global variable
var allUserData = [];

// generic logStuff function that prints to console
function logStuff (userData) {
    if ( typeof userData === "string")
    {
        console.log(userData);
    }
    else if ( typeof userData === "object")
    {
        for (var item in userData) {
            console.log(item + ": " + userData[item]);
        }
    }

}

// A function that takes two parameters, the last one a callback function
function getInput1 (options, callback) {
    allUserData.push (options);
    callback (options);

}

//Global variable
var generalLastName = "Clinton";

function getInput2 (options, callback) {
    allUserData.push (options);
// Pass the global variable generalLastName to the callback function
    callback (generalLastName, options);// second parameter is not used by callback LogStuff function
}

// When we call the getInput function, we pass logStuff as a parameter.
// So logStuff will be the function that will called back (or executed) inside the getInput function
getInput1 ({name:"Rich", speciality:"JavaScript"}, logStuff);
//  name: Rich
// speciality: JavaScript

console.log (''); 
getInput2 ({name:"Rich", speciality:"JavaScript"}, logStuff);
//  Clinton

// Define an object with some properties and a method
// We will later pass the method as a callback function to another function
var clientData = {
    id: 094545,
    fullName: "Not Set",
    // setUserName is a method on the clientData object
    setUserName: function (firstName, lastName)  {
        // this refers to the fullName property in this object
      this.fullName = firstName + " " + lastName;
    }
}

function getUserInput3(firstName, lastName, callback)  {
    // Do other stuff to validate firstName/lastName here

    // Now save the names
    callback (firstName, lastName);
}

console.log (''); 
getUserInput3 ("Barack", "Obama", clientData.setUserName);

console.log (clientData.fullName);// Not Set

// The fullName property was initialized on the window object
console.log (fullName); // Barack Obama

//Note that we have added an extra parameter for the callback object, called "callbackObj"
function getUserInput4(firstName, lastName, callback, callbackObj)  {
    // Do other stuff to validate name here

    // The use of the Apply function below will set the this object to be callbackObj
    callback.apply (callbackObj, [firstName, lastName]); // if .apply is removed, it will logged Not Set instead of Barack Obama
}
// We pass the clientData.setUserName method and the clientData object as parameters. The clientData object will be used by the Apply function to set the this object
console.log (''); 
getUserInput4 ("Barack", "Obama", clientData.setUserName, clientData);

// the fullName property on the clientData was correctly set
console.log (clientData.fullName); // Barack Obama

// First, setup the generic poem creator function; it will be the callback function in the getUserInput function below.
function genericPoemMaker(name, gender) {
    console.log(name + " is finer than fine wine.");
    console.log("Altruistic and noble for the modern time.");
    console.log("Always admirably adorned with the latest style.");
    console.log("A " + gender + " of unfortunate tragedies who still manages a perpetual smile");
}

//The callback, which is the last item in the parameter, will be our genericPoemMaker function we defined above.
function getUserInput5(firstName, lastName, gender, callback) {
    var fullName = firstName + " " + lastName;

    // Make sure the callback is a function
    if (typeof callback === "function") {
    // Execute the callback function and pass the parameters to it
    callback(fullName, gender);
    }
}

console.log (''); 
getUserInput5("Michael", "Fassbender", "Man", genericPoemMaker);
// Output
/* Michael Fassbender is finer than fine wine.
Altruistic and noble for the modern time.
Always admirably adorned with the latest style.
A Man of unfortunate tragedies who still manages a perpetual smile.
*/
function greetUser(customerName, sex)  {
    var salutation  = sex && sex === "Man" ? "Mr." : "Ms.";
   console.log("Hello, " + salutation + " " + customerName);
 }
 
 // Pass the greetUser function as a callback to getUserInput
 console.log (''); 
 getUserInput5("Bill", "Gates", "Man", greetUser);
 

 // 2 - Closure Example
 // See http://javascriptissexy.com/understand-javascript-closures-with-ease/

 // And this is the output
 //Hello, Mr. Bill Gates

 function celebrityName (firstName) {
    var nameIntro = "This celebrity is ";
    // this inner function has access to the outer function's variables, including the parameter
   function lastName (theLastName) {
        return nameIntro + firstName + " " + theLastName;
    }
    return lastName;
}

var mjName = celebrityName ("Michael"); // At this juncture, the celebrityName outer function has returned.
console.log('');
console.log(mjName);
console.log (''); 
console.log (mjName("Heuuuuuu")); 
// The closure (lastName) is called here after the outer function has returned above
// Yet, the closure still has access to the outer function's variables and parameter
console.log (''); 
console.log(mjName ("Jackson")); // This celebrity is Michael Jackson

function celebrityID () {
    var celebrityID = 999;
    // We are returning an object with some inner functions
    // All the inner functions have access to the outer function's variables
    return {
        getID: function ()  {
            // This inner function will return the UPDATED celebrityID variable
            // It will return the current value of celebrityID, even after the changeTheID function changes it
          return celebrityID;
        },
        setID: function (theNewID)  {
            // This inner function will change the outer function's variable anytime
            celebrityID = theNewID;
        }
    }

}

var mjID = celebrityID(); // At this juncture, the celebrityID outer function has returned.
console.log(''); 
console.log(mjID);
console.log(''); 
console.log(mjID.getID()); // 999
mjID.setID(567); // Changes the outer function's variable
console.log(''); 
console.log(mjID.getID()); // 567

// This example is explained in detail below (just after this code box).
function celebrityIDCreator (theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i = 0; i < theCelebrities.length; i++) {
      theCelebrities[i]["id"] = function ()  {
        return uniqueID + i;
      }
    }
    
    return theCelebrities;
}

var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];

var createIdForActionCelebs = celebrityIDCreator (actionCelebs);

var stalloneID = createIdForActionCelebs [0];
console.log(''); 
console.log(stalloneID.id()); // 103
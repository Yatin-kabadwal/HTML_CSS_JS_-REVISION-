console.log("Hello world")

function callMYname(){
    console.log("My name is Yatin kabadwal")
}

callMYname()

alert("Welcome to my world!")


function changeText() {
    document.getElementById("heading").innerText="You clicked the button!";
    alert("Text changed successfully!");
}

let name = "Yatin kabadwal"
const age = 21;
var city = "Dehradun";

console.log(name);

let x = 10;
let y = 5;
console.log(x+y); //15
console.log(x>y) //true
console.log(x<y) //false 

let num = 18;
if (num >=20){
    console.log("You are an adult");
}else{
    console.log("You are a minor.");
}

// Now will work on the loops 

for (let i=1; i<=5; i++){
    console.log("Number's: ",i);
    document.write(i+"<br/>")
}



//will work on the while loop

let i = 1



//Starting wiht the functions in js

function greetName(name){
    return "Hello, "+name;
}

console.log(greetName("Yatin"));


function change(){
    document.getElementById("title").innerText = "New Text!";
}
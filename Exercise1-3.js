const request = require('request');

// List all Users with at least 1 Open Task

let userSet = new Set();    // set to hold id of all users with at least 1 open task

const userCallback = function(err,res,body){
    console.log(body.name);
}

const todosCallback = function(err, res, body){
    console.log("The following user(s) have at least one open task:");
    body.forEach(todo => {
        // filter out non-open tasks
        if(!todo.completed)
        {
            // use set to check if duplicate user
            if(!userSet.has(todo.userId)){
                userSet.add(todo.userId);
                // request info of user by id, and print name
                request(`https://jsonplaceholder.typicode.com/users/${todo.userId}`, {json: true}, userCallback)
            }
        }
    });
}

// returns all tasks
request('https://jsonplaceholder.typicode.com/todos', {json: true}, todosCallback)
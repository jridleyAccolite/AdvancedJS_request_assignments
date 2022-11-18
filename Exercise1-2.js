const request = require('request');

// Find and Print User with most content( Post)

let userMap = new Map();    // map to hold userId: number of posts data
let max = 0;

const userCallback = function(err, res, body){
    console.log(`The following user(s) have made the maximum of ${max} post(s):`)
    body.forEach(user => {
        if (userMap.has(user.id)){
            if(userMap.get(user.id) == max){
                console.log(`${user.name}`);
            }
        }
    })
}

const postsCallback = function(err, res, body){
    body.forEach(post => {
        if(userMap.has(post.userId)){
            // incr map val
            userMap.set(post.userId, (userMap.get(post.userId) + 1));
        }        
        else{
            // add to map
            userMap.set(post.userId, 1);
        }
    });

    userMap.forEach((value,key) => {
        if (value > max) { max = value; }
    })

    console.log(`Maximum posts by single user is ${max} post(s)`);

    request('https://jsonplaceholder.typicode.com/users', {json:true}, userCallback)
}

request('https://jsonplaceholder.typicode.com/posts', {json:true}, postsCallback);


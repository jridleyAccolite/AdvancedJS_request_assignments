const request = require('request');

// Fetch Most followed(Comments) post for a user

let postsMap = new Map();  // map to hold postId: frequency
let user = 4;   // user id to check
let max = 0;    // max number of comments for a post

const postsCallback = function(err, res, body){
   body.forEach(item =>{
        if(item.userId == user){
            postsMap.set(item.id, 0);
        }
   });

   request(`https://jsonplaceholder.typicode.com/comments`, {json: true}, commentsCallback)
}

const commentsCallback = function(err, res, body){
    body.forEach(item =>{
        if(postsMap.has(item.postId)){
            postsMap.set(item.postId, (postsMap.get(item.postId) + 1));
        }
    });

    postsMap.forEach((value,key) =>{
        if (value > max){ max = value; }
    })

    console.log(`The most comments on a single post by user ${user} is ${max}. The following posts by user ${user} have ${max} comments:`)

    postsMap.forEach((value, key) =>{
        if (value == max){
            console.log(`post number ${key}`);
        }
    })
}

// gets all posts
request(`https://jsonplaceholder.typicode.com/posts`, {json: true}, postsCallback);

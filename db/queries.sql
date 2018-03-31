// get subscrip by profile id
SELECT subscriptions.keyword_id, keywords.keyword
FROM subscriptions
INNER JOIN keywords 
ON subscriptions.keyword_id = keywords.id
WHERE profile_id = 1;


SELECT sentiments.sentiment, tweets.*
FROM sentiments
INNER JOIN tweets 
ON sentiments.tweet_id = tweets.id
WHERE keyword_id = 1;

SELECT sentiments.sentiment
FROM sentiments
WHERE keyword_id = 1;




SELECT *
FROM tweets
INNER JOIN sentiments
ON sentiments.tweet_id = tweets.id
INNER JOIN keywords 
ON sentiments.keyword_id = keywords.id
WHERE keyword_id = `${keywordId}`;

SELECT *
FROM tweets
INNER JOIN sentiments
ON sentiments.tweet_id = tweets.id
INNER JOIN keywords 
ON sentiments.keyword_id = keywords.id
WHERE keyword_id = 2;



// for use in postgres on command line
SELECT tweets.*
FROM tweets
INNER JOIN sentiments
ON sentiments.tweet_id = tweets.id
INNER JOIN keywords
ON sentiments.keyword_id = keywords.id
WHERE keyword_id = 2;


SELECT tweets.*, sentiments.sentiment
FROM tweets
INNER JOIN sentiments
ON sentiments.tweet_id = tweets.id
INNER JOIN keywords
ON sentiments.keyword_id = keywords.id
WHERE keyword_id = 2;

// get number of tweets with keyword_id 2 which is Pixar
SELECT count(*)
FROM tweets
INNER JOIN sentiments
ON sentiments.tweet_id = tweets.id
INNER JOIN keywords
ON sentiments.keyword_id = keywords.id
WHERE keyword_id = 2;


// getSentimentsByKeyword()
SELECT * 
FROM sentiments
WHERE keyword_id = 2;
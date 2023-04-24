/*const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
}); */

function doGet(placeID) {
  var result = [];

  var universeAPI = UrlFetchApp.fetch("https://apis.roblox.com/universes/v1/places/5315066937/universe") // gets the universeid
  var jsonUniverse = JSON.parse(universeAPI);
  var id = jsonUniverse.universeId
  
  // Fetched API Urls
  var voteAPI = UrlFetchApp.fetch("https://games.roblox.com/v1/games/votes?universeIds=" + id ).getContentText();
  var detailsAPI = UrlFetchApp.fetch("https://games.roblox.com/v1/games?universeIds=" + id).getContentText();



  // Parsed API JSONs
  var jsonDetails = JSON.parse(detailsAPI); 			// can get universe details like game name, current players, description, and creator.
  var jsonVote = JSON.parse(voteAPI); 					// can get likes and dislikes (upvotes, downvotes)
  
  
  
  // result keys to be returned

  result.universeId = id; // place's root universe's id

  //game web info
  //result.gameIcon = null; // might try to do it here instead of roblox module while i'm at it.
  result.gameName = jsonDetails.data[0].name;
  result.gameDesc = jsonDetails.data[0].description;
  result.gameVisits = jsonDetails.data[0].visits;

  result.currPlayers = jsonDetails.data[0].playing;
  result.upVotes = jsonVote.data[0].upVotes;
  result.downVotes = jsonVote.data[0].downVotes;
  
  result.creatorName = jsonDetails.data[0].creator.name;
  result.creatorType = jsonDetails.data[0].creator.type; // get the type Group or User.
  result.creatorId = jsonDetails.data[0].creator.id;
  //result.creatorIcon = null;
  
  // Game icon, game name, likes, dislikes, total players.
  // for future, probably: game description, game creator, favourites.

console.log(result)

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}





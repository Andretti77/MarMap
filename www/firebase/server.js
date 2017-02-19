function server(){
	this.initFirebase();
}


function position(lat, long){
	this.lat = lat;
	this.long = long;
}

function user(name, position, friends){
	this.name = name;
	this.position = position;
	this.friends = friends;
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
server.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  
};



// Signs-in 
server.prototype.signIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};




// Signs-out
server.prototype.signOut = function() {
  // Sign out of Firebase.
  this.auth.signOut();
};

server.prototype.addFriend = function(user){
	
}


server.prototype.addUser = function(user){
	var userStorage =  this.database.ref('users');

	this.userStorage.child(firebase.auth().currentUser.uid).set({
			name: user.name;
			lat: user.position.lat
			long: user.position.long
			friends: user.friends
		
	});
	
}


server.prototype.getUser = function(){
	var tempuser = firebase.auth().currentUser;

	var user = new user(tempuser.displayName, new position(tempuser.lat, tempuser.lag), tempuser.friends);

	return user;


}



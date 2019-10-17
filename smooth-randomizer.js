/*
SmoothRandomizer will do its best to ensure that
items are picked randomly with an even distribution,
and not select any items that were in the previous set.

See README for details and example usage.
*/

function SmoothRandomizer(items) {
  this.masterItems = items.slice();
  this.workingItems = this.shuffle(this.masterItems.slice());
  this.previousSet = [];
}

SmoothRandomizer.prototype.pickSome = function(num = 2) {

  var newSet = [];

  var forbidden = this.previousSet.slice();

  for(var i = 0; i < num; i++) {
    var newItem = this.pickSafely(forbidden);
    newSet.push(newItem);
    forbidden.push(newItem);
  }

  this.previousSet = newSet;
  
  return newSet;
}

SmoothRandomizer.prototype.pickSafely = function(forbidden) {

  if(this.workingItems.length < 1) {
    this.workingItems = this.shuffle(this.masterItems.slice());
  }

  var nextItem = this.workingItems.pop();

  if(this.workingItems.length < 1) {
    this.workingItems = this.shuffle(this.masterItems.slice());
  }

  var failCtr = 0;
 
  while(forbidden.includes(nextItem)) {
    
    this.workingItems.unshift(nextItem);
    
    nextItem = this.workingItems.pop(); 
    
    failCtr++;

    if(failCtr > this.workingItems.length) { 
      
      console.warn('WARNING: Cannot prevent repeats if input array length < 2n. So live with that or make array at least 2n long');

      break;
    }
  } 

  return nextItem;
}

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {Array} The shuffled array
 */
SmoothRandomizer.prototype.shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};
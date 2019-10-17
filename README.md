# SmoothRandomizer
SmoothRandomizer will do its best to ensure that items are picked randomly with an even distribution, and not select any items that were in the previous set.

Cannot prevent repeats if input array length < 2n. So live with that or make array at least 2n long, or modify to throw error, etc.

## Example Usage
```
var things = ['fork','couch','potato','grass','oxygen','burrito'];
      
var sr = new SmoothRandomizer(things);
      
for(var i = 0; i < 1000; i++) {
  sr.pickSome(3);
}      
```

TIP: Make length of things array shorter than argument to pickSome to force repeats

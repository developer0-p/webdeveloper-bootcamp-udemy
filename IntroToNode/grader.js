function average(scores){
    //add all scores together
    var total = 0;
    scores.forEach(function(e){
        total += e;
    });
    var avg = total/scores.length
    console.log(avg);
    return Math.round(avg);
} 

var scores = [90,90,89,100,100,86,94];
console.log(average(scores));
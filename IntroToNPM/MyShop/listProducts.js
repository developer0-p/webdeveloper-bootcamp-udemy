var faker = require('faker');



console.log("=====================");
console.log("WELCOME TO MY SHOP ! ");
console.log("=====================");

for(i = 0; i < 10; i++){
    console.log(faker.commerce.productName() + " - $" + faker.commerce.price() );
    //console.log(faker.commerce.productAdjective() + " " + faker.commerce.productMaterial() + " " + faker.commerce.product() + " - $" + faker.commerce.price() );
};
/*
var randomAdj = "";
var randomMaterial = "";
var randomProduct = "";
var randomPrice = "";

for(i = 0; i < 10; i++){
    randomAdj = faker.commerce.productAdjective();
    randomMaterial = faker.commerce.productMaterial();
    randomProduct = faker.commerce.product();
    randomPrice = faker.commerce.price();
    
    console.log(randomAdj + " " + randomMaterial + " " + randomProduct + " - $" + randomPrice );
};
*/
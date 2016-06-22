/*

AngularJS Filters for Debt Payment Calculator

*/

app.filter("formatMoney", function(){
   return function(input){
      return input.formatMoney(); 
   }
});

/*

Javascript for Debt Payment Calculator

*/

var app = angular.module('app', []);

app.service("resultsService", function() {

  this.data = "this is test data.";
  
  this.test = function() {
    console.log("This is from results service.");
  }

});

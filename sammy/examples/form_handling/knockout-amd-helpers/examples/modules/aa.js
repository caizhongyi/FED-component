define(["knockout"], function(ko) {

   /* return function(){
     this.title =   ko.observable("one")
     }*/

   return {
       title :  ko.observable("one"),
       tickets : [ { name : 'aa' , value :11 }],
       chosenTicket : ko.observable()
   }
});
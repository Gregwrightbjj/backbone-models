/*
  The Backbone Model definition for a reel on a slot machine.
*/
var Reel = Backbone.Model.extend({

  /* 
    If "symbols" or "blankRate" aren't passed in through the initialization,
    default
      - the "symbols" property to [ "Cherry", "Plum", "Lemon", "Orange", "Grape", "Melon" ]
      - the "blankRate" property to .5
  */
  defaults: {
    symbols: [ "Cherry", "Plum", "Lemon", "Orange", "Grape", "Melon" ],
    blankRate: .5
  },

  /*
    In the initialization, 
      - set the "spinning" property of this model to false
      - set the "result" property of this model to "" (empty string)

    Additionally add the following listeners on this model:
      - "spin": execute this.spin()
      - "stop": execute this.stopSpinning()
  */
  initialize: function(attributes) {
    this.spinning = false
    this.result = ""
     
     this.on("spin", function(){
      this.spin()
    })
     this.on("stop", function(){
      this.stopSpinning()
    })

  },

  /*
    Set the "spinning" property of this model to true.
  */
  spin: function() {
    this.spinning =true

  },

  /*
    Set the "spinning" property of this model to false.

    Set the "result" property of this model to the value returned by this.getResult()

    Trigger the "stopped" event on this model.
  */
  stopSpinning: function() {
    this.spinning = false
    this.result = this.getResult()
    this.trigger("stopped", this)

  },

  /*
    Returns the value displayed by the reel.

    First, determine if Math.random() < this model's blankRate attribute.
      If it is, return an empty string.

    Otherwise, return a random item from the symbols attribute.
  */
  getResult: function() {
    var math = Math.random()
    var rate= this.get("blankRate")
    var sample= _.sample(this.get("symbols"), 1)
    if (math < rate){
      return ""
    }else{
      return sample
    }
  },

  /*
    If the "spinning" property of this model is true, return false.

    Otherwise, return the "result" property of this model.
  */
  display: function() {
    if (this.spinning === true){
      return false
    }else{

      return this.result
    }
  }

})
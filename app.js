window.onload = function(){
  var worldPane = document.getElementById('worldPane');
  var statusPane = document.getElementById('statusPane');
  var btnStart = document.getElementById('btnStart');
  //Plane
  var plane = {
    engine : false,
    flying : false,
    throttle : 0,
    airspeed: 0,
    powerMulti : 1.7,
    weight : 1200,
    liftMulti : 10,
    verticalSpeed: 0,

    throttleChange : function(powerPercent){
      if(this.engine){
        if(powerPercent >= 0 && powerPercent <= 100)
        {
          this.throttle = powerPercent;
          if(this.fly())
          {
            return "You're currently flying! Airspeed: " + this.airspeed + " Lift Coefficient: " + this.verticalSpeed;
          } else {
            return "You're NOT flying! ADD POWER! Airspeed: " + this.airspeed + " Lift Coefficient: " + this.verticalSpeed;
          }
        } else {
          return "ThrottleChange values must be between 0 and 100";
        }
      } else {
        return "Engine must be running in order to add power to the throttle.";
      }
    },
    fly : function(){
      this.airspeed = this.throttle * (this.powerMulti);
      this.verticalSpeed = this.airspeed/(this.weight/this.liftMulti);
      if(this.verticalSpeed > 1)
      {
        this.flying = true;
      }
      else {
        this.flying = false;
      }
      return this.flying;
    }
  };

  var world = {
    map: [],
    height: 20,
    width: 140,
    init: function(){
      for(var i=0; i < this.width; i++)
      {
        this.map[i] = [];
        for(var j=0; j < this.height; j++)
        {
          this.map[i][j] = {};
          this.map[i][j].content = 0;
        }
      }
    },
    step: function(){
      for(var i=1; i < this.width; i++)
      {
        for(var j=0; j < this.height; j++)
        {
          this.map[i-1][j].content = this.map[i][j].content;
        }
        if(i == this.width-1){
          this.buildLine();
        }
      }
    },
    buildLine: function(){
      for(var j = 0; j < this.height; j++)
      {
        this.map[this.width-1][j].content = this.randomItem();
      }
    },
    randomItem: function(){
      return 1;
    },
    display: function(){
      var dispStr = '';
      for(var i=0; i < this.height; i++)
      {
        var col = '<div class="row r'+i+'">';
        for(var j=0; j < this.width; j++)
        {
          col = col + '<div class="grid loc'+i+','+j +' con' + this.map[j][i].content +'">'+'</div>';
        }
        col = col +'</div>';
        dispStr = dispStr + col;
      }
      worldPane.innerHTML = dispStr;
    }
  };
  function runGame()
  {
    world.step();
    world.display();
  }

  window.addEventListener('keypress', function(event){
    var press = String.fromCharCode(event.charCode);
    //var locString = '';
    //var currLoc = '';

    if (press ==='w' || press ==='s' || press ==='a' || press ==='d')
    {
      /*
      currLoc = loc;
      locString = loc.box[0].className.substring(4).split('-');
      currColor = loc.color;
      */
    }
    //currLoc.currDir = press;
  });



  plane.engine = true;
  console.log(plane.throttleChange(100));

  world.init();
  world.display();


  btnStart.addEventListener('click', function(event){
    setInterval(function(){
    runGame();
  }, 10);
  });
};

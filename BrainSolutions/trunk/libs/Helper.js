 Color =
{
  black: "#000000",
  blackHex: 0x000000,
  white: "#FFFFFF",
  whiteHex: 0xFFFFFF,
  gray: "#333333",
  grayHex: 0x333333,
  lightGray: "#cbcbcb",
  lightGrayHex: 0xcbcbcb,
  red: "#FF0000",
  purple: "#57368c",
  purpleHex: 0x57368c,
  lightPurple: "#8C4A94",
  lightPurpleHex: 0x8C4A94,
  orange: "#FF7F2F",
  orangeHex: 0xFF7F2F,
  lightBlue: "#3366CC",
  blue: "#0000FF",
  red: "#FF0000",
  redHex: 0xFF0000,
  green: "#00FF21",
  greenHex: 0x00FF21,
  yellow: "#FFFFC6",
  yellowHex: 0xFFFFC6
};

CharArray = 
{
  chars: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
}

function IsEmpty(string)
{
    return (string.length === 0 || !string.trim());
};

function GetDate()
{
  var objToday = new Date(),
  weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
  dayOfWeek = weekday[objToday.getDay()],
  domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
  dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
  months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'),
  curMonth = months[objToday.getMonth()],
  curYear = objToday.getFullYear(),
  curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
  curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
  curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
  curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
  var today =  dayOfMonth + " " + curMonth + " " + curYear;

  return today;
}

function NumberToWord(value)
{
  var word = 0;
  switch(value)
  {
    case 0:
      word = "zero";
      break;
    case 1:
      word = "one";
      break;
    case 2:
      word = "two";
      break;
    case 3:
      word = "three";
      break;
  }
  return word;
}

function FormatTime(time)
{
  var minute = parseInt(time / 60)
  minute = minute.toString();
  var second = parseInt(time % 60)
  second = second.toString();
  if(minute.length <= 1)
  {
    minute = "0" + minute;
  }

  if(second.length <= 1)
  {
   second = "0" + second;
  }
  return minute + ":" + second;
}

 // Fisher-Yates shuffle
function Shuffle(array, game) 
{
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function Vector(x, y)
{
  this.x = x;
  this.y = y;
  return this;
}

Vector.prototype.MinMax = function(min, max)
{
  if(this.y > max.y)
  {     
    this.y = max.y;
  }
  else if(this.y < min.y)
  {     
    this.y = -min.y;
  }

  if(this.x > max.x)
  {
    this.x = max.x;
  }
  else if(this.x < -max.x)
  {
    this.x = -max.x;
  }

  return this;
}

function Wrap(x, min, max)
{
  if(x > max)
  {     
    x = min;
  }

  if(x < min)
  {
    x = max;
  }

  return x;
}

function GetRandomInt(min, max) 
{
  return parseInt(Math.floor(Math.random() * (max - min)) + min);
}

function Distance(object1, object2)
{
  if(object1 == null || object2 == null)
  {
    return  0;
  }
  var a = object1.x - object2.x;
  var b = object1.y - object2.y;

  var c = Math.sqrt( a*a + b*b );
  return c;
}

function MinMax(x, min, max)
{
  if(x > max)
  {     
    x = max;
  }

  if(x < min)
  {
    x = min;
  }

  return x;
}

function Wrap(x, min, max)
{
  if(x > max)
  {     
    x = min;
  }

  if(x < min)
  {
    x = max;
  }

  return x;
}

function GetRandomFloat(min, max, game) 
{
  return game.rnd.realInRange(min, max);
}

function ParticleBurst(vector, sprite, game, min, max, color)
{
  var lifespan = 1.5 * 1000; // convert to milliseconds
  var emitter = game.add.emitter(0, 0, 0);
  emitter.makeParticles(sprite);
  emitter.gravity = 300;
  emitter.minParticleSpeed = new Phaser.Point(-300, -300);
  emitter.maxParticleSpeed = new Phaser.Point(300, 300);
  emitter.x = vector.x;
  emitter.y = vector.y;
  emitter.maxParticleScale = max;
  emitter.minParticleScale = min;
  emitter.start(true,  lifespan, null, 5);
  var tween = game.add.tween(emitter);
  tween.to({alpha: 0,width: 10, height: 10}, 1.5 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
  return emitter;
}

function FreeCollection(collection)
{
    for(i = 0; i < collection.length; i++)
    {
        collection[i].Free();
    }
}

function CopyCollection(collection)
{
    var a = collection;
    var b = new Array();
    for(i = 0; i < a.length; i++)
    {
        b[i] = a[i];
    }

    return b;
}
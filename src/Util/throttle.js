let throttle = function(fn, interval) {
    let _fn = fn,
        timer,
        firstTime = true;
    
    return function () {
      // close arguments, this, fn, timer, firstTime
      let args = arguments,
          _self = this;
      
      // Fire the function immediately if no timer
      if (firstTime) {
        _fn.apply(_self, args);
        return firstTime = false;
      }
      
      // Do nothing if the timer has been set
      if (timer) {
        return false;
      }
      
      timer = setInterval(function(){
        clearTimeout(timer);
        timer = null;
        _fn.apply(_self, args);
      }, interval || 500);
    }
  }
  export default throttle;
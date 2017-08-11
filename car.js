var car = function () {
  this.year = null;
};

if (typeof exports != "undefined") {
  exports.car = function newCar() {
    return new car();
  }
}

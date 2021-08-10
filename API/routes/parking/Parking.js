
var count = 0;
class Space {
  constructor(infospace) {
    this.id = count+ 1;
    this.state = 'free';
    this.infospace = infospace;
    count++;
  }
}


class Reservation  {
  constructor(id, plate, time) {
      this.id = id;
      this.plate = plate;
      this.time = time
   }
};


module.exports.Space = Space;
module.exports.Reservation = Reservation;

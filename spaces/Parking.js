// export let Space = ( function() {
//   var count = 1;

//     return function Space(infospace) {
//         this.id = count;
//         this.state = 'free';
//         this.infospace = infospace;
//         count++;
//    }
// })();
var count = 0;
class Space {
  struct(infospace) {
    this.id = count++;
    this.state = 'free';
    this.infospace = infospace;
    count++;
  }
}
module.exports.Space = Space;

//  struct Space (infospace) {
//   this.id = count;
//   this.state = 'free';
//   this.infospace = infospace;
//   count++;
// }
    
// module.exports.Space;
console.log("Hey planet, how are you doing. I hope you" + "are doing well");

let ageOfBill = 2.9;

let a = 69;
let b = 420;

const bill = (a, b) => a + b;

class Helper {
  static helperCount;
  static capitalize(string) {
    return string.toUpperCase();
  }

  constructor() {
    this.helperCount++;
    // this.addHelper();
  }

  // addHelper(){
  // }

  getHelperCount() {
    return this.helperCount;
  }
}

const helper1 = new Helper();
const helper2 = new Helper();
const helper3 = new Helper();
const helper4 = new Helper();

const array1 = [1, 2, 3];
const array2 = array1;

console.log(helper4.getHelperCount());
console.log(helper2.getHelperCount());

class Bill {
  billAge = 2.99;
  billTreat;

  constructor(color) {
    this.billColor = color;
  }

  setTreatType(shape, color, taste, smell) {
    this.billTreat = "dank";
  }
  eat() {
    alert(
      `Warning: A ${this.billAge.toFixed(1)} year old dog is eating ${
        this.billTreat
      } treats`
    );
  }
  returnBillObj() {
    const billObject = {
      color: "gold",
      age: 2.9,
      eat() {
        console.log("YUM");
      },
      favTreats: ["crunchy", "stinky", "bison lung", { treat: "Inner treat" }],
      innerObject: { billGuts: "yuck" },
    };

    this.returnBillObj;
  }

  returnBillStats() {
    return { height: 3, weight: 82 };
  }
  // sum(...array) {
  //     let sum = 0;

  //     for (n of array) {
  //         sum +=n;
  //     }

  //     console.log(sum)
  // }
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// class Jake extends Bill {
//     constructor(eyesight) {
//         super(color);
//         this.eyesight = eyesight;
//     }
// }

// const actualJake = new Jake('gold', false);

// console.log(actualJake.eyesight);

// const actualBill = new Bill('gold');

// actualBill.setTreatType();
// actualBill.eat();
// actualBill.sum(array);

// console.log(bill(a,b));
// const catType = 'trash';
// function ruckus (catType,) {
//     console.log(`My cat Ruckus is a ${catType} type.`);
// }

// const bill2 = () {
//     console.log(`
//             Bill is ${ageOfBill} isn't that cool
//                He's my dog ain't that special?
//         `);

// }

let stringNumber = "67";
let sum = +stringNumber + 2;
console.log(sum);

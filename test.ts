const myarray = [1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14,15];

const evenNumbers = myarray.filter(x => x % 2 == 0);
console.log(`Even Numbers in Array : ${evenNumbers}`);


let sorted = myarray.sort((a,b) => b -a );
console.log(sorted);


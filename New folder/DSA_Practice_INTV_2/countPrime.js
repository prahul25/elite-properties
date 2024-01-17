// Q.1 Count the no. of prime number less than N

// Only to check given no. is prime or not

// Optimized Approach 1 time: O(n*sqrt(n)) space: O(1)

// function countPrime(n) {
//     if(n <=1){
//         return `${n} is not prime number. Prime number starts from 2`
//     }
//     let counter = 0;
//     for (let i = 2; i <= n; i++){
//         if(checkPrime(i))counter++;
//     }
//     return counter;
// }

// function checkPrime(n) {
//     for (let i = 2; i*i <= n; i++) {
//         if(n % i === 0)return false;
//     }
//     return true;
// }

// console.log(countPrime(5))

// Optimized Approach 2 time: O(n*log n) space: O(1)

// function countPrime(n) {
//     if(n <=1){
//         return `${n} is not prime number. Prime number starts from 2`
//     }
//     let counter = 0;
//     for (let i = 2; i <= n; i++){
//         if(checkPrime(i))counter++;
//     }
//     return counter;
// }

// function checkPrime(n) {
//     for (let i = 2;i <= n/2; i++) {
//         if(n % i === 0)return false;
//     }
//     return true;
// }

// console.log(countPrime(10))
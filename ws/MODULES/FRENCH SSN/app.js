import SSN from "french-ssn";

"use strict";

console.log(SSN.parse("2 97 06 99 416 308 55").approximateAge);

const someone = SSN.parse("2 97 06 99 416 308 55");
someone.approximateAge = 75;
console.log(someone);

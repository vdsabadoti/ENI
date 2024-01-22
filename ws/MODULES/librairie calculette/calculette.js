function addition(a, b) {
  return a + b;
}
function soustraction(a, b) {
  return a - b;
}
function multiplication(a, b) {
  return a * b;
}
function division(a, b) {
  if (b === 0) {
    throw new Error("La division par zéro n'est pas autorisée");
  }
  return a / b;
}
 export { addition, soustraction, multiplication, division };
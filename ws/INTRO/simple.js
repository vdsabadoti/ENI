let cities = "Paris, Nantes, Quimper";
cities = cities.split(", ");
console.log(cities);
console.log(cities.map((city) => city.toUpperCase()));

function test(cities){
    cities.forEach(city => {
        city = city.toUpperCase();
    });
}

test(cities);

console.log(cities);
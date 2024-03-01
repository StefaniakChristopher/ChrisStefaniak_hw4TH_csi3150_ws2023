
// slider logic
window.onload = function(){
  myMinSlide();
  myMaxSlide();
}

let myMinSlider = document.getElementById("my-slider1")
let myMaxSlider = document.getElementById("my-slider2")
let displayMyMinValue = document.getElementById("my-value-1")
let displayMyMaxValue = document.getElementById("my-value-2")

let mySliderTrack = document.querySelector(".my-slider-track")
let sliderMinValue = document.getElementById("my-slider1").min
let sliderMaxValue = document.getElementById("my-slider1").max
let minGap = 0

const myMinSlide = () => {
  if(parseInt(myMaxSlider.value) - parseInt(myMinSlider.value) <= minGap) {
    myMinSlider.value = parseInt(myMaxSlider.value) - minGap
  }
  displayMyMinValue.textContent = myMinSlider.value
  fillColor()
}

const myMaxSlide = () => {
  if(parseInt(myMaxSlider.value) - parseInt(myMinSlider.value) <= minGap) {
    myMaxSlider.value = parseInt(myMinSlider.value) + minGap
  }
  displayMyMaxValue.textContent = myMaxSlider.value
  fillColor()
}

const fillColor = () => {
  const percent1 = ((myMinSlider.value-sliderMinValue) / (sliderMaxValue-sliderMinValue)) * 100;
  const percent2 = ((myMaxSlider.value-sliderMinValue) / (sliderMaxValue-sliderMinValue)) * 100;
  mySliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}






// Car Cards
function createCarCard(car) {

  const { year, make, model, mileage, price, color, gasMileage } = car;

  const imagePath = `./fivenightsatfredddys/img/${model}.jpg`;

  const cardTemplate = `
    <div class="column">
        <div class="card">
            <a class="card-media" href="./img-01.jpeg">
                <img src="${imagePath}" alt="${color} ${model}" />
            </a>
            <div class="card-content">
                <div class="card-header">
                    <div class="left-content">
                        <h3 style="font-weight: 600">${year} ${make} ${model}</h3>
                        <span style="color: #12efec">Price: $${price}</span>
                    </div>
                    <div class="right-content">
                        <a href="#" target="_blank" class="card-btn"> Inquire </a>
                    </div>
                </div>
                <div class="info">
                    <p>${mileage} miles</p>
                    <p>${gasMileage}</p>
                </div>
            </div>
        </div>
    </div>
  `;
  return cardTemplate;
}


function clearResults() {
  result.innerHTML = "";
}


function showResults(cars) {
  clearResults()
  const newContent = cars.map(createCarCard).join("");
  result.innerHTML += newContent || "<p> No Results Found. Please filter again. </p>";
}

// when the filter button is clicked
async function handleFilterResults(e) {

  const carMake = document.getElementById('car-make').value
  const carColor = document.getElementById('car-color').value
  const mileage = document.getElementById('mileage').value
  const maxPrice = document.getElementById('max-price').value
  const minMY = document.getElementById('my-slider1').value
  const maxMY = document.getElementById('my-slider2').value
  console.log("debug inside handleSearch function...");

  e.preventDefault();
  let filterCars = usedCars
  carMake ? filterCars = filterCarMake(filterCars, carMake) : filterCars
  carColor ? filterCars = filterCarColor(filterCars, carColor) : filterCars
  mileage ? filterCars = filterCarMileage(filterCars, mileage) : filterCars
  maxPrice ? filterCars = filterCarPrice(filterCars, maxPrice) : filterCars
  filterCars = filterCarModelYear(filterCars, minMY, maxMY)
  showResults(filterCars)
}

// various filters
const filterCarMake = (cars, carMake) => {
  const filteredCars = cars.filter( (car) => {
    return car.make == carMake
  })

  return filteredCars
}

const filterCarColor = (cars, carColor) => {
  const filteredCars = cars.filter( (car) => {
    return car.color == carColor
  })

  return filteredCars
}

const filterCarMileage = (cars, mileage) => {
  const filteredCars = cars.filter( (car) => {
    return car.mileage <= mileage
  })

  return filteredCars
}

const filterCarPrice = (cars, maxPrice) => {
  const filteredCars = cars.filter( (car) => {
    return parseInt(car.price) <= parseInt(maxPrice)
  })

  return filteredCars
}

const filterCarModelYear = (cars, minMY, maxMY) => {
  const filteredCars = cars.filter( (car) => {
    console.log("cars year " + car.year)
    return parseInt(car.year) <= parseInt(maxMY) && parseInt(car.year) >= parseInt(minMY)
  })

  return filteredCars
}

const form = document.getElementById("search-form");
form.addEventListener("submit", handleFilterResults);

const init = () => {
  clearResults();
  showResults(usedCars)
}

init();

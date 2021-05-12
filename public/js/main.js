const sbmBtn = document.getElementById('sbmBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const tempValue = document.getElementById('temp_value');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');
const day=document.getElementById('day');
const date=document.getElementById('date');
const week=new Array(7);
week[0]="Sunday";
week[1]="Monday";
week[2]="Tuesday";
week[3]="Wednesday";
week[4]="Thursday";
week[5]="Friday";
week[6]="Saturday";

const month=[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
const dateobj=new Date();
day.innerText=week[dateobj.getDay()];
date.innerText=`${month[dateobj.getMonth()]} ${dateobj.getDate()}`;
const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerHTML = "<h1>No Results Found</h1>";
        datahide.classList.add('data_hide');
    }
    else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=b14425a6554d189a2d7dc18a8e7d7263`;
            const resp = await fetch(url);
            const obj = await resp.json();
            datahide.classList.remove('data_hide');
            city_name.innerText = `${obj.name} , ${obj.sys.country}`;
            tempValue.innerText = obj.main.temp;
            const tempMood = obj.weather[0].main;
            temp_status.innerText = tempMood;

            console.log(obj);

            if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain style='color:#a4b0be'></i>";
            }
            else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud style='color:#f1f2f6'></i>";
            }
            else {
                temp_status.innerHTML = "<i class='fas fa-sun style='color:#eccc68'></i>";

            }
        }
        catch {
            city_name.innerText = "Enter A Valid City Name";
            datahide.classList.add('data_hide');
        }
    }
};


sbmBtn.addEventListener('click', getInfo);
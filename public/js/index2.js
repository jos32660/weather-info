//전역변수선언
var key = 'b06f5fcc28a3c5dd4be148aed70d266b';
var units = 'metric';
var dailyAPI = 'https://api.openweathermap.org/data/2.5/weather';
var weeklyAPI = 'https://api.openweathermap.org/data/2.5/forecast';
var cityURL = '../json/city.json';
var dailyURL = dailyAPI + '?appid=' + key + "&units=" + units;
var weeklyURL = weeklyAPI + '?appid=' + key + "&units=" + units;


var n = Math.floor(Math.random()*3);
$(".weather").eq(n).css("display","block");

init();

function init() {
	wrapChg("M");
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = cityFn;
	ajax.open('GET', cityURL, true);
	ajax.send();
}

//네비게이션 이벤트 처리
for(var v of document.querySelectorAll(".navi > li")){
	v.addEventListener("click", (e) =>{
		switch(e.target.outerText){
			case "DAILY":
				wrapChg("D");
				break;
			case "WEEKLY":
				wrapChg("W");
				break;
			default:
			 init();
			 break;
		}
	});
}

function wrapChg(type) {
	const _daily = document.querySelector(".daily");
	const _weekly = document.querySelector(".weekly");
	const _main = document.querySelector(".main");
	switch (type) {
		case "D":
			_daily.classList.add("d-block");
			_daily.classList.remove("d-none");
			_weekly.classList.add("d-none");
			_weekly.classList.remove("d-block");
			_main.classList.add("d-none");
			_main.classList.remove("d-block");
			break;
		case "W":
			_daily.classList.add("d-none");
			_daily.classList.remove("d-block");
			_weekly.classList.add("d-block");
			_weekly.classList.remove("d-none");
			_main.classList.add("d-none");
			_main.classList.remove("d-block");
			break;
		default:
			_daily.classList.add("d-none");
			_daily.classList.remove("d-block");
			_weekly.classList.add("d-none");
			_weekly.classList.remove("d-block");
			_main.classList.add("d-block");
			_main.classList.remove("d-none");
			break;
	}
}

function cityFn() {
		if (this.readyState == 4 && this.status == 200) {
			var _city = document.querySelector("#cities");
			var res = JSON.parse(this.responseText).cities;
			_city.innerHTML = '<option value="" selected>Please choose a city.</option>';
			for(var v of res) _city.innerHTML += `<option value="${v.id}">${v.name}</option>`
			/*
			var elem;
			var cityName;
			elem = document.createElement('option'); 	
			cityName = document.createTextNode("Please choose a city");
			elem.appendChild(cityName);	
			elem.setAttribute("value", "");
			elem.setAttribute("selected", "selected");
			citySelect.appendChild(elem);
			for (var i in cities) {
				elem = document.createElement('option'); 							//tag를 만든다. 단 DOM에 적용되기 전단계
				cityName = document.createTextNode(cities[i].name);	  //tag 안에 삽입될 텍스트를 만든다.
				elem.setAttribute("value", cities[i].id);							//생성된 tag에 속성을 준다.
				elem.appendChild(cityName);														//생성된 tag에 생성된 텍스트를 붙인다.
				citySelect.appendChild(elem);													//생성된 tag를 원하는 DOM의 Element에 붙인다.
			}

			//jQuery select change 이벤트
			
			$("#cities").change(function(){
				$(this).val();
			});
			*/

			//ES5, ES6 change 이벤트
			//citySelect.addEventListener(이벤트, 콜백함수);
			_city.addEventListener("change", function(e){
				var ajax = new XMLHttpRequest();
				ajax.onreadystatechange = dailyFn;
				ajax.open('GET', dailyURL + "&id=" + e.target.value, true);
				ajax.send();
				var ajax2 = new XMLHttpRequest();
				ajax2.onreadystatechange = weeklyFn;
				ajax2.open('GET', weeklyURL + "&id=" + e.target.value, true);
				ajax2.send();
			});
		}
}

//데일리 정보 가져오기
function dailyFn(){
	if(this.readyState == 4 && this.status == 200){
		let res = JSON.parse(this.responseText);
		var wts = new Date();
		console.log(res);
		let iconSrc = `../img/icon/${res.weather[0].icon}.png`;
		let desc = `<b>${res.weather[0].main}</b>`;
		let temp = `<b>${res.main.temp}</b>˚C`;
		let hum = `<span>${res.main.humidity}%</span>`;
		let humTit ='<span>Humidity</span>';
		let wind = `<span>${res.wind.speed}km/h</span>`;
		let windTit ='<span>Wind</span>';
		let time = `<span>${dspDate(wts, 5)}</span> &nbsp; <span>${dspDate(wts, 6)}</span>`;
		let _wrap = document.querySelector(".daily").querySelector(".conts");
		let _title = document.createElement("div");
		let _time = document.createElement("div");
		let _img = document.createElement("div");
		let _sub = document.createElement("div");
		let _temp = document.createElement("div");
		let _desc = document.createElement("div");
		let _subs = document.createElement("div");
		let _sub2 = document.createElement("div");
		let _hum = document.createElement("div");
		let _humTit = document.createElement("div");
		let _sub3 = document.createElement("div");
		let _wind = document.createElement("div");
		let _windTit = document.createElement("div");
		_title.innerHTML = `${res.name}`;
		_time.innerHTML = time;
		_img.innerHTML = `<img src="${iconSrc}" class="w-100 daily-img">`;
		_temp.innerHTML = temp;
		_desc.innerHTML = desc;
		_hum.innerHTML = hum;
		_humTit.innerHTML = humTit;
		_wind.innerHTML = wind;
		_windTit.innerHTML = windTit;
		_title.setAttribute("class","text-left pt-5 pb-1 px-3 fa-3x w-tit");
		_time.setAttribute("class","daily-time");
		_img.setAttribute("class","text-center py-3");
		_sub.setAttribute("class","daily-sub text-center");
		_desc.setAttribute("class","py-3 daily-d");
		_temp.setAttribute("class","py-1 daily-t");
		_subs.setAttribute("class","d-flex daily-sub2");
		_sub2.setAttribute("class","m-auto text-center");
		_hum.setAttribute("class","text-center py-3 px-2 d-inline-block f-2");
		_humTit.setAttribute("class","f-1 color-s");
		_sub3.setAttribute("class","m-auto text-center");
		_wind.setAttribute("class","text-center py-3 px-2 d-inline-block f-2");
		_windTit.setAttribute("class","f-1 color-s");
		_wrap.innerHTML = '';
		_wrap.appendChild(_title);
		_wrap.appendChild(_time);
		_wrap.appendChild(_img);
		_wrap.appendChild(_sub);
		_sub.appendChild(_desc);
		_sub.appendChild(_temp);
		_wrap.appendChild(_subs);
		_subs.appendChild(_sub2);
		_sub2.appendChild(_hum);
		_sub2.appendChild(_humTit);
		_subs.appendChild(_sub3);
		_sub3.appendChild(_wind);
		_sub3.appendChild(_windTit);
		// _wrap.appendChild(_desc);
		// _wrap.appendChild(_temp);
		wrapChg("D");
	}
}

//위클리 정보 가져오기
function weeklyFn(){
	if (this.readyState == 4 && this.status == 200) {
		let res = JSON.parse(this.responseText);
		var kts;
	  	var html = '';
	 	 var _conts = document.querySelector(".weekly > .conts");
	  	_conts.innerHTML = '';
	 	for(var v of res.list){
		kts = new Date(new Date(v.dt_txt).getTime() + (9*60*60*1000));
		html = `
	 	<li class="w-item">
		<div>
		<img src="../img/icon/${v.weather[0].icon}.png" alt="" class="w-100">
		</div>
		<ul class="ml-5">
		<li class="w-temp"><span>${v.main.temp}</span>˚C</li>
		<li class="w-desc">
		<span>${v.weather[0].main}</span>
		<span>${v.weather[0].description}</span>
		</li>
		<li class="w-date">${dspDate(kts, 2)}</li>
		</ul>
	 	</li>`;
		_conts.innerHTML += html;
	 }
	}
}
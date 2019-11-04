//전역변수선언
var key = 'b06f5fcc28a3c5dd4be148aed70d266b';
var units = 'metric';
var dailyAPI = 'https://api.openweathermap.org/data/2.5/weather';
var weeklyAPI = 'https://api.openweathermap.org/data/2.5/forecast';
var cityURL = '../json/city.json';
var dailyURL = dailyAPI + '?appid=' + key + "&units=" + units;
var weeklyURL = weeklyAPI + '?appid=' + key + "&units=" + units;

//프로그램시작
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
	const _daily = document.querySelector(".wrap-daily");
	const _weekly = document.querySelector(".wrap-weekly");
	const _main = document.querySelector(".wrap-main");
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
//도시 정보 가져오기
function cityFn() {
	if (this.readyState == 4 && this.status == 200) {
		var _city = document.querySelector("#cities");
		var res = JSON.parse(this.responseText).cities;
		_city.innerHTML = '<option value="" selected>Please choose a city.</option>';
		for(var v of res) _city.innerHTML += `<option value="${v.id}">${v.name}</option>`
		/*
		var _elem = document.createElement('option');
		var title = document.createTextNode('Please choose a city.');
		_elem.appendChild(title);
		_elem.setAttribute("value", "");
		_elem.setAttribute("selected", "selected");
		_city.innerHTML = "";
		_city.appendChild(_elem);
		for (var i in res) {
			_elem = document.createElement('option');
			title = document.createTextNode(res[i].name);
			_elem.setAttribute("value", res[i].id);
			_elem.appendChild(title);
			_city.appendChild(_elem);
		}
		*/
		_city.addEventListener("change", function (e) {
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
		let iconSrc = `../img/icon/${res.weather[0].icon}.png`;
		let temp = `Now temperature: <b>${res.main.temp}</b>˚C &nbsp&nbsp | &nbsp&nbsp`;
		let desc = `Now weather: <b>${res.weather[0].main}</b>`;
		let _wrap = document.querySelector(".wrap-daily").querySelector(".conts");
		let _title = document.createElement("div");
		let _img = document.createElement("div");
		let _temp = document.createElement("span");
		let _desc = document.createElement("span");
		_title.innerHTML = 'Today weather';
		_img.innerHTML = `<img src="${iconSrc}" class="w-100 daily-img">`;
		_temp.innerHTML = temp;
		_desc.innerHTML = desc;
		_title.setAttribute("class","text-center py-3 fa-3x w-tit");
		_img.setAttribute("class","text-center py-3");
		_temp.setAttribute("class","text-center py-3 d-inline-block fa-1x");
		_desc.setAttribute("class","text-center py-3 d-inline-block fa-1x");
		_wrap.innerHTML = '';
		_wrap.appendChild(_title);
		_wrap.appendChild(_img);
		_wrap.appendChild(_temp);
		_wrap.appendChild(_desc);
		wrapChg("D");
	}
}

//위클리 정보 가져오기
function weeklyFn(){
	if (this.readyState == 4 && this.status == 200) {
		let res = JSON.parse(this.responseText);
		var kts;
	  var html = '';
	  var _conts = document.querySelector(".wrap-weekly > .conts");
	  _conts.innerHTML = '';
	 for(var v of res.list){
		kts = new Date(new Date(v.dt_txt).getTime() + (9*60*60*1000));
		html = `
	 <li class="w-item">
		<div>
		<img src="../img/icon/${v.weather[0].icon}.png" alt="" class="w-100">
		</div>
		<ul>
		<li class="w-temp"><span>${v.main.temp}</span>˚C</li>
		<li class="w-desc">
		<span>${v.weather[0].main}</span>
		<span>${v.weather[0].description}</span>
		</li>
		<li class="w-date">${dspDate(kts, 2)}forecast</li>
		</ul>
	 </li>`;
		_conts.innerHTML += html;
	 }
	}
}
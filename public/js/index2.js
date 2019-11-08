//전역변수
var ajax = new XMLHttpRequest();
var dailyAjax = new XMLHttpRequest();
var weeklyAjax = new XMLHttpRequest();
var key = 'b06f5fcc28a3c5dd4be148aed70d266b';
var dailyAPI = 'https://api.openweathermap.org/data/2.5/weather';
var weeklyAPI = 'https://api.openweathermap.org/data/2.5/forecast';

cityInit();
function cityInit() {
	ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var cities = JSON.parse(this.responseText).cities;
			//id로 DOM 접근하기 - jQuery
			var $citySelect = $("#cities");
			//id로 DOM 접근하기 - ES5
			var citySelect5 = document.getElementById("cities");
			//id로 DOM 접근하기 - ES6
			var citySelect = document.querySelector("#cities");
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
			/*
			$("#cities").change(function(){
				$(this).val();
			});
			*/

			//ES5, ES6 change 이벤트
			//citySelect.addEventListener(이벤트, 콜백함수);
			citySelect.addEventListener("change", function(){
				var cityId = this.value;
				var dailyURL = dailyAPI + "?appid=" + key + "&id=" + cityId;
				dailyAjax.onreadystatechange = function(){
					if (this.readyState == 4 && this.status == 200) {
						var daily = JSON.parse(this.responseText);
						console.log(daily);
					}
				};
				dailyAjax.open("GET", dailyURL, true);
				dailyAjax.send();
			});
		}
	};
	ajax.open("GET", "../json/city.json", true);
	ajax.send();
}
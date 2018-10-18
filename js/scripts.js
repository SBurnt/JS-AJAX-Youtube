// Youtube viewer
// Внести в html поле input и кнопку "Искать"
// Использовать следующее API:
// https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBrmaj7j0yIJGWcGPYH3THz_Rh8BYAtlQs&q=ИСКОМАЯ_ФРАЗА&type=video
// где "ИСКОМАЯ_ФРАЗА" должна заменяться на текст из поля, который заполняете вы. 
// Изучить ответ, там будет 5 элементов, описывающих видео-ролики. Взять первый, и для него создать разметку
// Код для плеера:
// <iframe width="560" height="315" src="https://www.youtube.com/embed/ВИДЕО_ID" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
// где "ВИДЕО_ID" это ключ videoId, который вы должны увидеть к ответе от API
// Сделать так, чтобы плееры не плодились при повторном поиске, а заменялись друг на друга

var btnSearch = document.getElementById("btnSearch");
var inputSearch = document.getElementById("inputSearch");
var videoPlayerIframe = document.getElementById("videoPlayerIframe");
var videoMini = document.querySelector(".videoMini");

function httpGet(url) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.onload = function () {
			resolve(xhr.response);
		}
		xhr.onerror = function () {
			reject("badRequest (400) invalidVideoId");
		}
		xhr.responseType = "json"; // перед отправкой указываем что бы пришол распарсенные данные.
		// Это вместо JSON.parse(xhr.response) в xhr.onload
		xhr.send();
	});
}

btnSearch.onclick = function () {
	var inSearchUrlYoutube = inputSearch.value;
	var urlYoutube = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBrmaj7j0yIJGWcGPYH3THz_Rh8BYAtlQs&q=" + inSearchUrlYoutube + "&type=video";
	// console.log(inSearchUrlYoutube);

	httpGet(urlYoutube).then(function (data) {
		// console.log("JSON Video");
		// console.log(data);

		renderArrVideoId(data);
		// console.log("Mass Video");
		// console.log(arrVideoId);

		renderMarkupVideoId(arrVideoId);
		renderMarkupVideoIdMini(arrVideoId);
		arrVideoId = [];
	});
}

var arrVideoId = [];

function renderArrVideoId(videoid) {
	arrVideoId.push(videoid);
}

function renderMarkupVideoId(videoid) {
	for (var i = 0; i < 1; i++) {
		createVideoId(videoid[0].items[0].id, i);
	}
}

function renderMarkupVideoIdMini(videoid) {
	videoMini.innerHTML = "";
	for (var i = 0; i < 5; i++) {
		createVideoIdMini(videoid[0].items[i].id, videoid[0].items[i].snippet.thumbnails.default,
			videoid[0].items[i].snippet.thumbnails.default, videoid[0].items[i].snippet.thumbnails.default, i);
	}
}

function createVideoId(videoId, index) {
	videoPlayerIframe.src = "https://www.youtube.com/embed/" + videoId.videoId;
}

function createVideoIdMini(videoId, urlImg, widthImg, heightImg, index) {
	var newImgMini = document.createElement("img");
	newImgMini.className = "videoPlayerImgMini";
	newImgMini.src = urlImg.url;
	newImgMini.width = widthImg.width;
	newImgMini.height = heightImg.height;
	videoMini.appendChild(newImgMini);

	newImgMini.onclick = function () {
		createVideoId(videoId);
	}
}


// ВТОРОЙ СПОСОБ ПОЛУЧЕНИЯ ДАННЫХ JSON ПО API
// console.log(fetch);
// fetch(gitHubUrl).then(function(data){   // объект fetch это вместо вместо всего что мы писали return new Promise(function(resolve, reject){
// 	return data.json(); // распарсиваем json
// }).then(function(data){
// 	console.log(data); // работа с данными
// });


/// callback
/// promise = object

// function first(callback) {
// 	setTimeout(function(){
// 		console.log("первый");
// 		callback();
// 	}, 1000);
// }

// function second() {
// 	console.log("Второй");
// }
// first(second);


//var promise = new Promise();
// pending - ожидание
// resolve - успешное выполнение
// reject - неуспешное выполнение


// var gitHubUrl = "https://api.github.com/users/SBurnt";
// httpGet(gitHubUrl).then(function(data){
// 	console.log(data);
// 	var avatar = data.avatar_url;

// 	var newAvatar = document.createElement("img");
// 	newAvatar.src = avatar;
// 	newAvatar.className = "avatar";
// 	newAvatar.alt = "logo";
// 	document.body.appendChild(newAvatar);

// 	setTimeout(function(){   // удаляем картинку через 3 секи
// 		newAvatar.remove();
// 	}, 3000);
// });
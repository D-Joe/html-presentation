var title=document.getElementById('title');
var ending=document.getElementById('ending');
var slides=document.getElementById('slides');
var slide=document.getElementsByClassName('slide');
var show=document.getElementById('show');
var progressbar=document.getElementById('progress');

var numberOfSlides;
var page=-1;

function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path,true);
    httpRequest.send(); 
}

window.onload = function() {
	fetchJSONFile('slides.json', function(data){
		title.innerHTML='<div class="center"><h1>'+data.title+'</h1>'+'<h3>'+data.subtitle+'</h3></div>';
		
		for (var i = 0; i < Object.keys(data.slides).length; i++)
		{
			var bulletPoints = '';
			for (var j = 0; j < Object.keys(data.slides[i].bulletPoints).length; j++)
			{
				bulletPoints = bulletPoints + '<li id="'+j+'" class="'+data.slides[i].bulletPoints[j].css+'">'+data.slides[i].bulletPoints[j].text+'</li>';
			}
			slides.innerHTML= slides.innerHTML +
								'<div class="slide">'+
									'<h1 class="slidetitle">'+data.slides[i].slidetitle+'</h1>'+
									'<ul id="list">'+
										bulletPoints +
									'</ul>'+
								'</div>';
		}
		
	
		show.innerHTML=title.innerHTML;
		progressbar.style.display='none';
		
		numberOfSlides=document.getElementsByClassName('slide').length;
		
		ending.innerHTML='<div class="center"><h1>'+data.end+'</h1></div>';
		
		progressbar.max = numberOfSlides;
	});
}
document.onkeydown = checkKey;

function checkKey(e) {
	e = e || window.event;
	
	if (e.keyCode == '37') {		//left Key
		if(page < 0) {
			page = -1;
			changePage(page);
		} else if(page >= 0) {
			page -= 1;
			changePage(page);
		}
	}
var bla = document.getElementById('list');
	if (e.keyCode == '39') {		//right Key
		if(page >= numberOfSlides -1) {
			page = numberOfSlides;
			changePage(page);
		}
		else {
			page += 1;
			changePage(page);
		}
	}
}

function changePage(page) {
	if (page < 0) {
		//Title
		show.innerHTML=title.innerHTML;
		progressbar.style.display='none';
	} else if (page >= 0 && page <= numberOfSlides - 1) {
		//Slides
		show.innerHTML=slide[page].innerHTML;
		progressbar.style.display='';
		progressbar.value = page + 1;
	} else if (page > numberOfSlides - 1) {
		//Ending
		progressbar.style.display='none';
		show.innerHTML=ending.innerHTML;
	}
}
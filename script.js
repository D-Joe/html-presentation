var title=document.getElementById('title');
var ending=document.getElementById('ending');
var slides=document.getElementById('slides');
var slide=document.getElementsByClassName('slide');
var show=document.getElementById('show');

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
		title.innerHTML='<h1>'+data.title+'</h1>'+'<h3>'+data.subtitle+'</h3>';
		ending.innerHTML='<h1>'+data.end+'</h1>';
		
		for (var i = 0; i < Object.keys(data.slides).length; i++)
		{
			var points = '';
			for (var j = 0; j < Object.keys(data.slides[i].points).length; j++)
			{
				points = points + '<li>'+data.slides[i].points[j]+'</li>';
			}
			slides.innerHTML= slides.innerHTML +
								'<div class="slide">'+
									'<h1>'+data.slides[i].slidetitle+'</h1>'+
									'<ul>'+
										points +
									'</ul>'+
								'</div>';
		}
		
		show.innerHTML=title.innerHTML;
		numberOfSlides=document.getElementsByClassName('slide').length;
	});
}
document.onkeydown = checkKey;

function checkKey(e) {
	e = e || window.event;
	
	if (e.keyCode == '37') {		//right Key
		if(page < 0) {
			page = -1;
			changePage(page);
		} else if(page >= 0) {
			page -= 1;
			changePage(page);
		}
	}

	if (e.keyCode == '39') {		//left Key
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
	} else if (page >= 0 && page <= numberOfSlides - 1) {
		//Slides
		show.innerHTML=slide[page].innerHTML;

	} else if (page > numberOfSlides - 1) {
		//Ending
		show.innerHTML=ending.innerHTML;
	}
}
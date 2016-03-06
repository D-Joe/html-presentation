document.onkeydown = checkKey;

var page=-1;
var revealed=0;
var hidden=0;

var numberOfSlides=document.getElementsByClassName('slide').length;

var title=document.getElementById('title');
var slides=document.getElementsByClassName('slide');
var ending=document.getElementById('ending');

var show=document.getElementById('show');

show.innerHTML=title.innerHTML;

function checkKey(e) {
	e = e || window.event;
	
	if (e.keyCode == '37') {		//right Key
		//alert("last page");
		if(page < 0) {
			page = -1;
			changePage(page);
		} else if(page >= 0) {
			page -= 1;
			changePage(page);
		}
	}

	if (e.keyCode == '39') {		//left Key
		//alert("next page");
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
		//alert("Title");
		//changeVisibilityByID('show','none');
		//changeVisibilityByClass('title','block');
		show.innerHTML=title.innerHTML;
	} else if (page >= 0 && page <= numberOfSlides - 1) {
		//alert("Page " + page);
		//changeVisibilityByClass('title','none');
		//changeVisibilityByID('ending','none');
		//changeVisibilityByID('show','block');

		show.innerHTML=slides[page].innerHTML;

	} else if (page > numberOfSlides - 1) {
		//alert("Ending");
		show.innerHTML=ending.innerHTML;
	}
}

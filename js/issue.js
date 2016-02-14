$(document).ready(function(){
	//-----
	//Initial declarations
	//-----	
	var $lbox = $('#link-box'),
		$loadingBox = $('.loading');
	
	var urls = [],
		index = 0;
		

	//------
	//AJAX request for data about this issue
	//------
	$.getJSON('../assets/json/issue1.json', function(data){ 
		var $links = $(data.links);

		$links.each(function(i, e){
		  createLinks(e);
		}) 

		infiniteScroll(urls);

	})

	function createLinks(el){
		var a = document.createElement('a')
		
		urls.push( el.href )

		a.innerHTML = el.name
		a.href = el.href
		$lbox.append(a)
		$lbox.append( document.createElement('br') )
	}

	//------------------
	//Infinite Scrolling
	//------------------
	function infiniteScroll(urlArr){
		var processing;

	    $(document).scroll(function(e){

	    	var urls = urlArr || [];

	        if (processing)
	            return false;

	        if ($(window).scrollTop() >= ($(document).height() - $(window).height())*0.7){
	        	$loadingBox.show();
	            processing = true;
	            $.post('../../html/' + urls[index], function(data){
	                $('#content-box').append(data);
	                processing = false;
	                index++;
	                $loadingBox.hide();
	            });
	        }
	    });
	}
});
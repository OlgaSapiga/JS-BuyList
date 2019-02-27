$(function(){
     function renderProduct(name){
		
		var PRODUCT_TEMPLATE = $('<div class="row" style="display:none">'+
            '<div class="row-product">'+
            '<span class="edit" disabled=""></span>'+
            '</div>'+
            '<div class="count">'+
                '<button class="btn minus" disabled="" data-tooltip="Remove 1 product">-</button>'+
                '<span class="label">1</span>'+
                '<button class="btn plus" data-tooltip="Add 1 product">+</button>'+
            '</div>'+
            '<div class="buttons">'+
                '<button class="bought" data-tooltip="Bought">Куплено</button>'+
                '<button class="not-bought" data-tooltip="Not bought" style="display:none">Не куплено</button>'+
                '<button class="delete" data-tooltip="Delete">x</button>'+
            '</div>'+
        '</div>');
        
		PRODUCT_TEMPLATE.find('.row-product span').text(name);
		PRODUCT_TEMPLATE.find('.plus').click(function(){
			 var count=parseInt(PRODUCT_TEMPLATE.find(".label").text(),10);

            if(count>=1){
                 PRODUCT_TEMPLATE.find(".minus").attr('disabled',false);
            }
            count++;

            PRODUCT_TEMPLATE.find(".label").text(count);
            PRODUCT_LEFT.find('.amount').text(count);
            PRODUCT_BOUGHT.find('.amount').text(count);
		});
         
         PRODUCT_TEMPLATE.find('.minus').click(function(){
			 var count=parseInt(PRODUCT_TEMPLATE.find(".label").text(),10);
            if(count<=2){
                 PRODUCT_TEMPLATE.find(".minus").attr('disabled',true);
                count=1;
            }
            if(count>1){
            count--;
             }
            PRODUCT_TEMPLATE.find(".label").text(count);
            PRODUCT_LEFT.find('.amount').text(count);
            PRODUCT_BOUGHT.find('.amount').text(count);
		});
         
        PRODUCT_TEMPLATE.find('.delete').click(function(){
             PRODUCT_TEMPLATE.slideUp(400,function(){
                 $(this).remove();
             });
             PRODUCT_LEFT.remove();
            PRODUCT_BOUGHT.remove();
        });
         
        PRODUCT_TEMPLATE.find('.bought').click(function () {
            PRODUCT_TEMPLATE.find('.bought').hide();
            PRODUCT_TEMPLATE.find('.minus').hide();
            PRODUCT_TEMPLATE.find('.plus').hide();
            PRODUCT_TEMPLATE.find('.not-bought').show();
            PRODUCT_TEMPLATE.find('.delete').hide();
            PRODUCT_TEMPLATE.find('.edit').attr('disabled',true);
            PRODUCT_TEMPLATE.find('.edit').css('text-decoration', 'line-through');
            PRODUCT_LEFT.hide();
            PRODUCT_BOUGHT.show().css('text-decoration', 'line-through');
         });
         
          PRODUCT_TEMPLATE.find('.not-bought').click(function () {
            PRODUCT_TEMPLATE.find('.bought').show();
            PRODUCT_TEMPLATE.find('.minus').show();
            PRODUCT_TEMPLATE.find('.plus').show();
            PRODUCT_TEMPLATE.find('.not-bought').hide();
            PRODUCT_TEMPLATE.find('.delete').show();
            PRODUCT_TEMPLATE.find('.edit').attr('disabled',false);
            PRODUCT_TEMPLATE.find('.edit').css('text-decoration', 'none');
            PRODUCT_LEFT.show();
            PRODUCT_BOUGHT.hide();
         });
         
    
      PRODUCT_TEMPLATE.find('.edit').click(function(){
         var label = $(this);
          label.after("<input type = 'text' style = 'display:none; box-shadow: 0 0 5px #4195fc; border: 0.5px solid #4195fc;color: rgba(0,0,0,.87); border-radius: 4px;'>");
           var textbox = $(this).next();
          textbox.val(label.html());
          label.click(function () {
            $(this).hide();
            $(this).next().show().focus();
        });
          textbox.focusout(function () {
            $(this).hide();
            $(this).prev().html($(this).val()); 
            PRODUCT_LEFT.find('.title').text($(this).val());
            PRODUCT_BOUGHT.find('.title').text($(this).val());
            $(this).prev().show();
        });
      });
         var PRODUCT_LEFT = $( '<span class="product-item">'+'<span class="title">'+name+'</span> '+'<span class="amount">1</span>'+'</span> ');
         var PRODUCT_BOUGHT =$( '<span class="product-item" style="display:none">'+'<span class="title">'+name+'</span> '+'<span class="amount" style="text-decoration:line-through">1</span>'+'</span> ');
         
        $('.list-of-items').append(PRODUCT_TEMPLATE); 
        PRODUCT_TEMPLATE.slideDown(400);
        $('.segment:nth-child(2)').append(PRODUCT_LEFT);
        $('.segment:nth-child(4)').append(PRODUCT_BOUGHT);
	}
    
     $('.add').click(function(){
		
		var inputField = $('.name-goods');
		var newElem = inputField.val();
		if(newElem!==""){
            inputField.val("");
            inputField.focus();
            renderProduct(newElem);
           }
	});
    
     $('.name-goods').keyup(function(event){
       if(event.keyCode == 13){
        $(".add").click();
		var inputField = $('.name-goods');
		var newElem = inputField.val();
		if(newElem!==""){
            inputField.val("");
            inputField.focus();
            renderProduct(newElem);
           }
       }
	});
    
	$('.add').submit(function(event){
		event.preventDefault();
	});
    
    renderProduct("Помідори");
    renderProduct("Печиво");
    renderProduct("Сир");
});

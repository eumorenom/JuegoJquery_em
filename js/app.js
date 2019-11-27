
//logica de efecto en el titulo
function f_colaEfectos(){

  capa = $(".main-titulo");
  capa.animate({

     "font-size": "3em",
     "color": "#DCFF0E"
  }, 1000);

  capa.animate({
     //"left": "100px",
     //"top": "20px",

     "color": "white"
  }, 3000, f_colaEfectos);
}

// logica de inicio de juego
   function f_iniciar(){
     console.log("Inicia el juego");
   	i=i+1
   	var numero=0;
   	var imagen=0;
    var insthtml="";
   	$(".elemento").draggable({disabled:true});
   	if(i<8){
   		for(var j=1;j<8;j++){
   			if($(".col-"+j).children("img:nth-child("+i+")").html()==null){
   				numero=Math.floor(Math.random()*4)+1;
   				imagen="image/"+numero+".png";
   				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start");

        /*  insthtml=".col-"+j;
          console.log("fila:"+ i + "columna: "+ j +"clase "+ insthtml+" imagen "+imagen);
          console.log ("<img src="+imagen+" class='elemento'/>");*/


   			}}}
   	if(i==8){
   	clearInterval(intervalo);
   	eliminar=setInterval(function(){
   		f_eliminarDulce()
   	},150);}
   };

   // plugin de intercambio

   jQuery.fn.swap=function(b){
     console.log("entra aplugin");
     b=jQuery(b)[0];
     var a=this[0];


     var t=a.parentNode.insertBefore(document.createTextNode(''),a);
     b.parentNode.insertBefore(a,b);
     t.parentNode.insertBefore(b,t);
     t.parentNode.removeChild(t);
     return this;
   };

   // logica de elimninacion de dulces

   function f_eliminarDulce(){
     console.log("eliminar dulce");
   	nroelem=0;
   	buscaenfila=f_analizafila();
   	buscaencolumna=f_analizacolumna();
   	for(var j=1;j<8;j++){
   		nroelem=nroelem+$(".col-"+j).children().length;}

   	// si no encuentra 3 dulces o más, llamamos a la función nuevos dulces

   	if(buscaenfila==0 && buscaencolumna==0 && nroelem!=49){
   		clearInterval(eliminar);
   		sw_buscardulcesnuevos=0;
   		nuevosDulces=setInterval(function(){
   			nuevosdulces()
   		},600);}

   	if(buscaenfila==1||buscaencolumna==1){
   		$(".elemento").draggable({disabled:true});
   		$("div[class^='col']").css("justify-content","flex-end");
   		$(".activo").hide("pulsate",1000,function(){
   			var puntaje_tr=$(".activo").length;
   			$(".activo").remove("img");
   			puntajeTotal=puntajeTotal+puntaje_tr*10;
   			$("#score-text").html(puntajeTotal);//Cambiamos la puntuación
   		});
   	}
   	if(buscaenfila==0 && buscaencolumna==0 && nroelem==49){
   		$(".elemento").draggable({
   			disabled:false,
   			containment:".panel-tablero",
   			revert:true,
   			revertDuration:0,
   			snap:".elemento",
   			snapMode:"inner",
   			snapTolerance:40,
   			start:function(event,ui){
   				movimientos=movimientos+1;
   				$("#movimientos-text").html(movimientos);}
   		});
   	}
   	$(".elemento").droppable({
   		drop:function (event,ui){
   			var dropped=ui.draggable;
   			var droppedOn=this;
   			espera=0;
   			do{
   				espera=dropped.swap($(droppedOn));}
   			while(espera==0);
   			buscaenfila=f_analizafila();
   			buscaencolumna=f_analizacolumna();
   			if(buscaenfila==0 && buscaencolumna==0){
   				dropped.swap($(droppedOn));}
   			if(buscaenfila==1 || buscaencolumna==1){
   				clearInterval(nuevosDulces);
   				clearInterval(eliminar);
   				eliminar=setInterval(function(){
   					f_eliminarDulce()
   				},150);}},
   	});
   };

   // logica para limpiar

   function f_limpiar(){

   	for(var j=1;j<8;j++){
      console.log ("limpiando");
		   $(".col-"+j).children("img").detach();


	  }
	 // alert("termino de limpiar");

   };



   // logica de control de tiempo

   function reloj(){
     console.log ("entra a controlar tiempo");

   	if(segundos!=0){
   		segundos=segundos-1;}
   	if(segundos==0){
   		if(minutos==0){
   			clearInterval(eliminar);
   			clearInterval(nuevosDulces);
   			clearInterval(intervalo);
   			clearInterval(tiempo);
   			$(".panel-tablero").hide("drop","slow",f_funcionScore);
   			$(".time").hide();}
   		segundos=59;
   		minutos=minutos-1;}
   	$("#timer").html("0"+minutos+":"+segundos);
   };

   // Función para poner el los movimientos y puntos de toda la pantalla

   function f_funcionScore(){
     console.log ("entra actualizar puntos");
   	$( ".panel-score" ).animate({width:'100%'},2000);
   };



   // logica de eliminacion

   function f_eliminarDulce(){
     console.log ("entra a borrar dulces");

   	nroelem=0;
   	buscaenfila=f_analizafila();
   	buscaencolumna=f_analizacolumna();
   	for(var j=1;j<8;j++){
   		nroelem=nroelem+$(".col-"+j).children().length;}

   	//logica  si no encuentra 3 dulces o más, se llama afuncion parea completar

   	if(buscaenfila==0 && buscaencolumna==0 && nroelem!=49){
   		clearInterval(eliminar);
   		sw_buscardulcesnuevos=0;
   		nuevosDulces=setInterval(function(){
   			nuevosdulces()
   		},600);}

   	if(buscaenfila==1||buscaencolumna==1){
   		$(".elemento").draggable({disabled:true});
   		$("div[class^='col']").css("justify-content","flex-end");
   		$(".activo").hide("pulsate",1000,function(){
   			var puntaje_tr=$(".activo").length;
   			$(".activo").remove("img");
   			puntajeTotal=puntajeTotal+puntaje_tr*10;
   			$("#score-text").html(puntajeTotal);//Cambiamos la puntuación
   		});
   	}
   	if(buscaenfila==0 && buscaencolumna==0 && nroelem==49){
   		$(".elemento").draggable({
   			disabled:false,
   			containment:".panel-tablero",
   			revert:true,
   			revertDuration:0,
   			snap:".elemento",
   			snapMode:"inner",
   			snapTolerance:40,
   			start:function(event,ui){
   				movimientos=movimientos+1;
   				$("#movimientos-text").html(movimientos);}
   		});
   	}
   	$(".elemento").droppable({
   		drop:function (event,ui){
   			var dropped=ui.draggable;
   			var droppedOn=this;
   			espera=0;
   			do{
   				espera=dropped.swap($(droppedOn));}
   			while(espera==0);
   			buscaenfila=f_analizafila();
   			buscaencolumna=f_analizacolumna();
   			if(buscaenfila==0 && buscaencolumna==0){
   				dropped.swap($(droppedOn));}
   			if(buscaenfila==1 || buscaencolumna==1){
   				clearInterval(nuevosDulces);
   				clearInterval(eliminar);
   				eliminar=setInterval(function(){
   					f_eliminarDulce()
   				},150);}},
   	});
   };



   // logica de adicionar nuevos dulces

   function nuevosdulces(){
     console.log ("entra a adicionar dulces");
   	$(".elemento").draggable({disabled:true});
   	$("div[class^='col']").css("justify-content","flex-start")
   	for(var j=1;j<8;j++){
   		vector_1[j-1]=$(".col-"+j).children().length;}
   	if(sw_buscardulcesnuevos==0){
   		for(var j=0;j<7;j++){
   			vector_2[j]=(7-vector_1[j]);}
   		maximo=Math.max.apply(null,vector_2);
   		cTotal=maximo;}
   	if(maximo!=0){
   		if(sw_buscardulcesnuevos==1){
   			for(var j=1;j<8;j++){
   				if(cTotal>(maximo-vector_2[j-1])){
   					$(".col-"+j).children("img:nth-child("+(vector_2[j-1])+")").remove("img");}}
   		}
   		if(sw_buscardulcesnuevos==0){
   			sw_buscardulcesnuevos=1;
   			for(var k=1;k<8;k++){
   				for(var j=0;j<(vector_2[k-1]-1);j++){
   					$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");}}
   		}
   		for(var j=1;j<8;j++){
   			if(cTotal>(maximo-vector_2[j-1])){
   				numero=Math.floor(Math.random()*4)+1;
   				imagen="image/"+numero+".png";
   				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>");}
   		}
   	}
   	if(cTotal==1){
   		clearInterval(nuevosDulces);
   		eliminar=setInterval(function(){
   			f_eliminarDulce()
   		},150);
   	}
   	cTotal=cTotal-1;
   };

   // logica de busqueda en filas

   function f_analizafila(){
     console.log ("entra a anlizar fila");
   	var vl_resfila=0;
   	for(var j=1;j<8;j++){
   		for(var k=1;k<6;k++){
   			var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src");
   			var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src");
   			var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src");
   			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
   				$(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
   				$(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
   				$(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
   				vl_resfila=1;
          /*console.log ("analizando fila:");
          console.log ("res1 "+ res1);
          console.log ("res2 "+ res2);
          console.log ("res3 "+ res3);*/
   			}
   		}
   	}
    //console.log ("vl_resfila:"+ vl_resfila);
   	return vl_resfila;
   };

   // logica de busqueda en columnas

   function f_analizacolumna(){
     console.log ("entra a anlizar columna");
   	var vl_rescol=0;
   	for(var l=1;l<6;l++){
   		for(var k=1;k<8;k++){
   			var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src");
   			var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src");
   			var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src");
   			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
   				$(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo");
   				$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo");
   				$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo");
   				vl_rescol=1;
   			}
   		}
   	}
    //console.log ("vj_rescol:"+ vl_rescol);
   	return vl_rescol;
   };

   //variables globales
   var i=0;
   var cTotal=0;
   var espera=0;
   var puntajeTotal=0;
   var movimientos=0;
   var minutos=2;
   var segundos=0;
   var sw_buscardulcesnuevos=0;
   var maximo=0;
   var nroelem=0;
   var intervalo=0;
   var eliminar=0;
   var nuevosDulces=0;
   var tiempo=0;
   var vector_1=["","","","","","",""];
   var vector_2=["","","","","","",""];
   var buscaenfila=0;
   var buscaencolumna=0;
//carga  logica  de titulo par que quede corriendo indefinidamente
   $(document).ready(function() {
     console.log ("entra a mostrar titulo del juego");
      f_colaEfectos();
      });

//logica de inicio y reinicio
   $(".btn-reinicio").click(function(){

	puntajeTotal=0;
  movimientos=0;
  	i=0;
    $(".time").show();
    $(".panel-tablero").show();

    $(".panel-score").css("width","30%");
    $("#score-text").html("0");

	$("#movimientos-text").html("0");
	$(this).html("Reiniciar")
	clearInterval(intervalo);
	clearInterval(eliminar);
	clearInterval(nuevosDulces);
	clearInterval(tiempo);

	minutos=2;
	segundos=0;
	f_limpiar();
	intervalo=setInterval(function(){
		f_iniciar()
	},500);
	tiempo=setInterval(function(){
		reloj()
	},1000);
});

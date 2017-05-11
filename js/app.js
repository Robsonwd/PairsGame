var memory_array = ['Pies','Pies','Kot','Kot','Koń','Koń','Lew','Lew','Tygrys','Tygrys','Żaba','Żaba','Słoń','Słoń','Wąż','Wąż','Ryba','Ryba','Zebra','Zebra','Ptak','Ptak','Pająk','Pająk', 'Mysz', 'Mysz', 'Motyl', 'Motyl'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('app').innerHTML = output;
}
function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = 'lightblue';
		tile.innerHTML = val;
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				memory_values = [];
            	memory_tile_ids = [];
				if(tiles_flipped == memory_array.length){
                        document.getElementById('app-result').innerHTML = "Board cleared... generating new board";                    
                    setTimeout(function(){
                        document.getElementById('app-result').innerHTML = "";
                    }, 1000);
					document.getElementById('app').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = 'orange';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'orange';
            	    tile_2.innerHTML = "";
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}
newBoard();
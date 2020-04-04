var time_periods = [];
var count = 0;
var update_rate = 3;
var time_period = 0;
var border = 20;
var max_time_period;
var current_player_data;
var player_ranks = new Object();

var img_arch_cape;
var img_arch_logo;
var img_arch;
var img_hero_mattock;

function setup() {
	split_raw_data();
	max_time_period = time_periods.length;
	getPlayerRanks();
	frameRate(30);
	createCanvas(screen.width, screen.height);
	background('#2d2d2d');
	current_player_data = getPlayerData();
	//console.log(player_ranks);
}

function draw() {
	clear();
	background('#2d2d2d');
	count++;
	if (count%update_rate == 0) {
		time_period ++;
		if (time_period == max_time_period) {
			time_period = max_time_period;
		}
		current_player_data = getPlayerData();
	}
	drawDetails();
	draw_players();
	if (time_period == max_time_period) {
		noLoop();
	}
}

function drawGraphFast(player, player_x , player_y, color) {
	stroke(color);
	strokeWeight(2);
	let line_width = 1200/(time_period+1);
	let tile_height = (screen.height - 40 - 400/3 - 10) / 25;
	let x_end = false;
	let y_end = false;
	let end_rank;
	for (let i = 0; i < time_period; i++) {
		i = Math.min(i, 431);
		let start_rank = player_ranks[player]['data'][i];
		end_rank = player_ranks[player]['data'][i+1];
		if (start_rank > 25 || end_rank > 25) {
			x_end = false;
			y_end = false;
			continue;
		}
		let x_start = 20+100+line_width*i;
		x_end = 20+100+line_width*(i+1);
		let y_start = 20+tile_height*(start_rank-0.5) + 400/3 + 10;
		y_end = 20+tile_height*(end_rank-0.5) + 400/3 + 10;
		line(x_start, y_start, x_end, y_end);
	}
	if (!x_end) {
		x_end = 20+100+line_width*(Math.min(431,time_period));
	}
	if (!y_end) {
		end_rank = player_ranks[player]['data'][Math.min(431,time_period)];
		y_end = 20+tile_height*(end_rank-0.5) + 400/3 + 10;
	}
	if (end_rank < 26) {
		if (time_period > 430) {
			console.log(x_end, y_end, player_x-10, player_y+tile_height*0.5);
		}
		line(x_end, y_end, player_x-10, player_y+tile_height*0.5-2)
	}
}

function drawGraph(player, player_x , player_y, color) {
	stroke(color);
	strokeWeight(2);
	let line_width = 1200/count;
	let tile_height = (screen.height - 40) / 25;
	let x_end = 20+100;
	let y_end;// = 20+tile_height*(start_rank-0.5)
	for (let i = 1; i <= Math.min(time_period,431); i++) {
		i = Math.min(i, 431);
		let start_rank = player_ranks[player]['data'][i-1];
		let end_rank = player_ranks[player]['data'][i];
		if (start_rank > 25 || end_rank > 25) {
			continue;
		}
		let line_height = tile_height*((end_rank-0.5) - (start_rank-0.5)) / update_rate;
		for (let j = 0; j < update_rate; j++) {
			let x_start = 20+100+line_width*((i-1)*update_rate+j);
			x_end = 20+100+line_width*((i-1)*update_rate+j+1);
			let y_start = 20+tile_height*(start_rank-0.5)+line_height*j;
			y_end = 20+tile_height*(start_rank-0.5)+line_height*(j+1);
			line(x_start, y_start, x_end, y_end);
			console.log(x_start, y_start, x_end, y_end);
		}
	}
	if (time_period < 432) {
		line(x_end, y_end, player_x-50, player_y+tile_height*0.5)
	}
}

function drawDetails() {
	let tile_height = (screen.height - 40 - 400/3 - 10) / 25;
	let box_height = tile_height - 6;
	let box_width = box_height;
	let corner_rounding = 15;
	let left_margin = 40;
	for (let i = 0; i < 25; i++) {
		let top_margin = 20+2+i*tile_height+400/3 + 10;

		strokeWeight(1);
		stroke('#1d1d1d');
		line_top_margin = top_margin+box_height+3;
		if (i != 24) {
			line(left_margin, line_top_margin, left_margin+100+1300+20, line_top_margin)
		}

		strokeWeight(3);
		stroke('black');
		let tile_color = '#5d5d5d';
		let text_color = 'white';
		let player_emoji = ' ';
		/*if (i == 0) {
			tile_color = '#FFD700';
			text_color = 'black';
		} else if (i == 1) {
			tile_color = '#C0C0C0';
			text_color = 'black';
		} else if (i == 2) {
			tile_color = '#cd7f32';
			text_color = 'black';
		}*/
		fill(tile_color);
		rect(left_margin, top_margin, box_width, box_height, corner_rounding, corner_rounding, corner_rounding, corner_rounding);
		strokeWeight(0);
		fill(text_color);
		textAlign(CENTER);
		textSize(18);
		text(i+1, left_margin+3.5, top_margin+7, box_width, box_height);
	}

	fill('#1d1d1d');
	noStroke();
	rect(0,0,screen.width,20);
	rect(0,screen.height-20,screen.width,20);
	rect(0,0,20,screen.height);
	rect(screen.width-20,0,20,screen.height);

	image(img_arch_logo, screen.width/2-1279/2/3, -20, 1279/2.1, 400/2.1);
	image(img_arch_cape, 20+100+1200+100+200 + 10, (screen.height - 40 - 400/3 - 10)/2+20+400/3 + 10 - 901/2/1.8, 457/1.8, 901/1.8);
	image(img_arch, 30, 30);
	image(img_hero_mattock, screen.width - 30 - 53*2, 30, 53*2, 49*2);
}

function preload() {
	img_arch_cape = loadImage('Archaeology_cape_equipped.png');
	img_arch_logo = loadImage('Archaeology_logo.png');
	img_arch = loadImage('Archaeology.png');
	img_hero_mattock = loadImage('Hero_mattock.png');
}

function getPlayerRanks() {
	for (let i = 0; i < max_time_period; i++) {
		for (let j = 0; j < 25; j++) {
			if (time_periods[i][j]['player'] in player_ranks) {
				player_ranks[time_periods[i][j]['player']]["data"][i] = j+1;
			}else {
				let temp_array = [];
				temp_array.length = max_time_period;
				temp_array.fill(35);
				let colors = ['red','blue','green','yellow','purple'];
				let tempNum = Object.keys(player_ranks).length%colors.length;
				let tempColor;
				if (time_periods[i][j]['player'] == "le me") {
					tempColor = 'blue';
				} else if (time_periods[i][j]['player'] == "Maikeru") {
					tempColor = 'red';
				} else if (time_periods[i][j]['player'] == "L33") {
					tempColor = 'green';
				} else if (time_periods[i][j]['player'] == "Roskat") {
					tempColor = 'yellow';
				} else if (time_periods[i][j]['player'] == "Legacy of KG") {
					tempColor = 'purple';
				} else {
					tempColor = colors[tempNum];
				}
				player_ranks[time_periods[i][j]['player']] = {color: tempColor, data:temp_array};
				player_ranks[time_periods[i][j]['player']]["data"][i] = j+1;
			}
		}
	}
}

function getPlayerData() {
	let current_player_data = time_periods[Math.min(time_period,max_time_period-1)];
	let new_player_data = time_periods[Math.min(time_period+1,max_time_period-1)];
	let player_data = [];
	for (let i = 0; i < 25; i++) {
		player_data.push({player: current_player_data[i]["player"], start_pos: i, end_pos: 25, color: current_player_data[i]["color"]});
	}
	for (let i = 0; i < 25; i++) {
		let found = false;
		for (let j = 0; j < 25; j++) {
			if (new_player_data[i]["player"] == player_data[j]["player"]) {
				player_data[j]["end_pos"] = i;
				found = true;
				break;
			}
		}
		if (!found) {
			player_data.push({player: new_player_data[i]["player"], start_pos: 25, end_pos: i, color: current_player_data[i]["color"]});
		}
	}
	return player_data;
}

function draw_players() {
	let tile_height = (screen.height - 40 - 400/3 - 10) / 25;
	let box_height = tile_height - 6;
	let box_width = 200;
	let corner_rounding = 15;
	let left_margin = 20+100+1200+100;

	for (let i = current_player_data.length-1; i >= 0; i--) {
		let start_top_margin = 20+2+current_player_data[i]["start_pos"]*tile_height + 400/3 + 10;
		let end_top_margin = 20+2+current_player_data[i]["end_pos"]*tile_height + 400/3 + 10;
		let cycle = count%update_rate;
		let top_margin = (start_top_margin*(update_rate-cycle)+end_top_margin*cycle)/update_rate;

		strokeWeight(3);
		stroke('black');
		let tile_color = '#5d5d5d';
		let text_color = 'white';
		let player_emoji = ' ';
		if (current_player_data[i]['player'] == "le me") {
			tile_color = '#FFD700';
			text_color = 'black';
		} else if (current_player_data[i]['player'] == "L33") {
			tile_color = '#C0C0C0';
			text_color = 'black';
		} else if (current_player_data[i]['player'] == "Roskat") {
			tile_color = '#cd7f32';
			text_color = 'black';
		} else if (current_player_data[i]['player'] == "Exogor") {
			player_emoji += '😴';
		}
		fill(tile_color);
		rect(left_margin, top_margin, box_width, box_height, corner_rounding, corner_rounding, corner_rounding, corner_rounding);
		strokeWeight(0);
		fill(text_color);
		textAlign(LEFT);
		textSize(20);
		text(current_player_data[i]['player']+player_emoji, left_margin+20, top_margin+7, box_width, box_height);
		//let colors = ['red','blue','green','yellow','pink','orange','purple','brown','lime'];
		//if (current_player_data[i]['end_pos'] !== 26 && current_player_data[i]['start_pos'] !== 26) {
		if (i < 10) {
			drawGraphFast(current_player_data[i]['player'], left_margin, top_margin, player_ranks[current_player_data[i]['player']]['color']);
		}

		fill('#1d1d1d');
		noStroke();
		rect(0,screen.height-20,screen.width,20);
	}
}

function split_raw_data() {
	var data = raw_data[2]["data"];
	let i,tempArray, chunk = 25;
	for (i=0; i < data.length; i+=chunk) {
		temp_array = data.slice(i,i+chunk);
		time_periods.push(temp_array);
	}
}

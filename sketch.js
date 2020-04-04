var time_periods = [];
var count = 0;
var update_rate = 30;
var time_period = 0;
var border = 20;
var max_time_period = 431;

function setup() {
	split_raw_data();
	frameRate(30);
	createCanvas(screen.width, screen.height);
	console.log(time_periods);
	background('#2d2d2d');
}

function draw() {
	clear();
	background('#2d2d2d');
	count++;
	if (count%update_rate == 0) {
		time_period ++;
		if (time_period > max_time_period) {
			time_period = max_time_period;
		}
		console.log(time_period);
	}
	draw_players();
	draw_players_moving()
	if (count == update_rate*2) {
		//noLoop();
	}
}

function getPlayers() {
	let current_player_data = time_periods[time_period];
	if (time_period == max_time_period) {
		let new_player_data = time_periods[time_period];
	} else {
		let new_player_data = time_periods[time_period+1];
	}
	let player_data = [];
	for (let i = 0; i < 25; i++) {
		player_data.push({player: current_player_data[i]["player"], start_pos: i, end_pos: 26});
	}
	for (let i = 0; i < 25; i++) {
		let found = false;
		for (let j = 0; j < 25; j++) {
			if (new_player_data[i]["player"]) == player_data[j][player]) {
				player_data[j][end_pos] = i;
				found = true;
				break;
			}
		}
		if (!found) {
			player_data.push({player: new_player_data[i]["player"], start_pos: 26, end_pos: i});
		}
	}
}

function draw_players_moving() {
	let player_data = time_periods[time_period];
	let tile_height = (screen.height - 40) / 25;
	let box_height = tile_height - 6;
	let box_width = 200;
	let corner_rounding = 15;
	let i;
	for (i = 24; i >= 0; i--) {
		let left_margin = 20+box_width+100;

		let new_time_period = time_period + 1
		if (new_time_period > max_time_period) {
			new_time_period = max_time_period;
		}
		let new_player_data = time_periods[new_time_period];
		let new_position = 26;
		for (let j = 0; j < 25; j++)  {
			if (player_data[i]['player'] == new_player_data[j]['player']) {
				new_position = j;
				break;
			}
		}
		let old_top_margin = 20+2+i*tile_height;
		let new_top_margin = 20+2+new_position*tile_height
		let cycle = count%update_rate;
		let top_margin = (old_top_margin*(update_rate-cycle)+new_top_margin*cycle)/update_rate;

		strokeWeight(3);
		stroke('black');
		let tile_color = '#5d5d5d';
		let text_color = 'white';
		let player_emoji = ' ';
		if (player_data[i]['player'] == "le me") {
			tile_color = '#FFD700';
			text_color = 'white';
		} else if (player_data[i]['player'] == "L33") {
			tile_color = '#C0C0C0';
			text_color = 'black';
		} else if (player_data[i]['player'] == "Legacy of KG") {
			tile_color = '#cd7f32';
			text_color = 'white';
		} else if (player_data[i]['player'] == "Exogor") {
			player_emoji += '😴';
		}
		fill(tile_color);
		rect(left_margin, top_margin, box_width, box_height, corner_rounding, corner_rounding, corner_rounding, corner_rounding);
		strokeWeight(0);
		fill(text_color);
		textAlign(LEFT);
		textSize(20);
		text(player_data[i]['player']+player_emoji, left_margin+20, top_margin+10, box_width, box_height);
	}
}

function draw_players() {
	let player_data = time_periods[time_period];
	let tile_height = (screen.height - 40) / 25;
	let box_height = tile_height - 6;
	let box_width = 200;
	let corner_rounding = 15;
	let i;
	for (i = 24; i >= 0; i--) {
		let left_margin = 20;
		let top_margin = 20+2+i*tile_height;
		strokeWeight(3);
		stroke('black');
		fill('#5d5d5d');
		rect(left_margin, top_margin, box_width, box_height, corner_rounding, corner_rounding, corner_rounding, corner_rounding);
		strokeWeight(0);
		fill('white');
		textAlign(LEFT);
		textSize(20);
		text(player_data[i]['player'], left_margin+20, top_margin+10, box_width, box_height);
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

var time_periods = [];
var count = 0;
var update_rate = 3;
var time_period = 0;
var border = 20;
var max_time_period;
var current_player_data;
var player_ranks = [];

function setup() {
	split_raw_data();
	max_time_period = time_periods.length;
	getPlayerRanks();
	console.log(player_ranks);
	frameRate(30);
	createCanvas(screen.width, screen.height);
	console.log(time_periods);
	background('#2d2d2d');
	current_player_data = getPlayerData();
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
		current_player_data = getPlayerData();
		console.log(time_period);
	}
	drawDetails();
	//draw_players();
	//draw_players_moving();
	draw_players_moving_up_and_down();
	if (count == update_rate*2) {
		//noLoop();
	}
	noLoop();
}

function drawDetails() {
	let tile_height = (screen.height - 40) / 25;
	let box_height = tile_height - 6;
	let box_width = box_height;
	let corner_rounding = 15;
	let left_margin = 20+0*(box_width+100);
	for (let i = 0; i < 25; i++) {
		let top_margin = 20+2+i*tile_height;

		strokeWeight(1);
		stroke('#1d1d1d');
		line_top_margin = top_margin+box_height+3;
		line(left_margin, line_top_margin, left_margin+1000+box_width, line_top_margin)

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
		textSize(20);
		text(i+1, left_margin+3.5, top_margin+10, box_width, box_height);
	}
}

function getPlayerRanks() {
	for (let i = 0; i < max_time_period; i++) {
		for (let j = 0; j < 25; j++) {
			let found = false;
			for (let k = 0; k < player_ranks.length; k++) {
				if (time_periods[i][j]['player'] == player_ranks[k]['player']) {
					player_ranks[k]['ranks'][i] = j+1;
					found = true;
					break;
				}
			}
			if (!found) {
				let temp_array = [];
				temp_array.length = max_time_period;
				temp_array.fill(26);
				player_ranks.push({player:time_periods[i][j]['player'],ranks:temp_array});
			}
		}
	}
}

function getPlayerData() {
	let current_player_data = time_periods[time_period];
	let new_player_data;
	if (time_period == max_time_period) {
		new_player_data = time_periods[time_period];
	} else {
		new_player_data = time_periods[time_period+1];
	}
	let player_data = [];
	for (let i = 0; i < 25; i++) {
		player_data.push({player: current_player_data[i]["player"], start_pos: i, end_pos: 25});
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
			player_data.push({player: new_player_data[i]["player"], start_pos: 25, end_pos: i});
		}
	}
	return player_data;
}

function draw_players_moving_up_and_down() {
	let tile_height = (screen.height - 40) / 25;
	let box_height = tile_height - 6;
	let box_width = 200;
	let corner_rounding = 15;
	let left_margin = 20+1000;

	for (let i = current_player_data.length-1; i >= 0; i--) {
		let start_top_margin = 20+2+current_player_data[i]["start_pos"]*tile_height;
		let end_top_margin = 20+2+current_player_data[i]["end_pos"]*tile_height;
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
		text(current_player_data[i]['player']+player_emoji, left_margin+20, top_margin+10, box_width, box_height);
	}
}

function draw_players_moving() {
	let player_data = time_periods[time_period];
	let tile_height = (screen.height - 40) / 25;
	let box_height = tile_height - 6;
	let box_width = 200;
	let corner_rounding = 15;
	let left_margin = 20+2*(box_width+100);
	for (let i = 24; i >= 0; i--) {

		let new_time_period = time_period + 1
		if (new_time_period > max_time_period) {
			new_time_period = max_time_period;
		}
		let new_player_data = time_periods[new_time_period];
		let new_position = 25;
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
	let left_margin = 20+(box_width+100);
	for (let i = 24; i >= 0; i--) {
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

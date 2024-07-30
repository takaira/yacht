// DOM受け取り ----------------------------------------------------------------------------------------------------------------------------------------
const roll_button = document.getElementById("roll_button");
const roll_dices = document.getElementById("roll_dices");
const decision_dices = document.getElementById("decision_dices");
const choice = document.getElementById("choice");
const four_dice = document.getElementById("four_dice");
const full_house = document.getElementById("full_house");
const s_straight = document.getElementById("s_straight");
const b_straight = document.getElementById("b_straight");
const yacht = document.getElementById("yacht");
const subtotal = document.getElementById("subtotal");
const bonus = document.getElementById("bonus");
const total = document.getElementById("total");
const roll_count_obj = document.getElementById("roll_count");
const role_list = new Array("ace", "deuce", "tray", "four", "five", "six", "choice", "four_dice", "full_house", "s_straight", "b_straight", "yacht");
const role_obj_list = new Array(12);
for (let i = 0; i < 12; i++) {
    role_obj_list[i] = document.getElementById(role_list[i]);
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------
// 変数作成 ------------------------------------------------------------------------------------------------------------------------------------------
let remaining_roll_count = 3;
const sub_role_list = new Array("ace", "deuce", "tray", "four", "five", "six");
const dice_list = new Array(5);
const dice_count_obj = {};
const selected_role_obj = {};
let selected_flag = false;
let total_num = 0;
let subtotal_num = 0;
let bonus_flag = false;
// ---------------------------------------------------------------------------------------------------------------------------------------------------
// 関数 ----------------------------------------------------------------------------------------------------------------------------------------------
// サイコロの上移動
function to_decision(obj) {
    roll_dices.removeChild(obj);
    obj.setAttribute("onclick", "to_roll(this)");
    decision_dices.appendChild(obj);
}
// サイコロの下移動
function to_roll(obj) {
    decision_dices.removeChild(obj);
    obj.setAttribute("onclick", "to_decision(this)");
    roll_dices.appendChild(obj);
}
// #roll_spaceと各変数を初期化
function reset_roll_space() {
    remaining_roll_count = 3;
    decision_dices.innerHTML = "";
    roll_dices.innerHTML = "";
    for (let i = 1; i < 7; i++) {
        dice_count_obj["" + i] = 0;
    }
    roll_count_obj.textContent = "残り回数" + remaining_roll_count + "/3";
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------
// クリック動作 ---------------------------------------------------------------------------------------------------------------------------------------
// サイコロを振る
roll_button.addEventListener("click", function() {
    if (remaining_roll_count) {
        remaining_roll_count--;
        roll_count_obj.textContent = "残り回数" + remaining_roll_count + "/3";
        let decision = 0;
        for (let decision_dice of Array.from(decision_dices.children)) {
            decision_dice.setAttribute("onclick", "");
            dice_list[decision] = parseInt(decision_dice.textContent);
            decision++;
        }
        while (roll_dices.lastChild) {
            roll_dices.removeChild(roll_dices.lastChild);
        }
        for (let i = decision; i < 5; i++) {
            let roll_dice = document.createElement("button");
            let dice = Math.floor(Math.random() * 6 + 1);
            dice_list[i] = dice;
            roll_dice.innerHTML = dice;
            roll_dice.setAttribute("onclick", "to_decision(this)");
            roll_dices.appendChild(roll_dice);
        }
        dice_list.sort();
        for(let i = 1; i < 7; i++) {
            dice_count_obj["" + i] = dice_list.filter(element => element == i).length;
            const role = role_obj_list[i - 1];
            if (!selected_role_obj[sub_role_list[i - 1]]) {
                role.textContent = i * dice_count_obj["" + i];
            }
        }
        const dice_count_values = Object.values(dice_count_obj);
        const dice_sum = dice_list.reduce((sum, element) => sum + element, 0);
        if (!selected_role_obj["choice"]) choice.textContent = dice_sum;
        if (!selected_role_obj["four_dice"]) {
            if (dice_count_values.filter(element => element >= 4).length) {
                four_dice.textContent = dice_sum;
            }
            else {
                four_dice.textContent = 0;
            }
        }
        if (!selected_role_obj["full_house"]) {
            if (dice_count_values.filter(element => element == 3).length && dice_count_values.filter(element => element == 2).length) {
                full_house.textContent = dice_sum;
            }
            else {
                full_house.textContent = 0;
            }
        }
        let count_straight = 1;
        dice_list.sort();
        for (let i = 1; i < 5; i++) {
            if (dice_list[i - 1] + 1 == dice_list[i]) count_straight++;
        }
        if (!selected_role_obj["s_straight"]) {
            if (count_straight >= 4) {
                s_straight.textContent = 15;
            }
            else {
                s_straight.textContent = 0;
            }
        }
        if (!selected_role_obj["b_straight"]) {
            if (count_straight == 5) {
                b_straight.textContent = 30;
            }
            else {
                b_straight.textContent = 0;
            }
        }
        if (!selected_role_obj["yacht"]) {
            if (dice_count_values.filter(element => element == 5).length) {
                yacht.textContent = 50;
            }
            else {
                yacht.textContent = 0;
            }
        }
        for (let i = 0; i < 12; i++) {
            if (!selected_role_obj[role_obj_list[i].id]) {
                role_obj_list[i].classList.add('possible_choices');
            }
        }
        selected_flag = false;
    }
})
// 役選択
for (let role_obj of role_obj_list) {
    role_obj.addEventListener("click", function() {
        if (!selected_flag && !selected_role_obj[role_obj.id]) {
            selected_role_obj[role_obj.id] = true;
            total_num += parseInt(role_obj.textContent);
            if (sub_role_list.includes(role_obj.id)) {
                subtotal_num += parseInt(role_obj.textContent);
                subtotal.textContent = subtotal_num + "/63";
                if (subtotal_num >= 63 && !bonus_flag) {
                    bonus.textContent = "+35";
                    total_num += 35;
                    bonus_flag = true;
                }
            }
            total.textContent = total_num;
            for (let i = 0; i < 12; i++) {
                role_obj_list[i].classList.remove('possible_choices');
                if (!selected_role_obj[role_obj_list[i].id]) {
                    role_obj_list[i].textContent = "";
                }
                else {
                    role_obj_list[i].classList.add("selected");
                }
            }
            selected_flag = true;
            reset_roll_space();
        }
    })
}
/**
 * Created by ajay on 7/3/17.
 */

var amountAvailable;
var max_amount = 0;

function addAmount() {
    var regex_string = /^\d+$/;
    $("#statTable2").hide();
    var hundred = document.getElementById("hundred").value;
    if (!regex_string.test(hundred)) {
        hundred = 0;
    }
    var five_hundred = document.getElementById("fiveHundred").value;
    if (!regex_string.test(five_hundred)) {
        five_hundred = 0;
    }
    var two_thousand = document.getElementById("twoThousand").value;
    if (!regex_string.test(two_thousand)) {
        two_thousand = 0;
    }
    amountAvailable = new Amount();

    max_amount = parseInt(document.getElementById("max_amount").value);

    amountAvailable.hundred_rs_note = hundred;
    amountAvailable.fivehundred_rs_note = five_hundred;
    amountAvailable.twothousand_rs_note = two_thousand;
    amountAvailable.left = amountAvailable.amount = hundred * 100 + five_hundred * 500 + two_thousand * 2000;
    amountAvailable.Color_ofwithdraw = false;

    document.getElementById("statCurrentAmount").innerHTML = "Current Amount: " + amountAvailable.amount;


    document.getElementById("logs").innerHTML += "<tr class='deposit'><td>" + amountAvailable.amount + "</td><td>"
        + amountAvailable.twothousand_rs_note + "</td><td>" + amountAvailable.fivehundred_rs_note + "</td><td>"
        + amountAvailable.hundred_rs_note + "</td><td>" + amountAvailable.left + "</td></tr>";

}


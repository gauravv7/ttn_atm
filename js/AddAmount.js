/**
 * Created by ajay on 7/3/17.
 */

var amountAvailable;
var max_amount = 0;


function validateEnteredAmount(hundred, five_hundred, two_thousand, fifty) {
    if (hundred == 0 && five_hundred == 0 && two_thousand == 0 && fifty == 0) {
        return false;
    }
    return true;
}

function addAmount() {

    var regex_string = /^\d+$/;

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
    var fifty = document.getElementById("fifty").value;
    if (!regex_string.test(fifty)) {
        fifty = 0;
    }


    if (validateEnteredAmount(hundred, five_hundred, two_thousand, fifty)) {
        $("#statTable2").hide();


        amountAvailable = new Amount();

        max_amount = document.getElementById("max_amount").value;

        if (!regex_string.test(max_amount)) {
            max_amount = 10000;
        }


        document.getElementById("limit").innerHTML = "Maximum withdrawal limit : " + max_amount;

        if (!regex_string.test(max_amount)) {
            max_amount = 0;
        }

        amountAvailable.hundred_rs_note = hundred;
        amountAvailable.fivehundred_rs_note = five_hundred;
        amountAvailable.twothousand_rs_note = two_thousand;
        amountAvailable.fifty_rs_note = fifty;
        amountAvailable.left = amountAvailable.amount = fifty * 50 + hundred * 100 + five_hundred * 500 + two_thousand * 2000;
        document.getElementById("statCurrentAmount").innerHTML = "Current Amount: " + amountAvailable.amount;


        document.getElementById("logs").innerHTML += "<tr class='deposit'><td>" + amountAvailable.amount + "</td><td>"
            + amountAvailable.twothousand_rs_note + "</td><td>" + amountAvailable.fivehundred_rs_note + "</td><td>"
            + amountAvailable.hundred_rs_note + "</td><td>" + amountAvailable.fifty_rs_note + "</td><td>"+amountAvailable.left +"</td></tr>";




    } else {
        document.getElementById("ErrorInAddAmount").innerHTML = " INVALID TRANSACTION ";
    }


}


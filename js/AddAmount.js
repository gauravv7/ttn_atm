/**
 * Created by ajay on 7/3/17.
 */

var amountAvailable;

function  addAmount() {
    var hundred = document.getElementById("hundred").value;
    var five_hundred = document.getElementById("fiveHundred").value;
    var two_thousand = document.getElementById("twoThousand").value;
    amountAvailable = new Amount();

    amountAvailable.hundred_rs_note=hundred;
    amountAvailable.fivehundred_rs_note=five_hundred;
    amountAvailable.twothousand_rs_note=two_thousand;
    amountAvailable.amount=hundred*100 + five_hundred*500 + two_thousand*2000;

    document.getElementById("statCurrentAmount").innerHTML="Current Amount: "  + amountAvailable.amount;
}
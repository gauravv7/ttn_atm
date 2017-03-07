/**
 * Created by ajay on 7/3/17.
 */

var amountAvailable;

function  addAmount() {
    var hundred = document.getElementById("hundred");
    var five_hundred = document.getElementById("fiveHundred");
    var two_thousand = document.getElementById("twoThousand");
    amountAvailable=new Amount();

    amountAvailable.hundred_rs_note=hundred;
    amountAvailable.fivehundred_rs_note=five_hundred;
    amountAvailable.twothousand_rs_note=two_thousand;


}
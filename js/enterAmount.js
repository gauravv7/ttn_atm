var temp_transaction;
function withdrawal() {
    var amount = document.getElementById("withdraw").value;
    var status = verify(amount);
    if (status == "verified") {
        document.getElementById("logs").innerHTML += "<tr class='withdraw'><td>" + amount + "</td><td>"
            + amountAvailable.twothousand_rs_note + "</td><td>" + amountAvailable.fivehundred_rs_note + "</td><td>"
            + amountAvailable.hundred_rs_note + "</td><td>" + amountAvailable.left + "</td></tr>";


    } else {
        $("#message").text(status);
    }

}

function verify(amount) {


    var pattern=/^\d+$/;
    if(!pattern.test(amount))return "Enter amount in numbers";

    temp_transaction = new Amount();
    temp_transaction.amount = parseInt(amount);

    if (temp_transaction.amount > max_amount)return "Withdrawal limit Excedded" ;

    if (temp_transaction.amount > amountAvailable.amount) {
        return "Insufficiant Balance";
    } else {

        if (!(temp_transaction.amount % 50)) {
            return "Enter Amount in Multiple of 50";
        }

        temp_transaction.twothousand_rs_note = Math.trunc(temp_transaction.amount / 2000);
        temp_transaction.amount -= temp_transaction.twothousand_rs_note * 2000;
        temp_transaction.fivehundred_rs_note = Math.trunc(temp_transaction.amount / 500);
        temp_transaction.amount -= temp_transaction.fivehundred_rs_note * 500;
        temp_transaction.hundred_rs_note = Math.trunc(temp_transaction.amount / 100);
        temp_transaction.amount -= temp_transaction.hundred_rs_note * 100;

        if (amountAvailable.twothousand_rs_note < temp_transaction.twothousand_rs_note) {
            temp_transaction.five_hundred += 4 * (temp_transaction.twothousand_rs_note - x.twothousand_rs_note);
            if (!checkNotes(temp_transaction)) {

                return "Invalid Combination";
            }
        } else {
            if (!checkNotes(temp_transaction)) {
                return "Invalid Combination";
            }
        }
    }

    temp_transaction.amount = amount;
    amountAvailable.amount -= amount;
    amountAvailable.fivehundred_rs_note -= temp_transaction.fivehundred_rs_note;
    amountAvailable.hundred_rs_note -= temp_transaction.hundred_rs_note;
    amountAvailable.twothousand_rs_note -= temp_transaction.twothousand_rs_note;
    amountAvailable.left = amountAvailable.amount;
    document.getElementById("statCurrentAmount").innerHTML = "Current Amount: " + amountAvailable.amount;
    return "verified";
}


function checkNotes(temp_transaction) {
    if (amountAvailable.fivehundred_rs_note < temp_transaction.fivehundred_rs_note) {
        temp_transaction.hundred_rs_note += 5 * (temp_transaction.fivehundred_rs_note - amountAvailable.fivehundred_rs_note);
    }

    if (amountAvailable.hundred_rs_note < temp_transaction.hundred_rs_note) return false;
    return true;
}

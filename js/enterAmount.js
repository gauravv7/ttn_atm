
function withdrawal() {
    var amount = document.getElementById("withdraw").value;
    var status=verify(amount);


}

function verify(amount) {
    var x = amountAvailable;
    var temp_transaction = new Amount();
    temp_transaction.amount = amount;


    if (temp_transaction.amount > amountAvailable.amount) {
        return "Insufficiant Balance";
    } else {

        if ((temp_transaction.amount % 100) != 0) {
            return "Enter Input in Multiple of 100";
        }

        var cur_amount = temp_transaction.amount;
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


    return "verified";
}


function checkNotes( temp_transaction) {
    if (amountAvailable.fivehundred_rs_note < temp_transaction.fivehundred_rs_note) {
        temp_transaction.hundred_rs_note += 5 * (temp_transaction.fivehundred_rs_note - amountAvailable.fivehundred_rs_note);
    }

    if (amountAvailable.hundred_rs_note < temp_transaction.hundred_rs_note) return false;
    return true;
}

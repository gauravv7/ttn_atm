(function(){

    var apiDetails = {
      version: 1.0,
      name: "ATM"
    }

    // isInteger check
    function isInt(n){
        return Number(n) === n && n % 1 === 0;
    }

    // isFloat check
    function isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }

    // polyfill from mdn for Object.assign()
    if (typeof Object.assign != 'function') {
      Object.assign = function(target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      };
    }

    /**
    * [Base base class as superclass for all the functionalities, files for the logging functionalities for now]
    * could be distributed against an abstract class with throw statement to make it abstract implementable
     */
    function Base(msg){
      this.msg = apiDetails.name+" v"+apiDetails.version+": ";
      this.msg += msg || '';
    }
    Base.prototype.constructor = Base;

    Base.prototype.error = function(str) {
      console.error(this.msg+str);
    }

    Base.prototype.debug = function(str) {
      console.debug(this.msg+str);
    }

    Base.prototype.info = function(str) {
      console.info(this.msg+str);
    }

    Base.prototype.warn = function(str) {
      console.warn(this.msg+str);
    }

    Base.prototype.log = function(str) {
      console.log(this.msg+str);
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58110fc... api library: added Transaction logging class
    /**
     * [Transaction class to handle logging of all the Transactions]
     * deposits are marked by 'a' type and withdraws are marked by 'w'
     */
    function Transaction(){
      this._super.call(this);
      this.logs = new Array();
    }
    Transaction.prototype = Object.create(Base.prototype);
    Transaction.prototype.constructor = Transaction;
    Transaction.prototype._super = Base;  // setting the super for proper init

    Transaction.prototype.addLog = function(amountDetail,reqAmount, action) {
      var copyAmount = Object.assign({}, amountDetail);
      // TODO: make constants to check agains and to be used in ACTION param
      if(action.toLowerCase().endsWith("add")) {
        copyAmount['type'] = "a";
        copyAmount['requestAmount'] = reqAmount;
        copyAmount['remainingAmount'] = copyAmount.total();
      } else if(action.toLowerCase().endsWith("withdraw")) {
        copyAmount['type'] = "w";
        copyAmount['requestAmount'] = reqAmount;
        copyAmount['remainingAmount'] = copyAmount.total();
      }
      this.logs.push(copyAmount); // pushing the transaction detail into the logs
      delete copyAmount.total;  // redundant prop, test if it is good for use in-case of shallow copy
    } // addLog

    Transaction.prototype.getLogs = function(){
      return this.logs;
    } // getLogs returning the logs

<<<<<<< HEAD
=======
>>>>>>> a37c6d8... api library: added ATM class
=======
>>>>>>> 58110fc... api library: added Transaction logging class

    /**
     * [ATM handling all the functionalities]
     */
    function ATM(){
      this._super.call(this);
<<<<<<< HEAD
<<<<<<< HEAD
      this.transactions = new Transaction();
      this.maxWithdrawAmount=10000;
<<<<<<< HEAD
=======
>>>>>>> a37c6d8... api library: added ATM class
=======
      this.transactions = new Transaction();
>>>>>>> 58110fc... api library: added Transaction logging class
=======
>>>>>>> 02cd6e8... api library: added functionality for max withdraw limit
    }
    ATM.prototype = Object.create(Base.prototype);
    ATM.prototype.constructor = ATM;
    ATM.prototype._super = Base;  // setting the super for proper init

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 02cd6e8... api library: added functionality for max withdraw limit
    // maxWithdrawAmount setter
    ATM.prototype.setMaxWithdrawAmount = function(amount){
      if(isNaN(amount) || !parseInt(amount)) {
        this.error("Not a valid maxWithdrawAmount");
      }
      this.maxWithdrawAmount = amount;
    }

    // maxWithdrawAmount getter
    ATM.prototype.getMaxWithdrawAmount = function(){
      return this.maxWithdrawAmount;
    }

<<<<<<< HEAD
=======
>>>>>>> a37c6d8... api library: added ATM class
=======
>>>>>>> 02cd6e8... api library: added functionality for max withdraw limit
    /**
     * [totalAmount singleton object to handle amount value]
     */
    ATM.prototype.totalAmount = (function () {
        var instance;

        function createInstance() {
            var obj = new Object({
              _2000: 0,
              _500: 0,
              _100: 0,
              total: function(){ return ( (2000*parseInt(this._2000))+(500*parseInt(this._500))+(100*parseInt(this._100)) ); }
            });
            return obj;
        }

        return {
            getInstance: function () {
                if (!instance) {
                    instance = createInstance();
                }
                return instance;
            }
        };
    })().getInstance();

    ATM.prototype.addAmount = function(amount) {
        if(!amount || !Object.keys(amount).length){
          this.error("empty object passed");
        }
        var sum = 0;
        for (var key in amount) {
          if (amount.hasOwnProperty(key)) {
            if(isFloat(amount[key])) {
              this.error("given domination("+key+") value is in fractions("+amount[key]+")");
              throw new Error("given domination("+key+") value is in fractions("+amount[key]+")");
            }
            if(key.endsWith("total")) continue;
            // below error to be expanded later for proper logging
            if(!isNaN( parseInt(amount[key]))){
              sum += parseInt((key.substr(1,key.length))*amount[key]);
            }
          } // if hasOwnProperty
        } // for

        // perform below the callback after successfull checks
        if(sum == amount['total']){
          this.totalAmount._2000 += amount._2000;
          this.totalAmount._500 += amount._500;
          this.totalAmount._100 += amount._100;
<<<<<<< HEAD
<<<<<<< HEAD
          this.transactions.addLog(this.totalAmount, amount['total'], "add");
=======
>>>>>>> a37c6d8... api library: added ATM class
=======
          this.transactions.addLog(this.totalAmount, amount['total'], "add");
>>>>>>> 58110fc... api library: added Transaction logging class
        } else{
          this.error("data discripency while adding amount");
        }
    } // addAmount


    ATM.prototype.withdrawAmount = function(amount){
      if(!isInt(amount) || (amount%100!=0) ){
        this.error("not a good value(in fractions)");
      }
      var sum = amount;
<<<<<<< HEAD
<<<<<<< HEAD
      if(this.getMaxWithdrawAmount()<amount){
        this.error("entered amount exceeds maxWithdrawAmount")
      }
=======
>>>>>>> a37c6d8... api library: added ATM class
=======
      if(this.getMaxWithdrawAmount()<amount){
        this.error("entered amount exceeds maxWithdrawAmount")
      }
>>>>>>> 02cd6e8... api library: added functionality for max withdraw limit
      if(this.totalAmount.total()<amount){
        // throw error
      }
      var _2kn = Math.floor(sum/2000); sum = sum%2000;
      var _5kn = Math.floor(sum/500); sum = sum%500;
      var _1kn = Math.floor(sum/100); sum = sum%100;
      if(_1kn!=0){
        // throw error; even the 100 notes are not
      }
      console.log(_2kn);
      console.log(_5kn);
      console.log(_1kn);
      // redundant check below in accordance to line 109; withdrawing the amount from bank(totalAmount property)
      if(_2kn <= this.totalAmount._2000 && _5kn <= this.totalAmount._500 && _1kn <= this.totalAmount._100){
        this.totalAmount._2000 -= _2kn;
        this.totalAmount._500 -= _5kn;
        this.totalAmount._100 -= _1kn;
<<<<<<< HEAD
<<<<<<< HEAD
        this.transactions.addLog(this.totalAmount, amount, "withdraw");
=======
>>>>>>> a37c6d8... api library: added ATM class
=======
        this.transactions.addLog(this.totalAmount, amount, "withdraw");
>>>>>>> 58110fc... api library: added Transaction logging class
      }
    }
    atm = new ATM();
    console.log(atm.totalAmount);

    atm.addAmount({
      _2000: 1,
      _500: 1,
      _100: 1,
      'total': 2600
    });
    console.log(atm.totalAmount.total());
    console.log(atm.totalAmount);
<<<<<<< HEAD
<<<<<<< HEAD
    atm.withdrawAmount(12600);
    console.log(atm.transactions.getLogs());


=======
    atm.withdrawAmount(2600);
<<<<<<< HEAD
>>>>>>> a37c6d8... api library: added ATM class
=======
=======
    atm.withdrawAmount(12600);
>>>>>>> 02cd6e8... api library: added functionality for max withdraw limit
    console.log(atm.transactions.getLogs());


>>>>>>> 58110fc... api library: added Transaction logging class


})()

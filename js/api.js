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
      return str;
    }

    Base.prototype.debug = function(str) {
      console.debug(this.msg+str);
      return str;
    }

    Base.prototype.info = function(str) {
      console.info(this.msg+str);
      return str;
    }

    Base.prototype.warn = function(str) {
      console.warn(this.msg+str);
      return str;
    }

    Base.prototype.log = function(str) {
      console.log(this.msg+str);
      return str;
    }

    /**
     * [Transaction class to handle logging of all the Transactions]
     * deposits are marked by 'a' type and withdraws are marked by 'w'
     */
    function Transaction(){
      this._super.call(this, "Transaction: ");
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


    /**
     * [ATM handling all the functionalities]
     */
    function ATM(){
      this._super.call(this, "ATM: ");
      this.transactions = new Transaction();
      this.maxWithdrawAmount=10000;
    }
    ATM.prototype = Object.create(Base.prototype);
    ATM.prototype.constructor = ATM;
    ATM.prototype._super = Base;  // setting the super for proper init

    // maxWithdrawAmount setter
    ATM.prototype.setMaxWithdrawAmount = function(amount){
      if(isNaN(amount) || !parseInt(amount)) {
        return this.error("Not a valid maxWithdrawAmount");
      }
      this.maxWithdrawAmount = amount;
    }

    // maxWithdrawAmount getter
    ATM.prototype.getMaxWithdrawAmount = function(){
      return this.maxWithdrawAmount;
    }

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
          return this.error("empty object passed");
        }
        var sum = 0;
        for (var key in amount) {
          if (amount.hasOwnProperty(key)) {
            if(isFloat(amount[key])) {
              return this.error("given domination("+key+") value is in fractions("+amount[key]+")");
              // throw new Error("given domination("+key+") value is in fractions("+amount[key]+")");
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
          this.transactions.addLog(this.totalAmount, amount['total'], "add");
        } else{
          return this.error("data discripency while adding amount");
        }
    } // addAmount


    ATM.prototype.withdrawAmount = function(amount){
      if(!isInt(amount) || (amount%100!=0) ){
        return this.error("Input is not in multiple of 100");
      }
      var sum = amount;
      if(this.getMaxWithdrawAmount()<amount){
        return this.error("requested amount exceeds maxWithdrawAmount")
      }
      if(this.totalAmount.total()<amount){
        return this.error("ATM does not have sufficient money.");
      }
      var _2kn = Math.floor(sum/2000); sum = sum%2000;
      var _5kn = Math.floor(sum/500); sum = sum%500;
      var _1kn = Math.floor(sum/100); sum = sum%100;
      this.log("withdraw check: 2000 notes: "+_2kn);
      this.log("withdraw check: 500 notes: "+_5kn);
      this.log("withdraw check: 100 notes: "+_1kn);
      if(_1kn!=0){
        return this.error("ATM does not have #of notes required to complete the transaction");
      }
      // redundant check below in accordance to this.totalAmount.total()<amount; withdrawing the amount from bank(totalAmount property)
      if(_2kn <= this.totalAmount._2000 && _5kn <= this.totalAmount._500 && _1kn <= this.totalAmount._100){
        this.totalAmount._2000 -= _2kn;
        this.totalAmount._500 -= _5kn;
        this.totalAmount._100 -= _1kn;
        this.transactions.addLog(this.totalAmount, amount, "withdraw");
      }
    }
    atm = new ATM();
    console.log(atm.totalAmount);
    atm.addAmount();
    atm.addAmount({
      _2000: 1,
      _500: 1,
      _100: 1,
      'total': 2600
    });
    console.log(atm.totalAmount.total());
    console.log(atm.totalAmount);
    atm.setMaxWithdrawAmount(13000);
    atm.withdrawAmount(12600);
    console.log(atm.transactions.getLogs());




})()

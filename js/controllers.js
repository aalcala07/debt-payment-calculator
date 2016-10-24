/*

AngularJS Controllers for Debt Payment Calculator

*/

app.controller('mainController', ['$scope', '$filter', 'resultsService', function($scope, $filter, resultsService) {

	this.test = "This is only a test. (From mainController)";
	$scope.test2 = resultsService.test();
	this.monthlyPayment     = 2100;
	this.results						= null;

	$scope.numAccounts      = 0;
	$scope.accounts         = [];
	$scope.payment          = 0;
	$scope.timeToZeroDebt   = "";
	$scope.amountSaved      = 0;
	$scope.timeSaved        = 0;
	$scope.totalPayments    = 0;
	$scope.totalInterest    = 0;
	$scope.dateZeroDebt     = "";
	$scope.startingMessage  = "Add an account and enter a monthly payment to get started.";


    $scope.loadMessage = function(message) {

        if (message == null) {
            message = $scope.startingMessage;
        }

        $scope.message = message;
    }

    $scope.loadMessage();

    $scope.stringToFloat = function(str) {
        return parseFloat(str.replace(',', ''));
    }

    $scope.addAccount = function(event) {

        var account = {
            name    : $('input[name="accountName"]').val(),
            balance : $scope.stringToFloat($('input[name="accountBalance"]').val()),
            apr     : $scope.stringToFloat($('input[name="accountApr"]').val()) * 100
        };

		$scope.accounts.push(account);

        $('.no-accounts').hide();
        $('#addAccountModal').modal('hide');

    };

    $scope.calculateMinimumPayment = function(interest, balance) {
    	var minPayment = (interest * 2 < 15) ? 15 : interest * 2;

    	if (minPayment >= balance) {
    		return balance;
    	} else {
    		return minPayment;
    	}
    }

    $scope.getTotalDebt = function() {
    	var totalDebt = 0;

    	for (var i = 0; i < $scope.accounts.length; i++) {
    		totalDebt += parseFloat($scope.accounts[i].balance);
    	}

    	return totalDebt;

    }

    $scope.updateSummaryInfo = function(monthlyPayments) {

        var numYears = Math.floor(monthlyPayments.length/12);
        var numMonths = monthlyPayments.length%12;

        $scope.dateZeroDebt = monthlyPayments.slice(-1)[0].date;

        if (numYears) {
            $scope.timeToZeroDebt = numYears == 1 ? numYears + " year" : numYears + " years";
            $scope.timeToZeroDebt += numMonths ? " and " + numMonths + " month" : '';
            $scope.timeToZeroDebt += numMonths <= 1 ? '' : 's';
        } else {
            $scope.timeToZeroDebt = numMonths + " months";
        }

    }

	this.updateContent = function() {

		$('.summary').hide();
		$('.monthly-payments').hide();

			if ($scope.accounts.length == 0 && $scope.monthlyPayment != null) {

					$scope.loadMessage("Add an account to calculate your plan.");

			} else if ($scope.accounts.length > 0){

					if ($scope.monthlyPayment === null) {

							$scope.loadMessage("Enter a monthly payment to calculate your plan.");

					} else {

							var monthlyPayments = $scope.generateMonthlyPayments();

							if (monthlyPayments === false) return false;

							// Update Summary info
							$scope.updateSummaryInfo(monthlyPayments);

							// Update Payments table
							//$scope.updatePaymentsTable(monthlyPayments);

							$scope.loadMessage("Check out your payment plan below.");
							$('.summary').show();
							$('.monthly-payments').show();

					}

		}
	};

	this.test = function() {
		console.log('test');
	}

	this.calculate = function(event) {
		console.log("calculate");
		this.totalPayments    = 0;
		this.totalInterest    = 0;
		this.updateContent();
	};


	this.updateContent();
  console.log(this.monthlyPayment);

}]);

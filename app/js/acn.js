var acnChecker = angular.module("acnChecker", []);

acnChecker.controller("acn-ctrl", function($scope, $timeout) {
  $scope.acnNumber = "";
  $scope.isShown = false;
  $scope.message = "";
  $scope.isValid = null;

  $scope.acnCheck = function(acn = "") {
    const regex = new RegExp(/^([0-9]{9})$/g);
    const regexASIC = new RegExp(/^((([0-9]{3})\s){2}[0-9]{3})$/g);

    // if no data input or doesn't match any format
    if (!acn || (!acn.match(regexASIC) && !acn.match(regex)))
      return { valid: false, message: "Given ACN is not correct format!" };

    let inputNumber = acn.replace(/\s/g, "");
    let productSum = 0;
    for (let i = 0; i < inputNumber.length - 1; i++) {
      productSum += +inputNumber[i] * (inputNumber.length - i - 1);
      console.log(
        `${+inputNumber[i]} * ${inputNumber.length - i - 1} = ${+inputNumber[
          i
        ] *
          (inputNumber.length - i - 1)}`
      );
    }
    const checkDigit = (function() {
      const complement = 10 - (productSum % 10);
      if (complement == 10) return 0;
      else return complement;
    })();

    if (checkDigit == +inputNumber.substring(inputNumber.length - 1)) {
      return { valid: true, message: "Given ACN is valid!" };
    } else {
      return { valid: false, message: "Given number is not a valid ACN!" };
    }
  };

  $scope.onSubmit = function(acn) {
    let result = $scope.acnCheck(acn);
    $scope.isShown = true;
    $scope.message = result.message;
    $scope.isValid = result.valid;

    $timeout(() => {
      $scope.isShown = false;
    }, 3000);
  };
});

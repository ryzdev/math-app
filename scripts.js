var app = angular.module("mmApp", []);

app.controller("mmAppController", function ($scope) {

    $scope.helpInfo = "";
    $scope.option = "0";
    $scope.var1 = 0;
    $scope.operator = "";
    $scope.var2 = 0;
    $scope.answer = 0;

    $scope.helpMe = function () {
        alert($scope.helpInfo);
    };

    $scope.nextQuestion = function () {
        $scope.showAnswer = false;
        randomCalculation();
    };

    $scope.nextQuestion();

    function randomCalculation() {
        var n = parseInt($scope.option);
        if (n == 0) {
            n = Math.floor(Math.random() * 9) + 1;
        }
        switch (n) {
            case 1:
                twoByTwoAddition();
                break;

            case 2:
                threeByThreeAddition();
                break;

            case 3:
                fourByThreeAddition();
                break;

            case 4:
                twoByTwoSubtraction();
                break;

            case 5:
                threeByThreeSubtraction();
                break;

            case 6:
                fourByThreeSubtraction();
                break;

            case 7:
                twoByOneMultiplication();
                break;

            case 8:
                threeByOneMultiplication();
                break;

            case 9:
                twoDigitSquare();
        }
    }

    function basicSumEngine(number1MinSize, number1MaxSize, number2MinSize, number2MaxSize, operator) {
        var number1 = Math.floor(Math.random() * (number1MaxSize - number1MinSize + 1)) + number1MinSize;
        var number2 = Math.floor(Math.random() * (number2MaxSize - number2MinSize + 1)) + number2MinSize;
        var calculationResult;
        if (operator == "x") {
            calculationResult = number1 * number2;
        }
        if (operator == "+") {
            calculationResult = number1 + number2;
        }
        if (operator == "-") {
            while (number2 > number1) {
                number2 = Math.floor(Math.random() * (number2MaxSize - number2MinSize + 1)) + number2MinSize;
            }
            calculationResult = number1 - number2;
        }
        $scope.var1 = number1;
        $scope.operator = operator;
        $scope.var2 = number2;
        $scope.answer = calculationResult;
    }

    function squareEngine(number1MinSize, number1MaxSize) {
        var number = Math.floor(Math.random() * (number1MaxSize - number1MinSize + 1)) + number1MinSize;
        var calculationResult = number * number;
        $scope.var1 = number;
        $scope.operator = "&#178;";
        $scope.var2 = "";
        $scope.answer = calculationResult;
    }

    function twoByTwoAddition() {
        $scope.helpInfo = "34 plus 25 is 54 plus 5 is 59";
        basicSumEngine(10, 99, 10, 99, "+");
    }

    function threeByThreeAddition() {
        $scope.helpInfo = "858 plus 634 is 1458 plus 34 is 1488 plus 4 is 1492. You can also switch numbers if easier, or round up.";
        basicSumEngine(100, 999, 100, 999, "+");
    }

    function fourByThreeAddition() {
        $scope.helpInfo = "2858 plus 634 is 3458 plus 34 is 3488 plus 4 is 3492. You can also switch numbers if easier, or round up.";
        basicSumEngine(1000, 9999, 100, 999, "+")
    }

    function twoByTwoSubtraction() {
        $scope.helpInfo = "If the problem requires borrowing, round up the number and add back the difference";
        basicSumEngine(10, 99, 10, 99, "-");
    }

    function threeByThreeSubtraction() {
        $scope.helpInfo = "Use compliments if needs borrowing";
        basicSumEngine(100, 999, 100, 999, "-");
    }

    function fourByThreeSubtraction() {
        $scope.helpInfo = "Use compliments if needs borrowing";
        basicSumEngine(1000, 9999, 100, 999, "-")
    }

    function twoByOneMultiplication() {
        $scope.helpInfo = "Add the two parts of the calculation left-to-right";
        basicSumEngine(10, 99, 2, 9, "x");
    }

    function threeByOneMultiplication() {
        $scope.helpInfo = "Left-to-right. Say parts of the calculation, and possibly the first two digits out loud. \
                    Work towards holding the entire problem in your memory. \
                    326 x 7 is 2100 + 140 is 2240 + 42 is 2282";
        basicSumEngine(100, 999, 2, 9, "x");
    }

    function twoDigitSquare() {
        $scope.helpInfo = "e.g. 43 squared is 40 x 46 + 3 squared is 1849";
        squareEngine(10, 99);
    }
});

app.filter('html',function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
});

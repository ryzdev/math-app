var app = angular.module("mmApp", []);

app.controller("mmAppController", function ($scope) {

    $scope.mode = "learning";
    $scope.helpInfo = "";
    $scope.option = "0";
    $scope.var1 = 0;
    $scope.operator = "";
    $scope.var2 = 0;
    $scope.answer = 0;

    $scope.currentExercise = 1;
    $scope.exerciseName = "";
    $scope.numberOfAnswersCorrect = 0;

    $scope.nextRandomQuestion = function () {
        $scope.showAnswer = false;
        randomCalculation();
    };

    $scope.correctAnswer = function () {
        $scope.showAnswer = false;
        $scope.numberOfAnswersCorrect++;
        if($scope.numberOfAnswersCorrect > 2){
            $scope.currentExercise++;
            $scope.numberOfAnswersCorrect = 0;
        }
        selectExercise($scope.currentExercise);
    };

    $scope.resetQuestion = function () {
        $scope.showAnswer = false;
        $scope.numberOfAnswersCorrect = 0;
        selectExercise($scope.currentExercise);
    };

    $scope.helpMe = function () {
        alert($scope.helpInfo);
    };

    if($scope.mode === 'learning'){
        $scope.resetQuestion();
    } else  {
        $scope.nextRandomQuestion();
    }

    function randomCalculation() {
        var n = parseInt($scope.option);
        if (n == 0) {
            n = Math.floor(Math.random() * 9) + 1;
        }
        selectExercise(n);
    }

    function selectExercise(n) {
        switch (n) {
            case 1:
                $scope.exerciseName = 'Two by two addition';
                $scope.helpInfo = "34 plus 25 is 54 plus 5 is 59";
                basicSumEngine(10, 99, 10, 99, "+");
                break;

            case 2:
                $scope.exerciseName = 'Three by three addition';
                $scope.helpInfo = "858 plus 634 is 1458 plus 34 is 1488 plus 4 is 1492. You can also switch numbers if easier, or round up.";
                basicSumEngine(100, 999, 100, 999, "+");
                break;

            case 3:
                $scope.exerciseName = 'Four by three addition';
                $scope.helpInfo = "2858 plus 634 is 3458 plus 34 is 3488 plus 4 is 3492. You can also switch numbers if easier, or round up.";
                basicSumEngine(1000, 9999, 100, 999, "+");
                break;

            case 4:
                $scope.exerciseName = 'Two by two subtraction';
                $scope.helpInfo = "If the problem requires borrowing, round up the number and add back the difference";
                basicSumEngine(10, 99, 10, 99, "-");
                break;

            case 5:
                $scope.exerciseName = 'Three by three subtraction';
                $scope.helpInfo = "Use compliments if needs borrowing";
                basicSumEngine(100, 999, 100, 999, "-");
                break;

            case 6:
                $scope.exerciseName = 'Four by three subtraction';
                $scope.helpInfo = "Use compliments if needs borrowing";
                basicSumEngine(1000, 9999, 100, 999, "-");
                break;

            case 7:
                $scope.exerciseName = 'Two by one multiplication';
                $scope.helpInfo = "Add the two parts of the calculation left-to-right";
                basicSumEngine(10, 99, 2, 9, "x");
                break;

            case 8:
                $scope.exerciseName = 'Three by one multiplication';
                $scope.helpInfo = "Left-to-right. Say parts of the calculation, and possibly the first two digits out loud. \
                    Work towards holding the entire problem in your memory. \
                    326 x 7 is 2100 + 140 is 2240 + 42 is 2282";
                basicSumEngine(100, 999, 2, 9, "x");
                break;

            case 9:
                $scope.exerciseName = 'Two digit square';
                $scope.helpInfo = "e.g. 43 squared is 40 x 46 + 3 squared is 1849";
                squareEngine(10, 99);
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
});

app.filter('html',function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
});

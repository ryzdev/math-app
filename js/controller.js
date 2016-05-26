var app = angular.module("mmApp", ['ngCookies']);

app.controller("mmAppController", function($scope, $cookies) {

    var cookieName = "mentalMath";
    var defaultRoundSize = 3;

    $scope.mode = "learning";
    $scope.helpInfo = "";
    $scope.option = "0";
    $scope.revisionComplete = false;
    $scope.exerciseName = "";

    $scope.var1 = 0;
    $scope.operator = "";
    $scope.var2 = 0;
    $scope.answer = 0;

    $scope.progress = {
        currentExercise: 0,
        questionsRemaining: 0
    };

    var exercises = getExercises();

    $scope.correctAnswer = function () {
        $scope.showAnswer = false;
        $scope.progress.questionsRemaining--;
        if ($scope.progress.questionsRemaining === 0) {
            var won = checkWinning();
            if (!won) {
                $scope.progress.currentExercise++;
                $scope.progress.questionsRemaining = defaultRoundSize;
            }
        }
        saveProgress();
        exercises[$scope.progress.currentExercise -1].exercise();
    };
    $scope.incorrectAnswer = function() {
        $scope.progress.questionsRemaining = defaultRoundSize;
        nextQuestion();
    };

    $scope.refreshQuestion = function() {
        nextQuestion();
    };

    $scope.helpMe = function () {
        alert($scope.helpInfo);
    };

    $scope.clearProgressAndReset = function() {
        $cookies.remove(cookieName);
        setup();
        $scope.revisionComplete = false;
    };

    setup();

    function setup() {
        var savedProgress = $cookies.getObject(cookieName);
        if(savedProgress){
            $scope.progress = savedProgress;
            checkWinning();
        } else {
            $scope.progress = {currentExercise: 1, questionsRemaining: defaultRoundSize};
        }
        nextQuestion();
    }

    function nextQuestion(){
        $scope.showAnswer = false;
        if ($scope.mode === 'learning') {
            exercises[$scope.progress.currentExercise -1].exercise();
        } else {
            nextRandomQuestion();
        }
    }

    function nextRandomQuestion() {
        var n = parseInt($scope.option);
        if (n == 0) {
            n = Math.floor(Math.random() * exercises.length);
        }
        exercises[n].exercise();
    }

    function saveProgress() {
        var cookieExpiry = new Date();
        cookieExpiry.setFullYear(cookieExpiry.getFullYear() + 1);
        $cookies.putObject(cookieName, $scope.progress, {expires: cookieExpiry.toUTCString()});
    }

    function checkWinning() {
        if ($scope.progress.currentExercise === exercises.length && $scope.progress.questionsRemaining === 0) {
            $scope.revisionComplete = true;
            return true;
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

    function getExercises(){
        return [
            {
                id: 1,
                exercise: function () {
                    $scope.exerciseName = 'Two by two addition';
                    $scope.helpInfo = "34 plus 25 is 54 plus 5 is 59";
                    basicSumEngine(10, 99, 10, 99, "+");
                }
            }, {
                id: 2,
                exercise: function () {
                    $scope.exerciseName = 'Three by three addition';
                    $scope.helpInfo = "858 plus 634 is 1458 plus 34 is 1488 plus 4 is 1492. You can also switch numbers if easier, or round up.";
                    basicSumEngine(100, 999, 100, 999, "+");
                }
            }, {
                id: 3,
                exercise: function () {
                    $scope.exerciseName = 'Four by three addition';
                    $scope.helpInfo = "2858 plus 634 is 3458 plus 34 is 3488 plus 4 is 3492. You can also switch numbers if easier, or round up.";
                    basicSumEngine(1000, 9999, 100, 999, "+");
                }
            }, {
                id: 4,
                exercise: function () {
                    $scope.exerciseName = 'Two by two subtraction';
                    $scope.helpInfo = "If the problem requires borrowing, round up the number and add back the difference";
                    basicSumEngine(10, 99, 10, 99, "-");
                }
            }, {
                id: 5,
                exercise: function () {
                    $scope.exerciseName = 'Three by three subtraction';
                    $scope.helpInfo = "Use compliments if needs borrowing";
                    basicSumEngine(100, 999, 100, 999, "-");
                }
            }, {
                id: 6,
                exercise: function () {
                    $scope.exerciseName = 'Four by three subtraction';
                    $scope.helpInfo = "Use compliments if needs borrowing";
                    basicSumEngine(1000, 9999, 100, 999, "-");
                }
            }, {
                id: 7,
                exercise: function () {
                    $scope.exerciseName = 'Two by one multiplication';
                    $scope.helpInfo = "Add the two parts of the calculation left-to-right";
                    basicSumEngine(10, 99, 2, 9, "x");
                }
            }, {
                id: 8,
                exercise: function () {
                    $scope.exerciseName = 'Three by one multiplication';
                    $scope.helpInfo = "Left-to-right. Say parts of the calculation, and possibly the first two digits out loud. \
                    Work towards holding the entire problem in your memory. \
                    326 x 7 is 2100 + 140 is 2240 + 42 is 2282";
                    basicSumEngine(100, 999, 2, 9, "x");
                }
            }, {
                id: 9,
                exercise: function () {
                    $scope.exerciseName = 'Two digit square';
                    $scope.helpInfo = "e.g. 43 squared is 40 x 46 + 3 squared is 1849";
                    squareEngine(10, 99);
                }
            }
        ];
    }
});

app.filter('html',function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
});

(function(){
    function Controller($scope){
        $scope.gameStatus = "ready";
        $scope.botNum;
        $scope.botHistory = [];
        $scope.result;
        $scope.resultHistory = [];
        $scope.sfiled = 0;
        $scope.bfiled = 0;

        var bot;
        var botGuessNumbers;
        var checkResult;

        $scope.$watch('result', function(){
            if($scope.result){
                console.log("empty?: "+$scope.result);
                $scope.sfiled = Number($scope.result.charAt(0));
                $scope.bfiled = Number($scope.result.charAt(2));
            }
        });
        $scope.resInput = function(){
            if($scope.gameStatus == 'ready'){
                $scope.gameStatus = 'play';

                bot = new Bot();
                checkResult = new CheckResult(false, 0, 0);

                $scope.result = "";
                $scope.botHistory = [];
                $scope.resultHistory = [];

                botGuessNumbers = bot.getNextGuess();
                $scope.botHistory.push({numbers:botGuessNumbers.toString(), checkResult:checkResult});
            }else if($scope.gameStatus == 'play'){
                checkResult = new CheckResult(false, $scope.sfiled, $scope.bfiled);

                $scope.resultHistory.push({numbers:botGuessNumbers.toString(), checkResult:checkResult});

                bot.guessResultIn(botGuessNumbers, checkResult)
                botGuessNumbers = bot.getNextGuess();

                $scope.botHistory.push({numbers:botGuessNumbers.toString(), checkResult:checkResult});

                $scope.result = "";
                $scope.sfiled = 0;
                $scope.bfiled = 0;
            }else if($scope.gameStatus == 'over'){
                $scope.gameStatus = 'ready';
            }
        };
        $scope.setSFiled = function(num){
            $scope.sfiled = num;
            $scope.result = ""+$scope.sfiled+" "+$scope.bfiled;
        }
        $scope.setBFiled = function(num){
            $scope.bfiled = num;
            $scope.result = ""+$scope.sfiled+" "+$scope.bfiled;
        }
    };

    String.prototype.replaceAt=function(index, character) {
        return this.substr(0, index) + character + this.substr(index+character.length);
    }

    var firstApp = angular.module("baseBallApp", []);
    firstApp.controller("Controller", Controller);
    firstApp.directive('historyList', function(){
        return {
            restrict: 'A'
            ,scope: {
                gameHistory: '=gameHistory'
            }
            ,template: '<p>'
								+ '<p class="rbtn pure-button">{{gameHistory.numbers[0]}}</p>'
								+ '<p class="rbtn pure-button">{{gameHistory.numbers[1]}}</p>'
								+ '<p class="rbtn pure-button">{{gameHistory.numbers[2]}}</p>'
								+ ' -> ' 
								+ '<p class="rbtn pure-button">{{gameHistory.checkResult.strikeCount}}S  {{gameHistory.checkResult.ballCount}}B</p>'
								+ '</p>'
        };
    });
})();

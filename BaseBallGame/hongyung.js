(function(){
    function Controller($scope){
        $scope.gameStatus = "ready";
        $scope.botNum;
        $scope.botHistory = [];
        $scope.result;
        $scope.resultHistory = [];

        var bot;
        var botGuessNumbers;
        var checkResult;

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
                console.log("first : "+botGuessNumbers.toString());
            }else if($scope.gameStatus == 'play'){
                console.log($scope.result)
                $scope.result = "";

                botGuessNumbers = bot.getNextGuess();
                $scope.botHistory.push({numbers:botGuessNumbers.toString(), checkResult:checkResult});
                console.log(botGuessNumbers.toString());
            }else if($scope.gameStatus == 'over'){
                $scope.gameStatus = 'ready';
            }
        };
    };

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
						// ,templateUrl: 'history_template.html'
        };
    });
})();

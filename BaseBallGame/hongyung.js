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
                $scope.shouldBeFocus = true;
                bot = new Bot();

                $scope.result = "";
                $scope.botHistory = [];
                $scope.resultHistory = [];

                botGuessNumbers = bot.getNextGuess();
                $scope.botHistory.push({numbers:botGuessNumbers.toString()});
            }else if($scope.gameStatus == 'play'){
                checkResult = new CheckResult($scope.sfiled, $scope.bfiled);

                $scope.resultHistory.push({numbers:botGuessNumbers.toString(), checkResult:checkResult});

                if(checkResult.isSame){
                    $scope.gameStatus = "over";
                    console.log("it's over!");
                    return ;
                }

                bot.guessResultIn(botGuessNumbers, checkResult)
                botGuessNumbers = bot.getNextGuess();

                $scope.botHistory.push({numbers:botGuessNumbers.toString()});

                $scope.result = "";
                $scope.sfiled = 0;
                $scope.bfiled = 0;
                textFoucs();
            }else if($scope.gameStatus == 'over'){
                $scope.setGameRestart();
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
        
        $scope.setGameRestart = function(){
            $scope.gameStatus = "ready";
            $scope.resInput();
            console.log($scope.gameStatus);
        }
        var textFoucs = function(){// for auto focus text input
                $scope.shouldBeFocus = !$scope.shouldBeFocus;
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
            ,link: function(scope, element, attrs){
                if(scope.gameHistory.checkResult == null)
                    console.log(scope.gameHistory);
                scope.isBotHistory = function(){
                    return (scope.gameHistory.checkResult == null);
                }
            }
            ,template: '<p>'
								+ '<p class="rbtn pure-button">{{gameHistory.numbers[0]}}</p>'
								+ '<p class="rbtn pure-button">{{gameHistory.numbers[1]}}</p>'
								+ '<p class="rbtn pure-button">{{gameHistory.numbers[2]}}</p>'
								+ '<span ng-hide="isBotHistory()"> -> ' 
                                + '<p class="rbtn pure-button">{{gameHistory.checkResult.strikeCount}}S  {{gameHistory.checkResult.ballCount}}B</p>'
                                + '</span>'
								+ '</p>'
        };
    });
    firstApp.directive('firstFocus', function($timeout, $parse){
        return {
            link: function(scope, element, attrs){
                var model = $parse(attrs.firstFocus);
                scope.$watch(model, function(value){
                    console.log('value=', value);
                    $timeout(function() {
                        element[0].focus();
                        });
                });
            }
        }
    });
})();

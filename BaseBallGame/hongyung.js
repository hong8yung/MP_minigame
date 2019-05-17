(function(){
    function Controller($scope){
        $scope.gameStatus = "ready";
        $scope.chalNum;
        $scope.chalHistory = [];
        $scope.result;
        $scope.resultHistory = [];

        var bot;

        $scope.resInput = function(){
            if($scope.gameStatus == 'ready'){
                $scope.gameStatus = 'play';
                bot = new Bot();

                $scope.chalHistory = [];
                $scope.resultHistory = [];
            }else if($scope.gameStatus == 'play'){
                
            }else if($scope.gameStatus == 'over'){
                $scope.gameStatus = 'ready';
            }
        };
    };

    var firstApp = angular.module("baseBallApp", []);
    firstApp.controller("Controller", Controller);
})();

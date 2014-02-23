angular.module('drone-control', [])
    .run(['goInstantService',
        function(goInstantService) {
            if(!goInstantService.hasToken()){
            	goInstantService.getNewToken().then(function(){
            		alert("WHORAY");
            	});
            }
        }
    ]);

angular.module('drone-control').controller('Main', function() {
    $scope.move = function(direction) {
        alert(direction);
    }
});

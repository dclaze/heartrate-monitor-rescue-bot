angular.module('drone-control').controller('Visualizer', ['$scope', '$http',
    function($scope, $http) {
        var n = 40,
        random = d3.random.normal(0, .2),
        data = d3.range(n).map(random);

        $scope.source = data;
    }
]);

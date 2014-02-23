angular.module('drone-control').service('goInstantService', ['$http', '$q', 'guid',
    function($http, $q, guid) {
        var getDeviceId = function() {
            var deviceId = localStorage.getItem("deviceId");
            if (deviceId != null)
                return deviceId;
            else {
                var newId = guid.newGuid();
                localStorage.setItem("deviceId", newId);
                return newId;
            }
        };
        return {
            hasToken: function() {
                var token = localStorage.getItem("droneControl")
                return token != null;
            },
            setToken: function(token) {
                localStorage.setItem("droneControl", token);
            },

            getNewToken: function() {
                var deferred = $q.defer();
                debugger
                $http.get('http://localhost:39999/startup', {
                    userId: getDeviceId(),
                    userName: "TestGuy"
                }).success(function(response) {
                    deferred.resolve(response);
                })
                    .error(function(response) {
                        deferred.reject(response);
                    });

                return deferred.promise;
            }
        };
    }
]);

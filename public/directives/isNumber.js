/* 
    isNumber.js
    To check whether the input is a numbe or not

    Revision history
    Pranav Maharaj, 2014.06.20: created
 */


app.directive('isNumber', function () {
	return {
		require: 'ngModel',
		link: function (scope) {	
			scope.$watch('formData.lineVoltage', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                    scope.formData.lineVoltage = oldValue;
                }
            });
		}
	};
});
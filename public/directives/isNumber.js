/* 
    isNumber.js
    To check whether the input is a numbe or not

    Revision history
    Pranav Maharaj, 2014.06.20: created
 */

<<<<<<< HEAD
angular.module('myApp',[])
.directive('numeric', function() {
        return function(scope, element, attrs) {

            $(element[0]).numericInput({ allowFloat: true });

        };
    })

function MyCtrl($scope,$window) {
  
  
}


<!--    jquery plugin : download from  https://github.com/joshuadeleon/NumericInput/blob/master/numericInput.js ---------- -->
    
    
    
    
    
    
    
    
    
    (function( $ ) {
        // Plugin defaults
        var defaults = {
                allowFloat: false,
                allowNegative: false
        };        
        
        // Plugin definition
        //        allowFloat: (boolean) Allows floating point (real) numbers. If set to false only integers will be allowed. Default: false.
        //        allowNegative: (boolean) Allows negative values. If set to false only positive number input will be allowed. Default: false.
         $.fn.numericInput = function( options ) { 
                var settings = $.extend( {}, defaults, options ); 
                var allowFloat = settings.allowFloat;
                var allowNegative = settings.allowNegative;
                
                this.keypress(function (event) {
                        var inputCode = event.which;
                        var currentValue = $(this).val();

                        if (inputCode > 0 && (inputCode < 48 || inputCode > 57))        // Checks the if the character code is not a digit
                        {
                                if (allowFloat == true && inputCode == 46)        // Conditions for a period (decimal point)
                                {
                                        //Disallows a period before a negative
                                        if (allowNegative == true && getCaret(this) == 0 && currentValue.charAt(0) == '-') 
                                                return false;

                                        //Disallows more than one decimal point.
                                        if (currentValue.match(/[.]/)) 
                                                return false; 
                                }

                                else if (allowNegative == true && inputCode == 45)        // Conditions for a decimal point
                                {
                                        if(currentValue.charAt(0) == '-') 
                                                return false;
                                        
                                        if(getCaret(this) != 0) 
                                                return false; 
                                }

                                else if (inputCode == 8)         // Allows backspace
                                        return true; 

                                else                                                                // Disallow non-numeric
                                        return false;  
                        }

                        else if(inputCode > 0 && (inputCode >= 48 && inputCode <= 57))        // Disallows numbers before a negative.
                        {
                                if (allowNegative == true && currentValue.charAt(0) == '-' && getCaret(this) == 0) 
                                        return false;
                        }
                });
                
                return this;
        };
        
        
        // Private function for selecting cursor position. Makes IE play nice.
        //        http://stackoverflow.com/questions/263743/how-to-get-caret-position-in-textarea
        function getCaret(element) 
        { 
                if (element.selectionStart) 
                        return element.selectionStart; 

                else if (document.selection) //IE specific
                { 
                        element.focus(); 

                        var r = document.selection.createRange(); 
                        if (r == null) 
                                return 0; 

                        var re = element.createTextRange(), 
                        rc = re.duplicate(); 
                        re.moveToBookmark(r.getBookmark()); 
                        rc.setEndPoint('EndToStart', re); 
                        return rc.text.length; 
                }  

                return 0; 
        };
}( jQuery ));
=======
app.directive('numberOnlyInput', function () {
    return {
        restrict: 'EA',
        template: '<input class="form-control" name="{{inputName}}" ng-model="inputValue" />',z
        scope: {
            inputValue: '=',
            inputName: '='
        },
        link: function (scope) {
            scope.$watch('inputValue', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                    scope.inputValue = oldValue;
                }
            });
        }
    };
});

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

app.directive('numbersOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue == undefined) return '' 
           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
});
>>>>>>> parent of 7adfa50... Revert "f"

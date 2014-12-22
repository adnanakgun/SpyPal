// Angular application definition
var app = angular.module('app', []);

// Angular main controller
app.controller('encodeController', function encodeController($scope){

  $scope.keyText,
  $scope.alphabet;

  $scope.alphabetData = [{
    id: 0,
    label: 'English',
    value: 'abcdefghijklmnopqrstuvwxyz'
  }, {
    id: 1,
    label: 'German',
    value: 'abcdefghijklmnopqrstuvwxyzäöüß'
  }];

  $scope.getAlphabetValue = function(alphabetId){
    var val = $scope.alphabetData[0];

    for(abc in $scope.alphabetData){
      if ($scope.alphabetData[abc].id == alphabetId){
        val = $scope.alphabetData[abc];
      }
    }
    return val;
  }

  $scope.doBoth = function(){
    window.localStorage.setItem('keyText', $scope.keyText);
    window.localStorage.setItem('alphabetId', $scope.selectedAlphabet.id);
    $scope.encode($scope.plainText);
    $scope.decode($scope.encodedText);
  }

  $scope.unify = function(key){
    var unifiedKey = '';

    for(var i=0; i<key.length; i++){
      if (unifiedKey.indexOf(key.charAt(i)) === -1){
        unifiedKey += key.charAt(i);
      }
    }

    return unifiedKey;
  }

  $scope.equalise = function(uniKey, alphabet){
    var equalAlphabet = alphabet;

    for(var i=0; i<alphabet.length; i++){
      if (uniKey.indexOf(alphabet.charAt(i)) === -1){
        equalAlphabet = equalAlphabet.replace(alphabet.charAt(i), '');
      }
    }

    return equalAlphabet;
  }

  $scope.encode = function(txt){
    if(txt){
      var key1 = $scope.unify($scope.keyText.toLowerCase().split(' ').join('')),
          key2 = $scope.equalise(key1, $scope.getAlphabetValue($scope.alphabet).value.toLowerCase().split(' ').join(''));
     
      $scope.encodedResult = '';

      for(var i=0; i<txt.length; i++){
        var integer = key1.indexOf(txt.charAt(i));
        if(integer > -1){
          $scope.encodedResult += key2.charAt(integer);  
        }else{
          $scope.encodedResult += txt.charAt(i);
        }
        
      }
    }
  }

  $scope.decode = function(txt){
    if(txt){
      var key1 = $scope.unify($scope.keyText.toLowerCase().split(' ').join('')),
          key2 = $scope.equalise(key1, $scope.getAlphabetValue($scope.alphabet).value.toLowerCase().split(' ').join(''));

      $scope.decodedResult = '';

      for(var i=0; i<txt.length; i++){
        var integer = key2.indexOf(txt.charAt(i));
        if(integer > -1){
          $scope.decodedResult += key1.charAt(integer);  
        }else{
          $scope.decodedResult += txt.charAt(i);
        }
        
      }
    }
  }

  $scope.clearLocalStorage = function(){
      window.localStorage.removeItem("keyText");
      window.localStorage.removeItem("alphabet");
      window.localStorage.removeItem("alphabetVal");
      window.localStorage.removeItem("alphabetId");
      alert('Done!');
  }

  if(window.localStorage.getItem('keyText') === null){
    window.localStorage.setItem('keyText', 'The Quick Brown Fox Jumps Over The Lazy Dog');
  }
 
  if(window.localStorage.getItem('alphabetId') === null){
    window.localStorage.setItem('alphabetId', 0); // english - abcdefghijklmnopqrstuvwxyz
  }

  $scope.keyText = window.localStorage.getItem('keyText');
  $scope.alphabetId = window.localStorage.getItem('alphabetId');
  $scope.selectedAlphabet = $scope.getAlphabetValue($scope.alphabetId);

});
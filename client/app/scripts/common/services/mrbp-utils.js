angular.module('mrbpApp')
.service('MrbpUtilitis', [
    function() {
        var utilsService = {
            getEncryptedValue : function(value, key) {
                return CryptoJS.AES.encrypt(value, key).toString();
            }
        }
        return utilsService;
    }
]);

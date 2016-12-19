var CordovaTools = (function (logToConsole) {
    var init = (function() {
        cLog('CordovaTools loaded.');
    })();

    function getPresistentStoragePath(onSuccess, onFail) {
        window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            cLog('Success: cordovaTools.gerPresistentStoragePath');

            if (typeof onSuccess === 'function')
                onSuccess(fileSystem.root.toURL());
        },
        function (result) {
            cLog('Faild: cordovaTools.gerPresistentStoragePath(onSuccess, onFail)', result);

            if (typeof onFail === 'function')
                onFail(result);
        });
    }

    function convertNativeToCdvPath(nativeFilePath, onSuccess, onFail) {
        window.resolveLocalFileSystemURL('cdvfile://localhost/persistent/',
            function (entry) {
                cLog('Success: cordovaTools.convertToCdvFilePath');

                if (typeof onSuccess === 'function')
                    onSuccess(entry.toURL(), entry);
            },
            function (result) {
                cLog('Faild: cordovaTools.convertToCdvFilePath(nativeFilePath, onSuccess, onFail)', result);

                if (typeof onFail === 'function')
                    onFail(result);
            });
    }

    function convertCdvToNativePath(cdvFilePath, onSuccess, onFail) {
        window.resolveLocalFileSystemURL(cdvFilePath,
            function (entry) {
                cLog('Success: cordovaTools.convertToNativePath');

                if (typeof onSuccess === 'function')
                    onSuccess(entry.toInternalURL(), entry);
            },
            function (result) {
                cLog('Faild: cordovaTools.convertToNativePath(cdvFilePath, onSuccess, onFail)', result);

                if (typeof onFail === 'function')
                    onFail(result);
            });
    }

    function cLog() {
        if (logToConsole)
            console.log.apply(this, arguments);
    }

    return {
        convertNativeToCdvPath: convertNativeToCdvPath,
        convertCdvToNativePath: convertCdvToNativePath,
        getPresistentStoragePath: getPresistentStoragePath
    }
});

var dataArrays = (function () {
    var imageWebUrlsRandomCats = [
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/abyssinian-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/americanbobtail-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/americancurl-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/americanwirehair-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/Balinese-cat-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/bengal-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/birman-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/bombay-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/british-shorthair-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/burmese-cat-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/burmilla-cat-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/Chartreux-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/colorpoint-shorthair-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/cornish-rex-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/cymric-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/devon-rex-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/donskoy-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/Egyptian-Mau-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/exotic-shorthair-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/havana-brown-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/highlander-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/japanese-bobtail-cat-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/khao-manee-cat-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/maine-coon-cat-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/minskin-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/munchkin-cat-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/norwegianforestcat-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/ojos-azules-cat-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/oriental-cat-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/Peterbald-cat-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/Ragdoll-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/savannah-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/serengeti-cat-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/siamese-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/siberian-cat-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/snowshoe-cat-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/sokoke-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/Sphynx-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/toyger-main.jpg',
    'http://purrfectcatbreeds.com/wp-content/uploads/2014/06/turkish-van-cat-main.jpg'
    ];
    var imageWebUrlsBigSizeCats = [
        'http://static2.businessinsider.com/image/5654150584307663008b4ed8/this-tech-recruiter-owns-the-most-hipster-cat-on-instagram.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_March_2010-1.jpg',
        'http://cdn3-www.cattime.com/assets/uploads/2012/07/abyssinian-cat.jpg',
        'http://cdn3-www.cattime.com/assets/uploads/2012/07/siamese-cat.jpg',
        'https://s-media-cache-ak0.pinimg.com/originals/52/79/2f/52792fbbe1e6c1a49fe3bbcf43660cf5.jpg',
        'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg'
    ];

    //function getRandomCats(amount) {
    //    var result = [];

    //    while (result.length <= amount) {

    //    }
    //}

    return {
        imageWebUrlsRandomCats: imageWebUrlsRandomCats,
        imageWebUrlsBigSizeCats: imageWebUrlsBigSizeCats
    }
})();

var randomizedString = (function () {
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var numbers = '0123456789';

    function getLetters(length) {
        var result = '';

        for (var i = 0; i < length; i++)
            result += letters.charAt(Math.floor(Math.random() * letters.length));

        return result;
    }

    function getNumbers(length) {
        var result = '';

        for (var i = 0; i < length; i++)
            result += numbers.charAt(Math.floor(Math.random() * numbers.length));

        return result;
    }

    function getLettersAndNumbers(length) {
        var result = '';
        var posible = letters + numbers;

        for (var i = 0; i < length; i++)
            result += posible.charAt(Math.floor(Math.random() * posible.length));

        return result;
    }

    return {
        getLetters: getLetters,
        getNumbers: getNumbers,
        getLettersAndNumbers: getLettersAndNumbers
    }
})();



// Credit:
// http://stackoverflow.com/a/1349426
// http://stackoverflow.com/a/3914600
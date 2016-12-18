/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = (function () {
    var $content;
    var imagesUrls = [];
    var imageUris = [
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
    


    $(document).ready(function () {
        $content = $('#content');
    });

    function initialize() {
        bindEvents();
    }

    function bindEvents() {
        document.addEventListener('deviceready', onDeviceReady, false);
    }

    function onDeviceReady() {
        receivedEvent('deviceready');
    }

    function receivedEvent(id) {
        var $parentElement = $('#' + id);
        $parentElement.find('.listening').hide();
        $parentElement.find('.received, .saveFile, .showFile, .clearContent').show();

        console.log('Received Event: ' + id);

        $parentElement.find('.saveFile').on('touchstart', write);
        $parentElement.find('.showFile').on('touchstart', show);

        $parentElement.find('.clearContent').on('touchstart', function(event) {
            $('#content').html('');
        });
    }

    function addContent(content, html) {
        console.log(content, html);

        var $div = $('<div>');

        if (html)
            $div.html(content);
        else
            $div.text(content);

        $('#content').append($div);

    }

    function write(event) {
        var connectionType = navigator.connection.type.toLowerCase();
        addContent('Getting file over [' + connectionType + '].');

            // Note: The file system has been prefixed as of Google Chrome 12:
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
            window.requestFileSystem(
                LocalFileSystem.PERSISTENT,
                0,
                function (fs) {
                    var fileURL = 'cdvfile://localhost/persistent/file.png';
                    var uri = encodeURI('https://files.graphiq.com/stories/t2/tiny_cat_12573_8950.jpg');
                    var fileTransfer = new FileTransfer();

                    fileTransfer.download(
                        uri,
                        fileURL,
                        function (entry) {
                            addContent('download complete: ' + entry.fullPath);
                        },
                        function (error) {
                            addContent('download error source ' + error.source);
                            addContent('download error target ' + error.target);
                            addContent('upload error code' + error.code);
                        },
                        false,
                        {
                            // headers: {
                            //     'Authorization': 'Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=='
                            // }
                        }
                    );

                },
                function () {
                    addContent('Error: window.requestFileSystem');
                });
    }

    function show(event) {
        addContent('Showing file.');

        resolveLocalFileSystemURL(
            'cdvfile://localhost/persistent/file.png',
             function (entry) {
                 var imageUrl = entry.toURL();

                 addContent('Native URI: ' + imageUrl);

                 addContent($('<img>', {
                     src: imageUrl
                 }), true);
             });
    }

    return {
        initialize: initialize
    }
})();

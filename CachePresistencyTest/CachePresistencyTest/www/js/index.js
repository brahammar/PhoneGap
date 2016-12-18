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
    var imageFileUrls = [];



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

        $parentElement.find('.clearContent').on('touchstart', function (event) {
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
        dataArrays.imageWebUrlsRandomCats.forEach(function (webUrl, index, source) {
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
            window.requestFileSystem(
                LocalFileSystem.PERSISTENT,
                0,
                function (fs) {
                    var imageName = webUrl.split('/').splice(-1);
                    var fileURL = 'cdvfile://localhost/persistent/img/' + randomizedString.getLetters(6) + '-' + imageName;
                    var webUri = encodeURI(webUrl);
                    var fileTransfer = new FileTransfer();

                    fileTransfer.download(
                        webUri,
                        fileURL,
                        function (entry) {
                            imageFileUrls.push(fileURL);

                            if (source.length === index + 1)
                                addContent('Total number of files: ' + imageFileUrls.length);
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
        });
    }

    function show(event) {
        if (imageFileUrls.length === 0) {
            addContent('No images to show.');
            return;
        }

        resolveLocalFileSystemURL(
        imageFileUrls[Math.floor(Math.random() * imageFileUrls.length)],
             function (entry) {
                 addContent($('<img>', {
                     src: entry.toURL()
                 }), true);
             });
    }

    return {
        initialize: initialize
    }
})();

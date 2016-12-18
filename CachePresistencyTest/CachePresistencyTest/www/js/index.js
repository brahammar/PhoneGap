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
    var imageFolderPath = 'cdvfile://localhost/persistent/img/';


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
        loadCachedFiles(imageFolderPath);
    }

    function receivedEvent(id) {
        var $parentElement = $('#' + id);
        $parentElement.find('.listening').hide();
        $parentElement.find('.received, .saveFile, .showFile, .showAllFiles, .clearContent').show();

        console.log('Received Event: ' + id);

        $parentElement.find('.saveFile').on('touchstart', write);
        $parentElement.find('.showFile').on('touchstart', show);
        $parentElement.find('.showAllFiles').on('touchstart', showAll);

        $parentElement.find('.clearContent').on('touchstart', function (event) {
            $('#content').html('');
        });
    }

    function loadCachedFiles(folderPath) {
        resolveLocalFileSystemURL(
        folderPath,
             function (entry) {
                 addContent('Doing the thing.');
                 var directoryReader = entry.createReader();
                 directoryReader.readEntries(
                     function (entries) {
                         entries.forEach(function (fileInfo) {
                             imageFileUrls.push(fileInfo.toURL());
                         });

                         addContent('Loaded ' + imageFileUrls.length + ' files from memory.');
                     },
                     function (e) {
                         addContent(JSON.stringify(e));
                     });
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
        var filesDownloaded = 0;

        addContent('Getting file over [' + connectionType + '].');

        // Note: The file system has been prefixed as of Google Chrome 12:
        dataArrays.imageWebUrlsRandomCats.forEach(function (webUrl, index, source) {
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
            window.requestFileSystem(
                LocalFileSystem.PERSISTENT,
                0,
                function (fs) {
                    var imageName = webUrl.split('/').splice(-1);
                    var fileURL = imageFolderPath + randomizedString.getLetters(6) + '-' + imageName;
                    var webUri = encodeURI(webUrl);
                    var fileTransfer = new FileTransfer();

                    fileTransfer.download(
                        webUri,
                        fileURL,
                        function (entry) {
                            imageFileUrls.push(entry.toURL());
                            filesDownloaded++;

                            if (source.length === index + 1)
                                addContent('Files downloaded: ' + filesDownloaded + ' / ' + (source.length + 1));
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
            $('#content').text('No images to show.');
            return;
        }

        var url = imageFileUrls[Math.floor(Math.random() * imageFileUrls.length)];

        $('#content')
            .html($('<img>', { alt: url, src: url }));
    }

    function showAll(event) {
        if (imageFileUrls.length === 0) {
            $('#content').text('No images to show.');
            return;
        }

        var $content = $('#content').html('').text('Total: ' + imageFileUrls.length);

        imageFileUrls.forEach(function (url, index) {
            $content
                .append($('<img>', { alt: url, src: url }))
                .append($('<div>').text(index + 1));
        });
    }

    return {
        initialize: initialize
    }
})();

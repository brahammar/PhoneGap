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
        addContent('Getting file over' + connectionType + '.');

        if (connectionType === 'wifi') {
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
        else {
            addContent('Not on WiFi, file not downloaded.');
            return;
        }
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

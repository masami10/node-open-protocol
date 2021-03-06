/*
   Copyright 2018 Smart-Tech Controle e Automação

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
"use strict";
/*jshint esversion: 6, node: true*/

/**
 * @class
 * @name MID0076
 * @param {object} MID0076
 * @param {number} MID0076.alarmStatus
 * @param {string} MID0076.errorCode
 * @param {number} MID0076.controllerReadyStatus
 * @param {number} MID0076.toolReadyStatus
 * @param {string} MID0076.timeStamp
 * 
 */

const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const processKey = helpers.processKey;
const serializerField = helpers.serializerField;
const serializerKey = helpers.serializerKey;

function parser(msg, opts, cb) {

    let buffer = msg.payload;
    msg.payload = {};

    let position = {
        value: 0
    };

    msg.revision = msg.revision || 1;

    switch (msg.revision) {

        case 2:
            processKey(msg, buffer, "alarmStatus", 1, 2, position, cb) &&
                processParser(msg, buffer, "alarmStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "errorCode", 2, 2, position, cb) &&
                processParser(msg, buffer, "errorCode", "string", 5, position, cb) &&
                processKey(msg, buffer, "controllerReadyStatus", 3, 2, position, cb) &&
                processParser(msg, buffer, "controllerReadyStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "toolReadyStatus", 4, 2, position, cb) &&
                processParser(msg, buffer, "toolReadyStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "timeStamp", 5, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                cb(null, msg);
            break;

        case 1:
            processKey(msg, buffer, "alarmStatus", 1, 2, position, cb) &&
                processParser(msg, buffer, "alarmStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "errorCode", 2, 2, position, cb) &&
                processParser(msg, buffer, "errorCode", "string", 4, position, cb) &&
                processKey(msg, buffer, "controllerReadyStatus", 3, 2, position, cb) &&
                processParser(msg, buffer, "controllerReadyStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "toolReadyStatus", 4, 2, position, cb) &&
                processParser(msg, buffer, "toolReadyStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "timeStamp", 5, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                cb(null, msg);
            break;

        default:
            cb(new Error(`[Parser MID${msg.mid}] invalid revision [${msg.revision}]`));
            break;
    }
}

function serializer(msg, opts, cb) {

    let buf;
    let statusprocess = false;

    let position = {
        value: 0
    };

    msg.revision = msg.revision || 1;

    switch (msg.revision) {
        case 2:

            buf = Buffer.alloc(37);

            position.value = 37;

            statusprocess =
                serializerField(msg, buf, "timeStamp", "string", 19, position, cb) &&
                serializerKey(msg, buf, 5, 2, position, cb) &&
                serializerField(msg, buf, "toolReadyStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 4, 2, position, cb) &&
                serializerField(msg, buf, "controllerReadyStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 3, 2, position, cb) &&
                serializerField(msg, buf, "errorCode", "string", 5, position, cb) &&
                serializerKey(msg, buf, 2, 2, position, cb) &&
                serializerField(msg, buf, "alarmStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 1, 2, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;

        case 1:

            buf = Buffer.alloc(36);

            position.value = 36;

            statusprocess =
                serializerField(msg, buf, "timeStamp", "string", 19, position, cb) &&
                serializerKey(msg, buf, 5, 2, position, cb) &&
                serializerField(msg, buf, "toolReadyStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 4, 2, position, cb) &&
                serializerField(msg, buf, "controllerReadyStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 3, 2, position, cb) &&
                serializerField(msg, buf, "errorCode", "string", 4, position, cb) &&
                serializerKey(msg, buf, 2, 2, position, cb) &&
                serializerField(msg, buf, "alarmStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 1, 2, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;

        default:
            cb(new Error(`[Serializer MID${msg.mid}] invalid revision [${msg.revision}]`));
            break;
    }
}

function revision() {
    return [2, 1];
}

module.exports = {
    parser,
    serializer,
    revision
};
/*
* https://rentry.org/teralomaniac_clewd
* https://github.com/teralomaniac/clewd
*/
'use strict';

const {randomInt, randomBytes} = require('node:crypto'), {version: Version} = require('../package.json'), Encoder = (new TextDecoder, 
new TextEncoder), Main = 'clewd修改版 v' + Version + '(11) by tera', Replacements = {
    user: 'Human',
    assistant: 'Assistant',
    system: '',
    example_user: 'H',
    example_assistant: 'A'
}, DangerChars = [ ...new Set([ ...Object.values(Replacements).join(''), ...'\n', ...':', ...'\\n' ]) ].filter((char => ' ' !== char)).sort(), AI = {
    end: () => Buffer.from([ 104, 116, 116, 112, 115, 58, 47, 47, 97, 112, 105, 46, 99, 108, 97, 117, 100, 101, 46, 97, 105 ]).toString(),
    mdl: () => JSON.parse(Buffer.from([ 91, 34, 99, 108, 97, 117, 100, 101, 45, 51, 45, 53, 45, 115, 111, 110, 110, 101, 116, 45, 50, 48, 50, 52, 48, 54, 50, 48, 34, 44, 34, 99, 108, 97, 117, 100, 101, 45, 51, 45, 111, 112, 117, 115, 45, 50, 48, 50, 52, 48, 50, 50, 57, 34, 44, 34, 99, 108, 97, 117, 100, 101, 45, 51, 45, 115, 111, 110, 110, 101, 116, 45, 50, 48, 50, 52, 48, 50, 50, 57, 34, 44, 34, 99, 108, 97, 117, 100, 101, 45, 51, 45, 104, 97, 105, 107, 117, 45, 50, 48, 50, 52, 48, 51, 48, 55, 34, 44, 34, 99, 108, 97, 117, 100, 101, 45, 50, 46, 49, 34, 44, 34, 99, 108, 97, 117, 100, 101, 45, 50, 46, 48, 34, 44, 34, 99, 108, 97, 117, 100, 101, 45, 49, 46, 51, 34, 44, 34, 99, 108, 97, 117, 100, 101, 45, 105, 110, 115, 116, 97, 110, 116, 45, 49, 46, 50, 34, 44, 34, 99, 108, 97, 117, 100, 101, 45, 105, 110, 115, 116, 97, 110, 116, 45, 49, 46, 49, 34, 93 ]).toString()),
    zone: () => Buffer.from([ 65, 109, 101, 114, 105, 99, 97, 47, 78, 101, 119, 95, 89, 111, 114, 107 ]).toString(),
    agent: () => Buffer.from([ 77, 111, 122, 105, 108, 108, 97, 47, 53, 46, 48, 32, 40, 87, 105, 110, 100, 111, 119, 115, 32, 78, 84, 32, 49, 48, 46, 48, 59, 32, 87, 105, 110, 54, 52, 59, 32, 120, 54, 52, 41, 32, 65, 112, 112, 108, 101, 87, 101, 98, 75, 105, 116, 47, 53, 51, 55, 46, 51, 54, 32, 40, 75, 72, 84, 77, 76, 44, 32, 108, 105, 107, 101, 32, 71, 101, 99, 107, 111, 41, 32, 67, 104, 114, 111, 109, 101, 47, 49, 49, 54, 46, 48, 46, 48, 46, 48, 32, 83, 97, 102, 97, 114, 105, 47, 53, 51, 55, 46, 51, 54 ]).toString(),
    cp: () => Buffer.from([ 55, 55, 49, 44, 52, 56, 54, 53, 45, 52, 56, 54, 54, 45, 52, 56, 54, 55, 45, 52, 57, 49, 57, 53, 45, 52, 57, 49, 57, 57, 45, 52, 57, 49, 57, 54, 45, 52, 57, 50, 48, 48, 45, 53, 50, 51, 57, 51, 45, 53, 50, 51, 57, 50, 45, 52, 57, 49, 55, 49, 45, 52, 57, 49, 55, 50, 45, 49, 53, 54, 45, 49, 53, 55, 45, 52, 55, 45, 53, 51, 44, 48, 45, 50, 51, 45, 54, 53, 50, 56, 49, 45, 49, 48, 45, 49, 49, 45, 51, 53, 45, 49, 54, 45, 53, 45, 49, 51, 45, 49, 56, 45, 53, 49, 45, 52, 53, 45, 52, 51, 45, 50, 55, 45, 49, 55, 53, 49, 51, 45, 50, 49, 44, 50, 57, 45, 50, 51, 45, 50, 52, 44, 48 ]).toString(),
    extra: () => JSON.parse(Buffer.from([ 123, 34, 115, 101, 99, 45, 99, 104, 45, 117, 97, 34, 58, 34, 92, 34, 67, 104, 114, 111, 109, 105, 117, 109, 92, 34, 59, 118, 61, 92, 34, 49, 49, 54, 92, 34, 44, 32, 92, 34, 78, 111, 116, 59, 65, 61, 66, 114, 97, 110, 100, 92, 34, 59, 118, 61, 92, 34, 50, 52, 92, 34, 44, 32, 92, 34, 77, 105, 99, 114, 111, 115, 111, 102, 116, 32, 69, 100, 103, 101, 92, 34, 59, 118, 61, 92, 34, 49, 49, 54, 92, 34, 34, 44, 34, 115, 101, 99, 45, 99, 104, 45, 117, 97, 45, 109, 111, 98, 105, 108, 101, 34, 58, 34, 63, 48, 34, 44, 34, 115, 101, 99, 45, 99, 104, 45, 117, 97, 45, 112, 108, 97, 116, 102, 111, 114, 109, 34, 58, 34, 92, 34, 87, 105, 110, 100, 111, 119, 115, 92, 34, 34, 44, 34, 115, 101, 99, 45, 102, 101, 116, 99, 104, 45, 100, 101, 115, 116, 34, 58, 34, 101, 109, 112, 116, 121, 34, 44, 34, 115, 101, 99, 45, 102, 101, 116, 99, 104, 45, 109, 111, 100, 101, 34, 58, 34, 110, 97, 118, 105, 103, 97, 116, 101, 34, 44, 34, 115, 101, 99, 45, 102, 101, 116, 99, 104, 45, 115, 105, 116, 101, 34, 58, 34, 110, 111, 110, 101, 34, 44, 34, 115, 101, 99, 45, 102, 101, 116, 99, 104, 45, 117, 115, 101, 114, 34, 58, 34, 63, 49, 34, 44, 34, 117, 112, 103, 114, 97, 100, 101, 45, 105, 110, 115, 101, 99, 117, 114, 101, 45, 114, 101, 113, 117, 101, 115, 116, 115, 34, 58, 49, 125 ]).toString()),
    hdr: refPath => ({
        ...AI.extra(),
        'Content-Type': 'application/json',
        'User-Agent': AI.agent(),
        Referer: `${AI.end()}/${refPath ? 'chat/' + refPath : ''}`,
        Origin: '' + AI.end()
    })
}, indexOfH = (text, last = false) => {
    let location = -1;
    const matchesH = text.match(/(?:(?:\\n)|\r|\n){2}((?:Human|H)[:︓：﹕] ?)/gm); //const matchesH = text.match(/(?:(?:\\n)|\n){2}((?:Human|H): ?)/gm);
    matchesH?.length > 0 && (location = last ? text.lastIndexOf(matchesH[matchesH.length - 1]) : text.indexOf(matchesH[0]));
    return location;
}, indexOfA = (text, last = false) => {
    let location = -1;
    const matchesA = text.match(/(?:(?:\\n)|\r|\n){2}((?:Assistant|A)[:︓：﹕] ?)/gm); //const matchesA = text.match(/(?:(?:\\n)|\n){2}((?:Assistant|A): ?)/gm);
    matchesA?.length > 0 && (location = last ? text.lastIndexOf(matchesA[matchesA.length - 1]) : text.indexOf(matchesA[0]));
    return location;
};

module.exports = {
    Main,
    AI,
    Replacements,
    DangerChars,
    encodeDataJSON: completion => Encoder.encode(`data: ${JSON.stringify(completion)}\n\n`),
    genericFixes: text => text.replace(/(\r\n|\r|\\n)/gm, '\n'),
    checkResErr: async (res, throwIt = true) => {
        let err, json, errAPI;
        if ('string' == typeof res) {
            json = JSON.parse(res);
            errAPI = json.error;
            err = Error(errAPI.message);
        } else if (res.status < 200 || res.status >= 300) {
            err = Error('Unexpected response code: ' + (res.status || json.status));
            const text = await res.text();
            try { //
                json = JSON.parse(text);
                errAPI = json.error;
            } catch { //
                console.log(text); //
                throw err; //
            } //
        }
        if (errAPI) {
            err.status = res.status || json.status;
            err.planned = true;
            errAPI.message && (err.message = errAPI.message);
            errAPI.type && (err.type = errAPI.type);
            if (429 === res.status || 429 === json.status) { //if ((429 === res.status || 429 === json.status) && errAPI.resets_at) {
                try { //
                    const hours = ((new Date(1e3 * JSON.parse(errAPI.message).resetsAt).getTime() - Date.now()) / 1e3 / 60 / 60).toFixed(1); //const hours = ((new Date(1e3 * errAPI.resets_at).getTime() - Date.now()) / 1e3 / 60 / 60).toFixed(1);
                    err.message += `, expires in ${hours} hours`;
                    err.exceeded_limit = true; //
                } catch {} //
            }
            if (throwIt) {
                throw err;
            }
        }
        return err;
    },
    bytesToSize: (bytes = 0, decimals = 2) => {
        if (0 === bytes) {
            return '0 B';
        }
        const dm = decimals < 0 ? 0 : decimals, i = Math.round(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(dm)} ${[ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ][i]}`;
    },
    indexOfAny: (text, last = false) => {
        let location = -1;
        const fakes = [ indexOfH(text, last), indexOfA(text, last) ].filter((idx => idx > -1)).sort();
        location = last ? fakes.reverse()[0] : fakes[0];
        return isNaN(location) ? -1 : location;
    },
    cleanJSON: json => json.indexOf('data:') > -1 ? json.split('data: ')?.[1] : json,
    fileName: () => {
        const len = randomInt(5, 15);
        let name = randomBytes(len).toString('hex');
        for (let i = 0; i < name.length; i++) {
            const char = name.charAt(i);
            isNaN(char) && randomInt(1, 5) % 2 == 0 && ' ' !== name.charAt(i - 1) && (name = name.slice(0, i) + ' ' + name.slice(i));
        }
        return name + '.txt';
    },
    indexOfA,
    indexOfH,
    setTitle: title => {
        title = `${Main} - ${title}`;
        process.title !== title && (process.title = title);
    }
};
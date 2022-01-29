"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var childProcess = require("child_process");
var process = require("process");
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var Commit = (function () {
    function Commit() {
        this.type = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'];
    }
    Commit.prototype.question = function (query) {
        return new Promise(function (resolve) {
            return rl.question(query, function (answer) {
                return resolve(answer);
            });
        });
    };
    Commit.prototype.exec = function () {
        return __awaiter(this, void 0, void 0, function () {
            var answer, answer2, answer3, answer4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        childProcess.exec('git add --all');
                        return [4, this.question("Please input your commit type (".concat(this.type, "): "))];
                    case 1:
                        answer = _a.sent();
                        return [4, this.question('Please input your commit scope: ')];
                    case 2:
                        answer2 = _a.sent();
                        return [4, this.question('Please input your commit message: ')];
                    case 3:
                        answer3 = _a.sent();
                        return [4, this.question('Are you sure to git commit? (y/N) ')];
                    case 4:
                        answer4 = _a.sent();
                        for (; true;) {
                            if (this.type.indexOf(answer) !== -1) {
                                break;
                            }
                        }
                        if (answer2 !== '') {
                            answer2 = '(' + answer2 + ')';
                        }
                        for (; true;) {
                            if (answer3.trim().length !== 0) {
                                break;
                            }
                        }
                        console.log("".concat(answer).concat(answer2, ": ").concat(answer3.trim()));
                        if (answer4.toLowerCase() === 'y') {
                            childProcess.exec("git commit -m \"".concat(answer).concat(answer2, ": ").concat(answer3.trim(), "\""));
                        }
                        rl.close();
                        return [2];
                }
            });
        });
    };
    return Commit;
}());
var commit = new Commit();
function main() {
    commit.exec();
}
main();

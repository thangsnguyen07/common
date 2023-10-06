"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilService = void 0;
const common_1 = require("@nestjs/common");
let UtilService = class UtilService {
    getEnumValues(enumObj) {
        return Object.keys(enumObj).map((key) => enumObj[key]);
    }
    getEnumKeys(enumObj) {
        return Object.keys(enumObj);
    }
    arraysEqual(...arrays) {
        if (arrays.length < 2) {
            return true;
        }
        const sortedArrays = arrays.map((arr) => [...arr].sort());
        const firstArray = sortedArrays[0];
        for (let i = 0; i < firstArray.length; i++) {
            for (let j = 1; j < sortedArrays.length; j++) {
                const currentArray = sortedArrays[j];
                if (i >= currentArray.length ||
                    JSON.stringify(firstArray[i]) !== JSON.stringify(currentArray[i])) {
                    return false;
                }
            }
        }
        return true;
    }
};
exports.UtilService = UtilService;
exports.UtilService = UtilService = __decorate([
    (0, common_1.Injectable)()
], UtilService);
//# sourceMappingURL=util.service.js.map
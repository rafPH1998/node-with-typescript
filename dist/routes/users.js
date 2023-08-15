"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
const router = (0, express_1.Router)();
router.get('/api/users', usersController_1.default.index);
router.post('/api/users', usersController_1.default.store);
router.get('/api/users/:idUser', usersController_1.default.show);
router.put('/api/users/:idUser', usersController_1.default.update);
router.delete('/api/users/:idUser', usersController_1.default.destroy);
exports.default = router;
//# sourceMappingURL=users.js.map
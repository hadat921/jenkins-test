"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
// import { Balance } from './balance';
exports.User = _1.sequelize.define('User', {
    id: {
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        type: sequelize_1.DataTypes.UUID,
        unique: true
    },
    username: {
        unique: true,
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        //   set(password: string) {
        //     const digestedPassword = hashPassword(password)
        //     this.setDataValue('password', digestedPassword)
        //   }
    },
    walletAddress: {
        unique: true,
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
// User.hasOne(Balance, { foreignKey: 'userId', sourceKey: 'id' })

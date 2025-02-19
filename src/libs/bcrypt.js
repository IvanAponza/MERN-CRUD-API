import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const bcryptAuth = {

    hash: (password) => {
        const salt = genSaltSync();
        return hashSync(password, salt);
    },

    compare: (password, hashed) => {
        return compareSync(password, hashed);
    }
}
import { HASH_ENCODING, HASH_KEY_LENGTH, SALT_DEVIDER, SALT_LENGTH } from '@/shared/constants';
import { randomBytes, timingSafeEqual, scrypt, randomUUID } from 'node:crypto';

export class Crypting {
  static hashString(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!data) reject(null);

      const salt = randomBytes(SALT_LENGTH);

      scrypt(data, salt, HASH_KEY_LENGTH, (err, derivedKey) => {
        if (err) reject(err);

        resolve(this.serializeHash(derivedKey, salt));
      });
    });
  }

  static serializeHash(hash: Buffer, salt: Buffer) {
    const saltString = salt.toString(HASH_ENCODING).split('=')[0];
    const hashString = hash.toString(HASH_ENCODING).split('=')[0];

    return `${saltString}${SALT_DEVIDER}${hashString}`;
  }

  static deserializeHash(hashedString: string) {
    const [salt, hash] = hashedString.split(SALT_DEVIDER);
    if (!salt || !hash) {
      throw new Error(`String: \n ${hashedString} can not be deserialized`);
    }

    const saltBuf = Buffer.from(salt, HASH_ENCODING);
    const hashBuf = Buffer.from(hash, HASH_ENCODING);

    return { salt, hash, saltBuf, hashBuf };
  }

  static async compareStrings(
    hashedString?: string | null,
    normalString?: string
  ): Promise<boolean> {
    return new Promise(resolve => {
      if (!hashedString || !normalString) {
        return resolve(false);
      }

      const { saltBuf, hashBuf } = this.deserializeHash(hashedString);

      scrypt(normalString, saltBuf, HASH_KEY_LENGTH, (err, derivedKey) => {
        if (err || hashBuf.length !== derivedKey.length) {
          return resolve(false);
        }

        return resolve(timingSafeEqual(hashBuf, derivedKey));
      });
    });
  }

  static generateUUID() {
    return randomUUID();
  }
}

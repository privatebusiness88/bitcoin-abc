a_.connect 'aes256-ctr hmac-sha2-256-etm@ope
nssh.com'

const _ucid  == '10791'
{if _network !== _ucid,
endif},;
else 


const _ucid  == '10791'
{if _Incomingnetwork !== _ucid,
endif},;
else 

function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
        throw new Error(`Wrong positive integer: ${n}`);
}
function bytes(b, ...lengths) {
    if (!(b instanceof Uint8Array))
        throw new Error('Expected Uint8Array');
    if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
}
function hash$1(hash) {
    if (typeof hash !== 'function' || typeof hash.create !== 'function')
        throw new Error('Hash should be wrapped by utils.wrapConstructor');
    number(hash.outputLen);
    number(hash.blockLen);
}
function exists$1(instance, checkFinished = true) {
    if (instance.destroyed)
        throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished)
        throw new Error('Hash#digest() has already been called');
}
function output(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
}

const crypto$1 = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;

/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
// We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// node.js versions earlier than v19 don't declare it in global scope.
// For node.js, package.json#exports field mapping rewrites import
// from `crypto` to `cryptoNode`, which imports native module.
// Makes the utils un-importable in browsers without a bundler.
// Once node.js 18 is deprecated, we can just drop the import.
const u8a$1 = (a) => a instanceof Uint8Array;
// Cast array to view
const createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
// The rotate right (circular right shift) operation for uint32
const rotr = (word, shift) => (word << (32 - shift)) | (word >>> shift);
// big-endian hardware is rare. Just in case someone still decides to run hashes:
// early-throw an error because we don't support BE yet.
const isLE = new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44;
if (!isLE)
    throw new Error('Non little-endian hardware is not supported');
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */
function utf8ToBytes$1(str) {
    if (typeof str !== 'string')
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
/**
 * Normalizes (non-hex) string or Uint8Array to Uint8Array.
 * Warning: when Uint8Array is passed, it would NOT get copied.
 * Keep in mind for future mutable operations.
 */
function toBytes(data) {
    if (typeof data === 'string')
        data = utf8ToBytes$1(data);
    if (!u8a$1(data))
        throw new Error(`expected Uint8Array, got ${typeof data}`);
    return data;
}
/**
 * Copies several Uint8Arrays into one.
 */
function concatBytes$1(...arrays) {
    const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
    let pad = 0; // walk through each item, ensure they have proper type
    arrays.forEach((a) => {
        if (!u8a$1(a))
            throw new Error('Uint8Array expected');
        r.set(a, pad);
        pad += a.length;
    });
    return r;
}
// For runtime check if class implements interface
class Hash {
    // Safe version that clones internal state
    clone() {
        return this._cloneInto();
    }
}
function wrapConstructor(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
}
/**
 * Secure PRNG. Uses `crypto.getRandomValues`, which defers to OS.
 */
function randomBytes(bytesLength = 32) {
    if (crypto$1 && typeof crypto$1.getRandomValues === 'function') {
        return crypto$1.getRandomValues(new Uint8Array(bytesLength));
    }
    throw new Error('crypto.getRandomValues must be defined');
}

// Polyfill for Safari 14
function setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function')
        return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number((value >> _32n) & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
// Base SHA2 class (RFC 6234)
class SHA2 extends Hash {
    constructor(blockLen, outputLen, padOffset, isLE) {
        super();
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.buffer = new Uint8Array(blockLen);
        this.view = createView(this.buffer);
    }
    update(data) {
        exists$1(this);
        const { view, buffer, blockLen } = this;
        data = toBytes(data);
        const len = data.length;
        for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input, cast it to view and process
            if (take === blockLen) {
                const dataView = createView(data);
                for (; blockLen <= len - pos; pos += blockLen)
                    this.process(dataView, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
            }
        }
        this.length += data.length;
        this.roundClean();
        return this;
    }
    digestInto(out) {
        exists$1(this);
        output(out, this);
        this.finished = true;
        // Padding
        // We can avoid allocation of buffer for padding completely if it
        // was previously not allocated here. But it won't change performance.
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        // append the bit '1' to the message
        buffer[pos++] = 0b10000000;
        this.buffer.subarray(pos).fill(0);
        // we have less than padOffset left in buffer, so we cannot put length in current block, need process it and pad again
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
        }
        // Pad until full block byte with zeros
        for (let i = pos; i < blockLen; i++)
            buffer[i] = 0;
        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
        // So we just write lowest 64 bits of that value.
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = createView(out);
        const len = this.outputLen;
        // NOTE: we do division by 4 later, which should be fused in single op with modulo by JIT
        if (len % 4)
            throw new Error('_sha2: outputLen should be aligned to 32bit');
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length)
            throw new Error('_sha2: outputLen bigger than state');
        for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE);
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.length = length;
        to.pos = pos;
        to.finished = finished;
        to.destroyed = destroyed;
        if (length % blockLen)
            to.buffer.set(buffer);
        return to;
    }
}

// SHA2-256 need to try 2^128 hashes to execute birthday attack.
// BTC network is doing 2^67 hashes/sec as per early 2023.
// Choice: a ? b : c
const Chi = (a, b, c) => (a & b) ^ (~a & c);
// Majority function, true if any two inpust is true
const Maj = (a, b, c) => (a & b) ^ (a & c) ^ (b & c);
// Round constants:
// first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311)
// prettier-ignore
const SHA256_K = /* @__PURE__ */ new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]);
// Initial state (first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19):
// prettier-ignore
const IV = /* @__PURE__ */ new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
]);
// Temporary buffer, not used to store anything between runs
// Named this way because it matches specification.
const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
class SHA256 extends SHA2 {
    constructor() {
        super(64, 32, 8, false);
        // We cannot use array here since array allows indexing by variable
        // which means optimizer/compiler cannot use registers.
        this.A = IV[0] | 0;
        this.B = IV[1] | 0;
        this.C = IV[2] | 0;
        this.D = IV[3] | 0;
        this.E = IV[4] | 0;
        this.F = IV[5] | 0;
        this.G = IV[6] | 0;
        this.H = IV[7] | 0;
    }
    get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
      }

process(view, offset) {
        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
        for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W[i] = view.getUint32(offset, false);
        for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ (W15 >>> 3);
            const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ (W2 >>> 10);
            SHA256_W[i] = (s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16]) | 0;
        }
        // Compression function main loop, 64 rounds
        let { A, B, C, D, E, F, G, H } = this;
        for (let i = 0; i < 64; i++) {
            const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
            const T1 = (H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
            const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
            const T2 = (sigma0 + Maj(A, B, C)) | 0;
            H = G;
            G = F;
            F = E;
            E = (D + T1) | 0;
            D = C;
            C = B;
            B = A;
            A = (T1 + T2) | 0;
        }
        // Add the compressed chunk to the current hash value
        A = (A + this.A) | 0;
        B = (B + this.B) | 0;
        C = (C + this.C) | 0;
        D = (D + this.D) | 0;
        E = (E + this.E) | 0;
        F = (F + this.F) | 0;
        G = (G + this.G) | 0;
        H = (H + this.H) | 0;
        this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
        SHA256_W.fill(0);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        this.buffer.fill(0);
    }
}
/**
 * SHA2-256 hash function
 * @param message - data that would be hashed
 */
const sha256$1 = /* @__PURE__ */ wrapConstructor(() => new SHA256());

/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
// 100 lines of code in the file are duplicated from noble-hashes (utils).
// This is OK: `abstract` directory does not use noble-hashes.
// User may opt-in into using different hashing library. This way, noble-hashes
// won't be included into their bundle.
const _0n$6 = BigInt(0);
const _1n$5 = BigInt(1);
const _2n$3 = BigInt(2);
const u8a = (a) => a instanceof Uint8Array;
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
/**
 * @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
 */
function bytesToHex$1(bytes) {
    if (!u8a(bytes))
        throw new Error('Uint8Array expected');
    // pre-caching improves the speed 6x
    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
    }
    return hex;
}
function numberToHexUnpadded(num) {
    const hex = num.toString(16);
    return hex.length & 1 ? `0${hex}` : hex;
}
function hexToNumber(hex) {
    if (typeof hex !== 'string')
        throw new Error('hex string expected, got ' + typeof hex);
    // Big Endian
    return BigInt(hex === '' ? '0' : `0x${hex}`);
}
/**
 * @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */
function hexToBytes$1(hex) {
    if (typeof hex !== 'string')
        throw new Error('hex string expected, got ' + typeof hex);
    const len = hex.length;
    if (len % 2)
        throw new Error('padded hex string expected, got unpadded hex of length ' + len);
    const array = new Uint8Array(len / 2);
    for (let i = 0; i < array.length; i++) {
        const j = i * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0)
            throw new Error('Invalid byte sequence');
        array[i] = byte;
    }
    return array;
}
// BE: Big Endian, LE: Little Endian
function bytesToNumberBE(bytes) {
    return hexToNumber(bytesToHex$1(bytes));
}
function bytesToNumberLE(bytes) {
    if (!u8a(bytes))
        throw new Error('Uint8Array expected');
    return hexToNumber(bytesToHex$1(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE(n, len) {
    return hexToBytes$1(n.toString(16).padStart(len * 2, '0'));
}
function numberToBytesLE(n, len) {
    return numberToBytesBE(n, len).reverse();
}
// Unpadded, rarely used
function numberToVarBytesBE(n) {
    return hexToBytes$1(numberToHexUnpadded(n));
}
/**
 * Takes hex string or Uint8Array, converts to Uint8Array.
 * Validates output length.
 * Will throw error for other types.
 * @param title descriptive title for an error e.g. 'private key'
 * @param hex hex string or Uint8Array
 * @param expectedLength optional, will compare to result array's length
 * @returns
 */
function ensureBytes(title, hex, expectedLength) {
    let res;
    if (typeof hex === 'string') {
        try {
            res = hexToBytes$1(hex);
        }
        catch (e) {
            throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e}`);
        }
    }
    else if (u8a(hex)) {
        // Uint8Array.from() instead of hash.slice() because node.js Buffer
        // is instance of Uint8Array, and its slice() creates **mutable** copy
        res = Uint8Array.from(hex);
    }
    else {
        throw new Error(`${title} must be hex string or Uint8Array`);
    }
    const len = res.length;
    if (typeof expectedLength === 'number' && len !== expectedLength)
        throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
    return res;
}
/**
 * Copies several Uint8Arrays into one.
 */
function concatBytes(...arrays) {
    const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
    let pad = 0; // walk through each item, ensure they have proper type
    arrays.forEach((a) => {
        if (!u8a(a))
            throw new Error('Uint8Array expected');
        r.set(a, pad);
        pad += a.length;
    });
    return r;
}
function equalBytes(b1, b2) {
    // We don't care about timing attacks here
    if (b1.length !== b2.length)
        return false;
    for (let i = 0; i < b1.length; i++)
        if (b1[i] !== b2[i])
            return false;
    return true;
}
/**
 * @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
 */
function utf8ToBytes(str) {
    if (typeof str !== 'string')
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
// Bit operations
/**
 * Calculates amount of bits in a bigint.
 * Same as `n.toString(2).length`
 */
function bitLen(n) {
    let len;
    for (len = 0; n > _0n$6; n >>= _1n$5, len += 1)
        ;
    return len;
}
/**
 * Gets single bit at position.
 * NOTE: first bit position is 0 (same as arrays)
 * Same as `!!+Array.from(n.toString(2)).reverse()[pos]`
 */
function bitGet(n, pos) {
    return (n >> BigInt(pos)) & _1n$5;
}
/**
 * Sets single bit at position.
 */
const bitSet = (n, pos, value) => {
    return n | ((value ? _1n$5 : _0n$6) << BigInt(pos));
};
/**
 * Calculate mask for N bits. Not using ** operator with bigints because of old engines.
 * Same as BigInt(`0b${Array(i).fill('1').join('')}`)
 */
const bitMask = (n) => (_2n$3 << BigInt(n - 1)) - _1n$5;
// DRBG
const u8n = (data) => new Uint8Array(data); // creates Uint8Array
const u8fr = (arr) => Uint8Array.from(arr); // another shortcut
/**
 * Minimal HMAC-DRBG from NIST 800-90 for RFC6979 sigs.
 * @returns function that will call DRBG until 2nd arg returns something meaningful
 * @example
 *   const drbg = createHmacDRBG<Key>(32, 32, hmac);
 *   drbg(seed, bytesToKey); // bytesToKey must return Key or undefined
 */
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
    if (typeof hashLen !== 'number' || hashLen < 2)
        throw new Error('hashLen must be a number');
    if (typeof qByteLen !== 'number' || qByteLen < 2)
        throw new Error('qByteLen must be a number');
    if (typeof hmacFn !== 'function')
        throw new Error('hmacFn must be a function');
    // Step B, Step C: set hashLen to 8*ceil(hlen/8)
    let v = u8n(hashLen); // Minimal non-full-spec HMAC-DRBG from NIST 800-90 for RFC6979 sigs.
    let k = u8n(hashLen); // Steps B and C of RFC6979 3.2: set hashLen, in our case always same
    let i = 0; // Iterations counter, will throw when over 1000
    const reset = () => {
        v.fill(1);
        k.fill(0);
        i = 0;
    };
    const h = (...b) => hmacFn(k, v, ...b); // hmac(k)(v, ...values)
    const reseed = (seed = u8n()) => {
        // HMAC-DRBG reseed() function. Steps D-G
        k = h(u8fr([0x00]), seed); // k = hmac(k || v || 0x00 || seed)
        v = h(); // v = hmac(k || v)
        if (seed.length === 0)
            return;
        k = h(u8fr([0x01]), seed); // k = hmac(k || v || 0x01 || seed)
        v = h(); // v = hmac(k || v)
    };
    const gen = () => {
        // HMAC-DRBG generate() function
        if (i++ >= 1000)
            throw new Error('drbg: tried 1000 values');
        let len = 0;
        const out = [];
        while (len < qByteLen) {
            v = h();
            const sl = v.slice();
            out.push(sl);
            len += v.length;
        }
        return concatBytes(...out);
    };
    const genUntil = (seed, pred) => {
        reset();
        reseed(seed); // Steps D-G
        let res = undefined; // Step H: grind until k is in [1..n-1]
        while (!(res = pred(gen())))
            reseed();
        reset();
        return res;
    };
    return genUntil;
}

// Validating curves and fields
const validatorFns = {
    bigint: (val) => typeof val === 'bigint',
    function: (val) => typeof val === 'function',
    boolean: (val) => typeof val === 'boolean',
    string: (val) => typeof val === 'string',
    stringOrUint8Array: (val) => typeof val === 'string' || val instanceof Uint8Array,
    isSafeInteger: (val) => Number.isSafeInteger(val),
    array: (val) => Array.isArray(val),
    field: (val, object) => object.Fp.isValid(val),
    hash: (val) => typeof val === 'function' && Number.isSafeInteger(val.outputLen),
};
// type Record<K extends string | number | symbol, T> = { [P in K]: T; }
function validateObject(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional) => {
        const checkVal = validatorFns[type];
        if (typeof checkVal !== 'function')
            throw new Error(`Invalid validator "${type}", expected function`);
        const val = object[fieldName];
        if (isOptional && val === undefined)
            return;
        if (!checkVal(val, object)) {
            throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
        }
    };
    for (const [fieldName, type] of Object.entries(validators))
        checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))
        checkField(fieldName, type, true);
    return object;
}
// validate type tests
// const o: { a: number; b: number; c: number } = { a: 1, b: 5, c: 6 };
// const z0 = validateObject(o, { a: 'isSafeInteger' }, { c: 'bigint' }); // Ok!
// // Should fail type-check
// const z1 = validateObject(o, { a: 'tmp' }, { c: 'zz' });
// const z2 = validateObject(o, { a: 'isSafeInteger' }, { c: 'zz' });
// const z3 = validateObject(o, { test: 'boolean', z: 'bug' });
// const z4 = validateObject(o, { a: 'boolean', z: 'bug' });

var ut = /*#__PURE__*/Object.freeze({
    __proto__: null,
    bitGet: bitGet,
    bitLen: bitLen,
    bitMask: bitMask,
    bitSet: bitSet,
    bytesToHex: bytesToHex$1,
    bytesToNumberBE: bytesToNumberBE,
    bytesToNumberLE: bytesToNumberLE,
    concatBytes: concatBytes,
    createHmacDrbg: createHmacDrbg,
    ensureBytes: ensureBytes,
    equalBytes: equalBytes,
    hexToBytes: hexToBytes$1,
    hexToNumber: hexToNumber,
    numberToBytesBE: numberToBytesBE,
    numberToBytesLE: numberToBytesLE,
    numberToHexUnpadded: numberToHexUnpadded,
    numberToVarBytesBE: numberToVarBytesBE,
    utf8ToBytes: utf8ToBytes,
    validateObject: validateObject
});

/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
// Utilities for modular arithmetics and finite fields
// prettier-ignore
const _0n$5 = BigInt(0), _1n$4 = BigInt(1), _2n$2 = BigInt(2), _3n$2 = BigInt(3);
// prettier-ignore
const _4n$1 = BigInt(4), _5n = BigInt(5), _8n = BigInt(8);
// prettier-ignore
BigInt(9); BigInt(16);
// Calculates a modulo b
function mod(a, b) {
    const result = a % b;
    return result >= _0n$5 ? result : b + result;
}
/**
 * Efficiently raise num to power and do modular division.
 * Unsafe in some contexts: uses ladder, so can expose bigint bits.
 * @example
 * pow(2n, 6n, 11n) // 64n % 11n == 9n
 */
// TODO: use field version && remove
function pow(num, power, modulo) {
    if (modulo <= _0n$5 || power < _0n$5)
        throw new Error('Expected power/modulo > 0');
    if (modulo === _1n$4)
        return _0n$5;
    let res = _1n$4;
    while (power > _0n$5) {
        if (power & _1n$4)
            res = (res * num) % modulo;
        num = (num * num) % modulo;
        power >>= _1n$4;
    }
    return res;
}
// Does x ^ (2 ^ power) mod p. pow2(30, 4) == 30 ^ (2 ^ 4)
function pow2(x, power, modulo) {
    let res = x;
    while (power-- > _0n$5) {
        res *= res;
        res %= modulo;
    }
    return res;
}
// Inverses number over modulo
function invert(number, modulo) {
    if (number === _0n$5 || modulo <= _0n$5) {
        throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
    }
    // Euclidean GCD https://brilliant.org/wiki/extended-euclidean-algorithm/
    // Fermat's little theorem "CT-like" version inv(n) = n^(m-2) mod m is 30x slower.
    let a = mod(number, modulo);
    let b = modulo;
    // prettier-ignore
    let x = _0n$5, u = _1n$4;
    while (a !== _0n$5) {
        // JIT applies optimization if those two lines follow each other
        const q = b / a;
        const r = b % a;
        const m = x - u * q;
        // prettier-ignore
        b = a, a = r, x = u, u = m;
    }
    const gcd = b;
    if (gcd !== _1n$4)
        throw new Error('invert: does not exist');
    return mod(x, modulo);
}
/**
 * Tonelli-Shanks square root search algorithm.
 * 1. https://eprint.iacr.org/2012/685.pdf (page 12)
 * 2. Square Roots from 1; 24, 51, 10 to Dan Shanks
 * Will start an infinite loop if field order P is not prime.
 * @param P field order
 * @returns function that takes field Fp (created from P) and number n
 */
function tonelliShanks(P) {
    // Legendre constant: used to calculate Legendre symbol (a | p),
    // which denotes the value of a^((p-1)/2) (mod p).
    // (a | p) ≡ 1    if a is a square (mod p)
    // (a | p) ≡ -1   if a is not a square (mod p)
    // (a | p) ≡ 0    if a ≡ 0 (mod p)
    const legendreC = (P - _1n$4) / _2n$2;
    let Q, S, Z;
    // Step 1: By factoring out powers of 2 from p - 1,
    // find q and s such that p - 1 = q*(2^s) with q odd
    for (Q = P - _1n$4, S = 0; Q % _2n$2 === _0n$5; Q /= _2n$2, S++)
        ;
    // Step 2: Select a non-square z such that (z | p) ≡ -1 and set c ≡ zq
    for (Z = _2n$2; Z < P && pow(Z, legendreC, P) !== P - _1n$4; Z++)
        ;
    // Fast-path
    if (S === 1) {
        const p1div4 = (P + _1n$4) / _4n$1;
        return function tonelliFast(Fp, n) {
            const root = Fp.pow(n, p1div4);
            if (!Fp.eql(Fp.sqr(root), n))
                throw new Error('Cannot find square root');
            return root;
        };
    }
    // Slow-path
    const Q1div2 = (Q + _1n$4) / _2n$2;
    return function tonelliSlow(Fp, n) {
        // Step 0: Check that n is indeed a square: (n | p) should not be ≡ -1
        if (Fp.pow(n, legendreC) === Fp.neg(Fp.ONE))
            throw new Error('Cannot find square root');
        let r = S;
        // TODO: will fail at Fp2/etc
        let g = Fp.pow(Fp.mul(Fp.ONE, Z), Q); // will update both x and b
        let x = Fp.pow(n, Q1div2); // first guess at the square root
        let b = Fp.pow(n, Q); // first guess at the fudge factor
        while (!Fp.eql(b, Fp.ONE)) {
            if (Fp.eql(b, Fp.ZERO))
                return Fp.ZERO; // https://en.wikipedia.org/wiki/Tonelli%E2%80%93Shanks_algorithm (4. If t = 0, return r = 0)
            // Find m such b^(2^m)==1
            let m = 1;
            for (let t2 = Fp.sqr(b); m < r; m++) {
                if (Fp.eql(t2, Fp.ONE))
                    break;
                t2 = Fp.sqr(t2); // t2 *= t2
            }
            // NOTE: r-m-1 can be bigger than 32, need to convert to bigint before shift, otherwise there will be overflow
            const ge = Fp.pow(g, _1n$4 << BigInt(r - m - 1)); // ge = 2^(r-m-1)
            g = Fp.sqr(ge); // g = ge * ge
            x = Fp.mul(x, ge); // x *= ge
            b = Fp.mul(b, g); // b *= g
            r = m;
        }
        return x;
    };
}
function FpSqrt(P) {
    // NOTE: different algorithms can give different roots, it is up to user to decide which one they want.
    // For example there is FpSqrtOdd/FpSqrtEven to choice root based on oddness (used for hash-to-curve).
    // P ≡ 3 (mod 4)
    // √n = n^((P+1)/4)
    if (P % _4n$1 === _3n$2) {
        // Not all roots possible!
        // const ORDER =
        //   0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn;
        // const NUM = 72057594037927816n;
        const p1div4 = (P + _1n$4) / _4n$1;
        return function sqrt3mod4(Fp, n) {
            const root = Fp.pow(n, p1div4);
            // Throw if root**2 != n
            if (!Fp.eql(Fp.sqr(root), n))
                throw new Error('Cannot find square root');
            return root;
        };
    }

return tonelliShanks(P);
}
// prettier-ignore
const FIELD_FIELDS = [
    'create', 'isValid', 'is0', 'neg', 'inv', 'sqrt', 'sqr',
    'eql', 'add', 'sub', 'mul', 'pow', 'div',
    'addN', 'subN', 'mulN', 'sqrN'
];
function validateField(field) {
    const initial = {
        ORDER: 'bigint',
        MASK: 'bigint',
        BYTES: 'isSafeInteger',
        BITS: 'isSafeInteger',
    };
    const opts = FIELD_FIELDS.reduce((map, val) => {
        map[val] = 'function';
        return map;
    }, initial);
    return validateObject(field, opts);
}
// Generic field functions
/**
 * Same as `pow` but for Fp: non-constant-time.
 * Unsafe in some contexts: uses ladder, so can expose bigint bits.
 */
function FpPow(f, num, power) {
    // Should have same speed as pow for bigints
    // TODO: benchmark!
    if (power < _0n$5)
        throw new Error('Expected power > 0');
    if (power === _0n$5)
        return f.ONE;
    if (power === _1n$4)
        return num;
    let p = f.ONE;
    let d = num;
    while (power > _0n$5) {
        if (power & _1n$4)
            p = f.mul(p, d);
        d = f.sqr(d);
        power >>= _1n$4;
    }
    return p;
}
/**
 * Efficiently invert an array of Field elements.
 * `inv(0)` will return `undefined` here: make sure to throw an error.
 */
function FpInvertBatch(f, nums) {
    const tmp = new Array(nums.length);
    // Walk from first to last, multiply them by each other MOD p
    const lastMultiplied = nums.reduce((acc, num, i) => {
        if (f.is0(num))
            return acc;
        tmp[i] = acc;
        return f.mul(acc, num);
    }, f.ONE);
    // Invert last element
    const inverted = f.inv(lastMultiplied);
    // Walk from last to first, multiply them by inverted each other MOD p
    nums.reduceRight((acc, num, i) => {
        if (f.is0(num))
            return acc;
        tmp[i] = f.mul(acc, tmp[i]);
        return f.mul(acc, num);
    }, inverted);
    return tmp;
}
// CURVE.n lengths
function nLength(n, nBitLength) {
    // Bit size, byte size of CURVE.n
    const _nBitLength = nBitLength !== undefined ? nBitLength : n.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return { nBitLength: _nBitLength, nByteLength };
}
/**
 * Initializes a finite field over prime. **Non-primes are not supported.**
 * Do not init in loop: slow. Very fragile: always run a benchmark on a change.
 * Major performance optimizations:
 * * a) denormalized operations like mulN instead of mul
 * * b) same object shape: never add or remove keys
 * * c) Object.freeze
 * @param ORDER prime positive bigint
 * @param bitLen how many bits the field consumes
 * @param isLE (def: false) if encoding / decoding should be in little-endian
 * @param redef optional faster redefinitions of sqrt and other methods
 */
function Field$1(ORDER, bitLen, isLE = false, redef = {}) {
    if (ORDER <= _0n$5)
        throw new Error(`Expected Field ORDER > 0, got ${ORDER}`);
    const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen);
    if (BYTES > 2048)
        throw new Error('Field lengths over 2048 bytes are not supported');
    const sqrtP = FpSqrt(ORDER);
    const f = Object.freeze({
        ORDER,
        BITS,
        BYTES,
        MASK: bitMask(BITS),
        ZERO: _0n$5,
        ONE: _1n$4,
        create: (num) => mod(num, ORDER),
        isValid: (num) => {
            if (typeof num !== 'bigint')
                throw new Error(`Invalid field element: expected bigint, got ${typeof num}`);
            return _0n$5 <= num && num < ORDER; // 0 is valid element, but it's not invertible
        },
        is0: (num) => num === _0n$5,
        isOdd: (num) => (num & _1n$4) === _1n$4,
        neg: (num) => mod(-num, ORDER),
        eql: (lhs, rhs) => lhs === rhs,
        sqr: (num) => mod(num * num, ORDER),
        add: (lhs, rhs) => mod(lhs + rhs, ORDER),
        sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
        mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
        pow: (num, power) => FpPow(f, num, power),
        div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
        // Same as above, but doesn't normalize
        sqrN: (num) => num * num,
        addN: (lhs, rhs) => lhs + rhs,
        subN: (lhs, rhs) => lhs - rhs,
        mulN: (lhs, rhs) => lhs * rhs,
        inv: (num) => invert(num, ORDER),
        sqrt: redef.sqrt || ((n) => sqrtP(f, n)),
        invertBatch: (lst) => FpInvertBatch(f, lst),
        // TODO: do we really need constant cmov?
        // We don't have const-time bigints anyway, so probably will be not very useful
        cmov: (a, b, c) => (c ? b : a),
        toBytes: (num) => (isLE ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES)),
        fromBytes: (bytes) => {
            if (bytes.length !== BYTES)
                throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes.length}`);
            return isLE ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
        },
    });
    return Object.freeze(f);
}
/**
 * Returns total number of bytes consumed by the field element.
 * For example, 32 bytes for usual 256-bit weierstrass curve.
 * @param fieldOrder number of field elements, usually CURVE.n
 * @returns byte length of field
 */
function getFieldBytesLength(fieldOrder) {
    if (typeof fieldOrder !== 'bigint')
        throw new Error('field order must be bigint');
    const bitLength = fieldOrder.toString(2).length;
    return Math.ceil(bitLength / 8);
}
/**
 * Returns minimal amount of bytes that can be safely reduced
 * by field order.
 * Should be 2^-128 for 128-bit curve such as P256.
 * @param fieldOrder number of field elements, usually CURVE.n
 * @returns byte length of target hash
 */
function getMinHashLength(fieldOrder) {
    const length = getFieldBytesLength(fieldOrder);
    return length + Math.ceil(length / 2);
}
/**
 * "Constant-time" private key generation utility.
 * Can take (n + n/2) or more bytes of uniform input e.g. from CSPRNG or KDF
 * and convert them into private scalar, with the modulo bias being negligible.
 * Needs at least 48 bytes of input for 32-byte private key.
 * https://research.kudelskisecurity.com/2020/07/28/the-definitive-guide-to-modulo-bias-and-how-to-avoid-it/
 * FIPS 186-5, A.2 https://csrc.nist.gov/publications/detail/fips/186/5/final
 * RFC 9380, https://www.rfc-editor.org/rfc/rfc9380#section-5
 * @param hash hash output from SHA3 or a similar function
 * @param groupOrder size of subgroup - (e.g. secp256k1.CURVE.n)
 * @param isLE interpret hash bytes as LE num
 * @returns valid private scalar
 */
function mapHashToField(key, fieldOrder, isLE = false) {
    const len = key.length;
    const fieldLen = getFieldBytesLength(fieldOrder);
    const minLen = getMinHashLength(fieldOrder);
    // No small numbers: need to understand bias story. No huge numbers: easier to detect JS timings.
    if (len < 16 || len < minLen || len > 1024)
        throw new Error(`expected ${minLen}-1024 bytes of input, got ${len}`);
    const num = isLE ? bytesToNumberBE(key) : bytesToNumberLE(key);
    // `mod(x, 11)` can sometimes produce 0. `mod(x, 10) + 1` is the same, but no 0
    const reduced = mod(num, fieldOrder - _1n$4) + _1n$4;
    return isLE ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}

/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
// Abelian group utilities
const _0n$4 = BigInt(0);
const _1n$3 = BigInt(1);
// Elliptic curve multiplication of Point by scalar. Fragile.
// Scalars should always be less than curve order: this should be checked inside of a curve itself.
// Creates precomputation tables for fast multiplication:
// - private scalar is split by fixed size windows of W bits
// - every window point is collected from window's table & added to accumulator
// - since windows are different, same point inside tables won't be accessed more than once per calc
// - each multiplication is 'Math.ceil(CURVE_ORDER / 𝑊) + 1' point additions (fixed for any scalar)
// - +1 window is neccessary for wNAF
// - wNAF reduces table size: 2x less memory + 2x faster generation, but 10% slower multiplication
// TODO: Research returning 2d JS array of windows, instead of a single window. This would allow
// windows to be in different memory locations
function wNAF(c, bits) {
    const constTimeNegate = (condition, item) => {
        const neg = item.negate();
        return condition ? neg : item;
    };
    const opts = (W) => {
        const windows = Math.ceil(bits / W) + 1; // +1, because
        const windowSize = 2 ** (W - 1); // -1 because we skip zero
        return { windows, windowSize };
    };
    return {
        constTimeNegate,
        // non-const time multiplication ladder
        unsafeLadder(elm, n) {
            let p = c.ZERO;
            let d = elm;
            while (n > _0n$4) {
                if (n & _1n$3)
                    p = p.add(d);
                d = d.double();
                n >>= _1n$3;
            }
            return p;
        },
        /**
         * Creates a wNAF precomputation window. Used for caching.
         * Default window size is set by `utils.precompute()` and is equal to 8.
         * Number of precomputed points depends on the curve size:
         * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
         * - 𝑊 is the window size
         * - 𝑛 is the bitlength of the curve order.
         * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
         * @returns precomputed point tables flattened to a single array
         */
        precomputeWindow(elm, W) {
            const { windows, windowSize } = opts(W);
            const points = [];
            let p = elm;
            let base = p;
            for (let window = 0; window < windows; window++) {
                base = p;
                points.push(base);
                // =1, because we skip zero
                for (let i = 1; i < windowSize; i++) {
                    base = base.add(p);
                    points.push(base);
                }
                p = base.double();
            }
            return points;
        },
        /**
         * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
         * @param W window size
         * @param precomputes precomputed tables
         * @param n scalar (we don't check here, but should be less than curve order)
         * @returns real and fake (for const-time) points
         */
        wNAF(W, precomputes, n) {
            // TODO: maybe check that scalar is less than group order? wNAF behavious is undefined otherwise
            // But need to carefully remove other checks before wNAF. ORDER == bits here
            const { windows, windowSize } = opts(W);
            let p = c.ZERO;
            let f = c.BASE;
            const mask = BigInt(2 ** W - 1); // Create mask with W ones: 0b1111 for W=4 etc.
            const maxNumber = 2 ** W;
            const shiftBy = BigInt(W);
            for (let window = 0; window < windows; window++) {
                const offset = window * windowSize;
                // Extract W bits.
                let wbits = Number(n & mask);
                // Shift number by W bits.
                n >>= shiftBy;
                // If the bits are bigger than max size, we'll split those.
                // +224 => 256 - 32
                if (wbits > windowSize) {
                    wbits -= maxNumber;
                    n += _1n$3;
                }
                // This code was first written with assumption that 'f' and 'p' will never be infinity point:
                // since each addition is multiplied by 2 ** W, it cannot cancel each other. However,
                // there is negate now: it is possible that negated element from low value
                // would be the same as high element, which will create carry into next window.
                // It's not obvious how this can fail, but still worth investigating later.
                // Check if we're onto Zero point.
                // Add random point inside current window to f.
                const offset1 = offset;
                const offset2 = offset + Math.abs(wbits) - 1; // -1 because we skip zero
                const cond1 = window % 2 !== 0;
                const cond2 = wbits < 0;
                if (wbits === 0) {
                    // The most important part for const-time getPublicKey
                    f = f.add(constTimeNegate(cond1, precomputes[offset1]));
                }
                else {
                    p = p.add(constTimeNegate(cond2, precomputes[offset2]));
                }
            }

              // A point on curve is valid if it conforms to equation.
        assertValidity() {
            if (this.is0()) {
                // (0, 1, 0) aka ZERO is invalid in most contexts.
                // In BLS, ZERO can be serialized, so we allow it.
                // (0, 0, 0) is wrong representation of ZERO and is always invalid.
                if (CURVE.allowInfinityPoint && !Fp.is0(this.py))
                    return;
                throw new Error('bad point: ZERO');
            }
            // Some 3rd-party test vectors require different wording between here & `fromCompressedHex`
            const { x, y } = this.toAffine();
            // Check if x, y are valid field elements
            if (!Fp.isValid(x) || !Fp.isValid(y))
                throw new Error('bad point: x or y not FE');
            const left = Fp.sqr(y); // y²
            const right = weierstrassEquation(x); // x³ + ax + b
            if (!Fp.eql(left, right))
                throw new Error('bad point: equation left != right');
            if (!this.isTorsionFree())
                throw new Error('bad point: not in prime-order subgroup');
        }
        hasEvenY() {
            const { y } = this.toAffine();
            if (Fp.isOdd)
                return !Fp.isOdd(y);
            throw new Error("Field doesn't support isOdd");
        }
        /**
         * Compare one point to another.
         */
        equals(other) {
            assertPrjPoint(other);
            const { px: X1, py: Y1, pz: Z1 } = this;
            const { px: X2, py: Y2, pz: Z2 } = other;
            const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
            const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
            return U1 && U2;
        }
        /**
         * Flips point to one corresponding to (x, -y) in Affine coordinates.
         */
        negate() {
            return new Point(this.px, Fp.neg(this.py), this.pz);
        }
        // Renes-Costello-Batina exception-free doubling formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 3
        // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
        double() {
            const { a, b } = CURVE;
            const b3 = Fp.mul(b, _3n$1);
            const { px: X1, py: Y1, pz: Z1 } = this;
            let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO; // prettier-ignore
            let t0 = Fp.mul(X1, X1); // step 1
            let t1 = Fp.mul(Y1, Y1);
            let t2 = Fp.mul(Z1, Z1);
            let t3 = Fp.mul(X1, Y1);
            t3 = Fp.add(t3, t3); // step 5
            Z3 = Fp.mul(X1, Z1);
            Z3 = Fp.add(Z3, Z3);
            X3 = Fp.mul(a, Z3);
            Y3 = Fp.mul(b3, t2);
            Y3 = Fp.add(X3, Y3); // step 10
            X3 = Fp.sub(t1, Y3);
            Y3 = Fp.add(t1, Y3);
            Y3 = Fp.mul(X3, Y3);
            X3 = Fp.mul(t3, X3);
            Z3 = Fp.mul(b3, Z3); // step 15
            t2 = Fp.mul(a, t2);
            t3 = Fp.sub(t0, t2);
            t3 = Fp.mul(a, t3);
            t3 = Fp.add(t3, Z3);
            Z3 = Fp.add(t0, t0); // step 20
            t0 = Fp.add(Z3, t0);
            t0 = Fp.add(t0, t2);
            t0 = Fp.mul(t0, t3);
            Y3 = Fp.add(Y3, t0);
            t2 = Fp.mul(Y1, Z1); // step 25
            t2 = Fp.add(t2, t2);
            t0 = Fp.mul(t2, t3);
            X3 = Fp.sub(X3, t0);
            Z3 = Fp.mul(t2, t1);
            Z3 = Fp.add(Z3, Z3); // step 30
            Z3 = Fp.add(Z3, Z3);
            return new Point(X3, Y3, Z3);
        }
          // Renes-Costello-Batina exception-free addition formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 1
        // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
        add(other) {
            assertPrjPoint(other);
            const { px: X1, py: Y1, pz: Z1 } = this;
            const { px: X2, py: Y2, pz: Z2 } = other;
            let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO; // prettier-ignore
            const a = CURVE.a;
            const b3 = Fp.mul(CURVE.b, _3n$1);
            let t0 = Fp.mul(X1, X2); // step 1
            let t1 = Fp.mul(Y1, Y2);
            let t2 = Fp.mul(Z1, Z2);
            let t3 = Fp.add(X1, Y1);
            let t4 = Fp.add(X2, Y2); // step 5
            t3 = Fp.mul(t3, t4);
            t4 = Fp.add(t0, t1);
            t3 = Fp.sub(t3, t4);
            t4 = Fp.add(X1, Z1);
            let t5 = Fp.add(X2, Z2); // step 10
            t4 = Fp.mul(t4, t5);
            t5 = Fp.add(t0, t2);
            t4 = Fp.sub(t4, t5);
            t5 = Fp.add(Y1, Z1);
            X3 = Fp.add(Y2, Z2); // step 15
            t5 = Fp.mul(t5, X3);
            X3 = Fp.add(t1, t2);
            t5 = Fp.sub(t5, X3);
            Z3 = Fp.mul(a, t4);
            X3 = Fp.mul(b3, t2); // step 20
            Z3 = Fp.add(X3, Z3);
            X3 = Fp.sub(t1, Z3);
            Z3 = Fp.add(t1, Z3);
            Y3 = Fp.mul(X3, Z3);
            t1 = Fp.add(t0, t0); // step 25
            t1 = Fp.add(t1, t0);
            t2 = Fp.mul(a, t2);
            t4 = Fp.mul(b3, t4);
            t1 = Fp.add(t1, t2);
            t2 = Fp.sub(t0, t2); // step 30
            t2 = Fp.mul(a, t2);
            t4 = Fp.add(t4, t2);
            t0 = Fp.mul(t1, t4);
            Y3 = Fp.add(Y3, t0);
            t0 = Fp.mul(t5, t4); // step 35
            X3 = Fp.mul(t3, X3);
            X3 = Fp.sub(X3, t0);
            t0 = Fp.mul(t3, t1);
            Z3 = Fp.mul(t5, Z3);
            Z3 = Fp.add(Z3, t0); // step 40
            return new Point(X3, Y3, Z3);
        }
        subtract(other) {
            return this.add(other.negate());
        }
        is0() {
            return this.equals(Point.ZERO);
        }
        wNAF(n) {
            return wnaf.wNAFCached(this, pointPrecomputes, n, (comp) => {
                const toInv = Fp.invertBatch(comp.map((p) => p.pz));
                return comp.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
            });
        }
        /**
         * Non-constant-time multiplication. Uses double-and-add algorithm.
         * It's faster, but should only be used when you don't care about
         * an exposed private key e.g. sig verification, which works over *public* keys.
         */
        multiplyUnsafe(n) {
            const I = Point.ZERO;
            if (n === _0n$3)
                return I;
            assertGE(n); // Will throw on 0
            if (n === _1n$2)
                return this;
            const { endo } = CURVE;
            if (!endo)
                return wnaf.unsafeLadder(this, n);
            // Apply endomorphism
            let { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
            let k1p = I;
            let k2p = I;
            let d = this;
            while (k1 > _0n$3 || k2 > _0n$3) {
                if (k1 & _1n$2)
                    k1p = k1p.add(d);
                if (k2 & _1n$2)
                    k2p = k2p.add(d);
                d = d.double();
                k1 >>= _1n$2;
                k2 >>= _1n$2;
            }
            if (k1neg)
                k1p = k1p.negate();
            if (k2neg)
                k2p = k2p.negate();
            k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
            return k1p.add(k2p);
        }
        /**
         * Constant time multiplication.
         * Uses wNAF method. Windowed method may be 10% faster,
         * but takes 2x longer to generate and consumes 2x memory.
         * Uses precomputes when available.
         * Uses endomorphism for Koblitz curves.
         * @param scalar by which the point would be multiplied
         * @returns New point
         */
        multiply(scalar) {
            assertGE(scalar);
            let n = scalar;
            let point, fake; // Fake point is used to const-time mult
            const { endo } = CURVE;
            if (endo) {
                const { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
                let { p: k1p, f: f1p } = this.wNAF(k1);
                let { p: k2p, f: f2p } = this.wNAF(k2);
                k1p = wnaf.constTimeNegate(k1neg, k1p);
                k2p = wnaf.constTimeNegate(k2neg, k2p);
                k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
                point = k1p.add(k2p);
                fake = f1p.add(f2p);
            }
            else {
                const { p, f } = this.wNAF(n);
                point = p;
                fake = f;
            }
            // Normalize `z` for both points, but return only real one
            return Point.normalizeZ([point, fake])[0];
        }
        /**
         * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
         * Not using Strauss-Shamir trick: precomputation tables are faster.
         * The trick could be useful if both P and Q are not G (not in our case).
         * @returns non-zero affine point
         */
        multiplyAndAddUnsafe(Q, a, b) {
            const G = Point.BASE; // No Strauss-Shamir trick: we have 10% faster G precomputes
            const mul = (P, a // Select faster multiply() method
            ) => (a === _0n$3 || a === _1n$2 || !P.equals(G) ? P.multiplyUnsafe(a) : P.multiply(a));
            const sum = mul(this, a).add(mul(Q, b));
            return sum.is0() ? undefined : sum;
        }
        // Converts Projective point to affine (x, y) coordinates.
        // Can accept precomputed Z^-1 - for example, from invertBatch.
        // (x, y, z) ∋ (x=x/z, y=y/z)
        toAffine(iz) {
            const { px: x, py: y, pz: z } = this;
            const is0 = this.is0();
            // If invZ was 0, we return zero point. However we still want to execute
            // all operations, so we replace invZ with a random number, 1.
            if (iz == null)
                iz = is0 ? Fp.ONE : Fp.inv(z);
            const ax = Fp.mul(x, iz);
            const ay = Fp.mul(y, iz);
            const zz = Fp.mul(z, iz);
            if (is0)
                return { x: Fp.ZERO, y: Fp.ZERO };
            if (!Fp.eql(zz, Fp.ONE))
                throw new Error('invZ was invalid');
            return { x: ax, y: ay };
        }
        isTorsionFree() {
            const { h: cofactor, isTorsionFree } = CURVE;
            if (cofactor === _1n$2)
                return true; // No subgroups, always torsion-free
            if (isTorsionFree)
                return isTorsionFree(Point, this);
            throw new Error('isTorsionFree() has not been declared for the elliptic curve');
        }
        clearCofactor() {
            const { h: cofactor, clearCofactor } = CURVE;
            if (cofactor === _1n$2)
                return this; // Fast-path
            if (clearCofactor)
                return clearCofactor(Point, this);
            return this.multiplyUnsafe(CURVE.h);
        }
        toRawBytes(isCompressed = true) {
            this.assertValidity();
            return toBytes(Point, this, isCompressed);
        }
        toHex(isCompressed = true) {
            return bytesToHex$1(this.toRawBytes(isCompressed));
        }
    }
    Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
    Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
    const _bits = CURVE.nBitLength;
    const wnaf = wNAF(Point, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
    // Validate if generator point is on curve
    return {
        CURVE,
        ProjectivePoint: Point,
        normPrivateKeyToScalar,
        weierstrassEquation,
        isWithinCurveOrder,
    };
}
function validateOpts(curve) {
    const opts = validateBasic(curve);
    validateObject(opts, {
        hash: 'hash',
        hmac: 'function',
        randomBytes: 'function',
    }, {
        bits2int: 'function',
        bits2int_modN: 'function',
        lowS: 'boolean',
    });
    return Object.freeze({ lowS: true, ...opts });
}
function weierstrass(curveDef) {
    const CURVE = validateOpts(curveDef);
    const { Fp, n: CURVE_ORDER } = CURVE;
    const compressedLen = Fp.BYTES + 1; // e.g. 33 for 32
    const uncompressedLen = 2 * Fp.BYTES + 1; // e.g. 65 for 32
    function isValidFieldElement(num) {
        return _0n$3 < num && num < Fp.ORDER; // 0 is banned since it's not invertible FE
    }
    function modN(a) {
        return mod(a, CURVE_ORDER);
    }
    function invN(a) {
        return invert(a, CURVE_ORDER);
    }
    const { ProjectivePoint: Point, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder, } = weierstrassPoints({
        ...CURVE,
        toBytes(_c, point, isCompressed) {
            const a = point.toAffine();
            const x = Fp.toBytes(a.x);
            const cat = concatBytes;
            if (isCompressed) {
                return cat(Uint8Array.from([point.hasEvenY() ? 0x02 : 0x03]), x);
            }
            else {
                return cat(Uint8Array.from([0x04]), x, Fp.toBytes(a.y));
            }
        },
        fromBytes(bytes) {
            const len = bytes.length;
            const head = bytes[0];
            const tail = bytes.subarray(1);
            // this.assertValidity() is done inside of fromHex
            if (len === compressedLen && (head === 0x02 || head === 0x03)) {
                const x = bytesToNumberBE(tail);
                if (!isValidFieldElement(x))
                    throw new Error('Point is not on curve');
                const y2 = weierstrassEquation(x); // y² = x³ + ax + b
                let y = Fp.sqrt(y2); // y = y² ^ (p+1)/4
                const isYOdd = (y & _1n$2) === _1n$2;
                // ECDSA
                const isHeadOdd = (head & 1) === 1;
                if (isHeadOdd !== isYOdd)
                    y = Fp.neg(y);
                return { x, y };
            }
            else if (len === uncompressedLen && head === 0x04) {
                const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
                const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
                return { x, y };
            }
            else {
                throw new Error(`Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`);
            }
        },
    });

        msgHash = ensureBytes('msgHash', msgHash);
        publicKey = ensureBytes('publicKey', publicKey);
        if ('strict' in opts)
            throw new Error('options.strict was renamed to lowS');
        const { lowS, prehash } = opts;
        let _sig = undefined;
        let P;
        try {
            if (typeof sg === 'string' || sg instanceof Uint8Array) {
                // Signature can be represented in 2 ways: compact (2*nByteLength) & DER (variable-length).
                // Since DER can also be 2*nByteLength bytes, we check for it first.
                try {
                    _sig = Signature.fromDER(sg);
                }
                catch (derError) {
                    if (!(derError instanceof DER.Err))
                        throw derError;
                    _sig = Signature.fromCompact(sg);
                }
            }
            else if (typeof sg === 'object' && typeof sg.r === 'bigint' && typeof sg.s === 'bigint') {
                const { r, s } = sg;
                _sig = new Signature(r, s);
            }
            else {
                throw new Error('PARSE');
            }
            P = Point.fromHex(publicKey);
        }
        catch (error) {
            if (error.message === 'PARSE')
                throw new Error(`signature must be Signature instance, Uint8Array or hex string`);
            return false;
        }
        if (lowS && _sig.hasHighS())
            return false;
        if (prehash)
            msgHash = CURVE.hash(msgHash);
        const { r, s } = _sig;
        const h = bits2int_modN(msgHash); // Cannot use fields methods, since it is group element
        const is = invN(s); // s^-1
        const u1 = modN(h * is); // u1 = hs^-1 mod n
        const u2 = modN(r * is); // u2 = rs^-1 mod n
        const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine(); // R = u1⋅G + u2⋅P
        if (!R)
            return false;
        const v = modN(R.x);
        return v === r;
    }
    return {
        CURVE,
        getPublicKey,
        getSharedSecret,
        sign,
        verify,
        ProjectivePoint: Point,
        Signature,
        utils,
    };
}

};
function get_config(config = {}) {
    return { ...SIGN_DEFAULTS, ...config };
}

function within_size(data, size) {
    if (data.length > size) {
        throw new TypeError(`Data is larger than array size: ${data.length} > ${size}`);
    }
}
function is_hex$1(hex) {
    if (hex.match(/[^a-fA-f0-9]/) !== null) {
        throw new TypeError('Invalid characters in hex string: ' + hex);
    }
    if (hex.length % 2 !== 0) {
        throw new Error(`Length of hex string is invalid: ${hex.length}`);
    }
}
function is_safe_num(num) {
    if (num > Number.MAX_SAFE_INTEGER) {
        throw new TypeError('Number exceeds safe bounds!');
    }
}
function is_prefix(actual, target) {
    if (actual !== target) {
        throw new TypeError(`Bech32 prefix does not match: ${actual} !== ${target}`);
    }
}

const ec = new TextEncoder();
const dc = new TextDecoder();
function strToBytes(str) {
    return ec.encode(str);
}
function bytesToStr(bytes) {
    return dc.decode(bytes);
}
function hex_size(hexstr, size) {
    is_hex$1(hexstr);
    const len = hexstr.length / 2;
    if (size === undefined)
        size = len;
    if (len > size) {
        throw new TypeError(`Hex string is larger than array size: ${len} > ${size}`);
    }
    return size;
}
    };
}
const base64 = /* @__PURE__ */ chain(radix2(6), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'), padding(6), join(''));
const base64url = /* @__PURE__ */ chain(radix2(6), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'), padding(6), join(''));
// base58 code
// -----------
const genBase58 = (abc) => chain(radix(58), alphabet(abc), join(''));
const base58 = /* @__PURE__ */ genBase58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
const base58check =  (sha256) => chain(checksum(4, (data) => sha256(sha256(data))), base58);
const BECH_ALPHABET = /* @__PURE__ */ chain(alphabet('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), join(''));
const POLYMOD_GENERATORS = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
/**
 * @__NO_SIDE_EFFECTS__
 */
function bech32Polymod(pre) {
    const b = pre >> 25;
    let chk = (pre & 0x1ffffff) << 5;
    for (let i = 0; i < POLYMOD_GENERATORS.length; i++) {
        if (((b >> i) & 1) === 1)
            chk ^= POLYMOD_GENERATORS[i];
    }
    return chk;
}
/**
 * @__NO_SIDE_EFFECTS__
 */
function bechChecksum(prefix, words, encodingConst = 1) {
    const len = prefix.length;
    let chk = 1;
    for (let i = 0; i < len; i++) {
        const c = prefix.charCodeAt(i);
        if (c < 33 || c > 126)
            throw new Error(`Invalid prefix (${prefix})`);
        chk = bech32Polymod(chk) ^ (c >> 5);
    }
    chk = bech32Polymod(chk);
    for (let i = 0; i < len; i++)
        chk = bech32Polymod(chk) ^ (prefix.charCodeAt(i) & 0x1f);
    for (let v of words)
        chk = bech32Polymod(chk) ^ v;
    for (let i = 0; i < 6; i++)
        chk = bech32Polymod(chk);
    chk ^= encodingConst;
    return BECH_ALPHABET.encode(convertRadix2([chk % 2 ** 30], 30, 5, false));
}
/**
 * @__NO_SIDE_EFFECTS__
 */
function genBech32(encoding) {
    const ENCODING_CONST = encoding === 'bech32' ? 1 : 0x2bc830a3;
    const _words = radix2(5);
    const fromWords = _words.decode;
    const toWords = _words.encode;
    const fromWordsUnsafe = unsafeWrapper(fromWords);
    function encode(prefix, words, limit = 90) {
        if (typeof prefix !== 'string')
            throw new Error(`bech32.encode prefix should be string, not ${typeof prefix}`);
        if (!Array.isArray(words) || (words.length && typeof words[0] !== 'number'))
            throw new Error(`bech32.encode words should be array of numbers, not ${typeof words}`);
        const actualLength = prefix.length + 7 + words.length;
        if (limit !== false && actualLength > limit)
            throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
        const lowered = prefix.toLowerCase();
        const sum = bechChecksum(lowered, words, ENCODING_CONST);
        return `${lowered}1${BECH_ALPHABET.encode(words)}${sum}`;
    }
    function decode(str, limit = 90) {
        if (typeof str !== 'string')
            throw new Error(`bech32.decode input should be string, not ${typeof str}`);
        if (str.length < 8 || (limit !== false && str.length > limit))
            throw new TypeError(`Wrong string length: ${str.length} (${str}). Expected (8..${limit})`);
        // don't allow mixed case
        const lowered = str.toLowerCase();
        if (str !== lowered && str !== str.toUpperCase())
            throw new Error(`String must be lowercase or uppercase`);
        str = lowered;
        const sepIndex = str.lastIndexOf('1');
        if (sepIndex === 0 || sepIndex === -1)
            throw new Error(`Letter "1" must be present between prefix and data only`);
        const prefix = str.slice(0, sepIndex);
        const _words = str.slice(sepIndex + 1);
        if (_words.length < 6)
            throw new Error('Data must be at least 6 characters long');
        const words = BECH_ALPHABET.decode(_words).slice(0, -6);
        const sum = bechChecksum(prefix, words, ENCODING_CONST);
        if (!_words.endsWith(sum))
            throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
        return { prefix, words };
    }
    const decodeUnsafe = unsafeWrapper(decode);
    function decodeToBytes(str) {
        const { prefix, words } = decode(str, false);
        return { prefix, words, bytes: fromWords(words) };
    }
    return { encode, decode, decodeToBytes, decodeUnsafe, fromWords, fromWordsUnsafe, toWords };
}
const bech32 = /* @__PURE__ */ genBech32('bech32');
const bech32m = /* @__PURE__ */ genBech32('bech32m');

const B58chk = {
    encode: (data) => base58check(sha256$1).encode(data),
    decode: (data) => base58check(sha256$1).decode(data)
};
const Base64 = {
    encode: (data) => base64.encode(data),
    decode: (data) => base64.decode(data)
};
const B64url = {
    encode: (data) => base64url.encode(data),
    decode: (data) => base64url.decode(data)
};
const Bech32 = {
    to_words: bech32.toWords,
    to_bytes: bech32.fromWords,
    encode: (prefix, words, limit = false) => {
        return bech32.encode(prefix, words, limit);
    },
    decode: (data, limit = false) => {
        const { prefix, words } = bech32.decode(data, limit);
        return { prefix, words };
    }
};
const Bech32m = {
    to_words: bech32m.toWords,
    to_bytes: bech32m.fromWords,
    encode: (prefix, words, limit = false) => {
        return bech32m.encode(prefix, words, limit);
    },
    decode: (data, limit = false) => {
        const { prefix, words } = bech32m.decode(data, limit);
        return { prefix, words };
    }
};

const _0n$1 = BigInt(0);
const _255n = BigInt(255);
const _256n = BigInt(256);
function big_size(big) {
    if (big <= 0xffn)
        return 1;
    if (big <= 0xffffn)
        return 2;
    if (big <= 0xffffffffn)
        return 4;
    if (big <= 0xffffffffffffffffn)
        return 8;
    if (big <= 0xffffffffffffffffffffffffffffffffn)
        return 16;
    if (big <= 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn) {
        return 32;
    }
    throw new TypeError('Must specify a fixed buffer size for bigints greater than 32 bytes.');
}
function bigToBytes(big, size, endian = 'be') {
    if (size === undefined)
        size = big_size(big);
    const use_le = (endian === 'le');
    const buffer = new ArrayBuffer(size);
    const dataView = new DataView(buffer);
    let offset = (use_le) ? 0 : size - 1;
    while (big > _0n$1) {
        const byte = big & _255n;
        const num = Number(byte);
        if (use_le) {
            dataView.setUint8(offset++, num);
        }
        else {
            dataView.setUint8(offset--, num);
        }
        big = (big - byte) / _256n;
    }
    return new Uint8Array(buffer);
}
function bytesToBig(bytes) {
    let num = BigInt(0);
    for (let i = bytes.length - 1; i >= 0; i--) {
        num = (num * _256n) + BigInt(bytes[i]);
    }
    return BigInt(num);
}

function binToBytes(binary) {
    const bins = binary.split('').map(Number);
    if (bins.length % 8 !== 0) {
        throw new Error(`Binary array is invalid length: ${binary.length}`);
    }
    const bytes = new Uint8Array(bins.length / 8);
    for (let i = 0, ct = 0; i < bins.length; i += 8, ct++) {
        let byte = 0;
        for (let j = 0; j < 8; j++) {
            byte |= (bins[i + j] << (7 - j));
        }
        bytes[ct] = byte;
    }
    return bytes;
}
function bytesToBin(bytes) {
    const bin = new Array(bytes.length * 8);
    let count = 0;
    for (const num of bytes) {
        if (num > 255) {
            throw new Error(`Invalid byte value: ${num}. Byte values must be between 0 and 255.`);
        }
        for (let i = 7; i >= 0; i--, count++) {
            bin[count] = (num >> i) & 1;
        }
    }
    return bin.join('');
}

function num_size(num) {
    if (num <= 0xFF)
        return 1;
    if (num <= 0xFFFF)
        return 2;
    if (num <= 0xFFFFFFFF)
        return 4;
    throw new TypeError('Numbers larger than 4 bytes must specify a fixed size!');
}
function numToBytes(num, size, endian = 'be') {
    if (size === undefined)
        size = num_size(num);
    const use_le = (endian === 'le');
    const buffer = new ArrayBuffer(size);
    const dataView = new DataView(buffer);
    let offset = (use_le) ? 0 : size - 1;
    while (num > 0) {
        const byte = num & 255;
        if (use_le) {
            dataView.setUint8(offset++, num);
        }
        else {
            dataView.setUint8(offset--, num);
        }
        num = (num - byte) / 256;
    }
    return new Uint8Array(buffer);
}
function bytesToNum(bytes) {
    let num = 0;
    for (let i = bytes.length - 1; i >= 0; i--) {
        num = (num * 256) + bytes[i];
        is_safe_num(num);
    }
    return num;
}

let cryptomod;
if (typeof webcrypto !== 'undefined') {
    cryptomod = webcrypto;
}
else if (typeof crypto !== 'undefined') {
    cryptomod = crypto;
}
else if (typeof globalThis?.crypto !== 'undefined') {
    cryptomod = globalThis.crypto;
}
else if (typeof window !== 'undefined') {
    cryptomod = window.crypto;
}
else {
    throw new Error('Unable to detect web crypto module!');
}
function random$1(size = 32) {
    if (typeof cryptomod.getRandomValues === 'function') {
        return cryptomod.getRandomValues(new Uint8Array(size));
    }
    throw new Error('Web crypto module missing getRandomValues!');
}
function is_hex(input) {
    if (input.match(/[^a-fA-F0-9]/) === null &&
        input.length % 2 === 0) {
        return true;
    }
    return false;
}
function is_bytes(input) {
    if (typeof input === 'string' && is_hex(input)) {
        return true;
    }
    else if (typeof input === 'number' ||
        typeof input === 'bigint' ||
        input instanceof Uint8Array) {
        return true;
    }
    else if (Array.isArray(input) &&
        input.every(e => typeof e === 'number')) {
        return true;
    }
    else {
        return false;
    }
}
function set_buffer(data, size, endian = 'be') {
    if (size === undefined)
        size = data.length;
    within_size(data, size);
    const buffer = new Uint8Array(size).fill(0);
    const offset = (endian === 'be') ? 0 : size - data.length;
    buffer.set(data, offset);
    return buffer;
}
function join_array(arr) {
    let i, offset = 0;
    const size = arr.reduce((len, arr) => len + arr.length, 0);
    const buff = new Uint8Array(size);
    for (i = 0; i < arr.length; i++) {
        const a = arr[i];
        buff.set(a, offset);
        offset += a.length;
    }
    return buff;
}
function bigint_replacer(_, v) {
    return typeof v === 'bigint'
        ? `${v}n`
        : v;
}
function bigint_reviver(_, v) {
    return typeof v === 'string' && /^[0-9]+n$/.test(v)
        ? BigInt(v.slice(0, -1))
        : v;
}
function parse_data$1(data_blob, chunk_size, total_size) {
    const len = data_blob.length, count = total_size / chunk_size;
    if (total_size % chunk_size !== 0) {
        throw new TypeError(`Invalid parameters: ${total_size} % ${chunk_size} !== 0`);
    }
    if (len !== total_size) {
        throw new TypeError(`Invalid data stream: ${len} !== ${total_size}`);
    }
    if (len % chunk_size !== 0) {
        throw new TypeError(`Invalid data stream: ${len} % ${chunk_size} !== 0`);
    }
    const chunks = new Array(count);
    for (let i = 0; i < count; i++) {
        const idx = i * chunk_size;
        chunks[i] = data_blob.subarray(idx, idx + chunk_size);
    }
    return chunks;
}

function buffer_data(data, size, endian) {
    if (data instanceof ArrayBuffer) {
        return new Uint8Array(data);
    }
    else if (data instanceof Uint8Array) {
        return set_buffer(data, size, endian);
    }
    else if (Array.isArray(data)) {
        const bytes = data.map(e => buffer_data(e, size, endian));
        return join_array(bytes);
    }
    else if (typeof data === 'string') {
        return hexToBytes(data, size, endian);
    }
    else if (typeof data === 'bigint') {
        return bigToBytes(data, size, endian);
    }
    else if (typeof data === 'number') {
        return numToBytes(data, size, endian);
    }
    else if (typeof data === 'boolean') {
        return Uint8Array.of(data ? 1 : 0);
    }
    throw new TypeError('Unsupported format:' + String(typeof data));
}

class Buff extends Uint8Array {
    static { this.num = numToBuff; }
    static { this.big = bigToBuff; }
    static { this.bin = binToBuff; }
    static { this.raw = rawToBuff; }
    static { this.str = strToBuff; }
    static { this.hex = hexToBuff; }
    static { this.bytes = buffer; }
    static { this.json = jsonToBuff; }
    static { this.base64 = base64ToBuff; }
    static { this.b64url = b64urlToBuff; }
    static { this.bech32 = bech32ToBuff; }
    static { this.bech32m = bech32mToBuff; }
    static { this.b58chk = b58chkToBuff; }
    static { this.encode = strToBytes; }
    static { this.decode = bytesToStr; }
    static { this.parse = parse_data; }
    static { this.is_bytes = is_bytes; }
    static { this.is_hex = is_hex; }
    static { this.is_equal = is_equal; }
    static random(size = 32) {
        const rand = random$1(size);
        return new Buff(rand, size);
    }
    static now(size = 4) {
        const stamp = Math.floor(Date.now() / 1000);
        return new Buff(stamp, size);
    }
    constructor(data, size, endian) {
        if (data instanceof Buff &&
            size === undefined) {
            return data;
        }
        const buffer = buffer_data(data, size, endian);
        super(buffer);
    }
    get arr() {
        return [...this];
    }
    get num() {
        return this.to_num();
    }
    get big() {
        return this.to_big();
    }
    get str() {
        return this.to_str();
    }
    get hex() {
        return this.to_hex();
    }
    get raw() {
        return new Uint8Array(this);
    }
    get bin() {
        return this.to_bin();
    }
    get b58chk() {
        return this.to_b58chk();
    }
    get base64() {
        return this.to_base64();
    }
    get b64url() {
        return this.to_b64url();
    }
    get digest() {
        return this.to_hash();
    }
    get id() {
        return this.to_hash().hex;
    }
    get stream() {
        return new Stream(this);
    }
    to_num(endian = 'be') {
        const bytes = (endian === 'be')
            ? this.reverse()
            : this;
        return bytesToNum(bytes);
    }
    to_big(endian = 'be') {
        const bytes = (endian === 'be')
            ? this.reverse()
            : this;
        return bytesToBig(bytes);
    }
    to_bin() {
        return bytesToBin(this);
    }
    to_hash() {
        const digest = sha256$1(this);
        return new Buff(digest);
    }
    to_json(reviver) {
        if (reviver === undefined) {
            reviver = bigint_reviver;
        }
        const str = bytesToStr(this);
        return JSON.parse(str, reviver);
    }
    to_bech32(prefix, limit) {
        const { encode, to_words } = Bech32;
        const words = to_words(this);
        return encode(prefix, words, limit);
    }
    to_bech32m(prefix, limit) {
        const { encode, to_words } = Bech32m;
        const words = to_words(this);
        return encode(prefix, words, limit);
    }

to_str() { return bytesToStr(this); }
    to_hex() { return bytesToHex(this); }
    to_bytes() { return new Uint8Array(this); }
    to_b58chk() { return B58chk.encode(this); }
    to_base64() { return Base64.encode(this); }
    to_b64url() { return B64url.encode(this); }
    append(data) {
        return Buff.join([this, Buff.bytes(data)]);
    }
    equals(data) {
        return buffer(data).hex === this.hex;
    }
    prepend(data) {
        return Buff.join([Buff.bytes(data), this]);
    }
    reverse() {
        const arr = new Uint8Array(this).reverse();
        return new Buff(arr);
    }
    slice(start, end) {
        const arr = new Uint8Array(this).slice(start, end);
        return new Buff(arr);
    }
    set(array, offset) {
        this.set(array, offset);
    }
    subarray(begin, end) {
        const arr = new Uint8Array(this).subarray(begin, end);
        return new Buff(arr);
    }
    write(bytes, offset) {
        const b = Buff.bytes(bytes);
        this.set(b, offset);
    }
    add_varint(endian) {
        const size = Buff.calc_varint(this.length, endian);
        return Buff.join([size, this]);
    }
    static from(data) {
        return new Buff(Uint8Array.from(data));
    }
    static of(...args) {
        return new Buff(Uint8Array.of(...args));
    }
    static join(arr) {
        const bytes = arr.map(e => Buff.bytes(e));
        const joined = join_array(bytes);
        return new Buff(joined);
    }
    static sort(arr, size) {
        const hex = arr.map(e => buffer(e, size).hex);
        hex.sort();
        return hex.map(e => Buff.hex(e, size));
    }
    static calc_varint(num, endian) {
        if (num < 0xFD) {
            return Buff.num(num, 1);
        }
        else if (num < 0x10000) {
            return Buff.of(0xFD, ...Buff.num(num, 2, endian));
        }
        else if (num < 0x100000000) {
            return Buff.of(0xFE, ...Buff.num(num, 4, endian));
        }
        else if (BigInt(num) < 0x10000000000000000n) {
            return Buff.of(0xFF, ...Buff.num(num, 8, endian));
        }
        else {
            throw new Error(`Value is too large: ${num}`);
        }
    }
}
function numToBuff(number, size, endian) {
    return new Buff(number, size, endian);
}
function binToBuff(data, size, endian) {
    return new Buff(binToBytes(data), size, endian);
}
function bigToBuff(bigint, size, endian) {
    return new Buff(bigint, size, endian);
}
function rawToBuff(data, size, endian) {
    return new Buff(data, size, endian);
}
function strToBuff(data, size, endian) {
    return new Buff(strToBytes(data), size, endian);
}
function hexToBuff(data, size, endian) {
    return new Buff(data, size, endian);
}
function jsonToBuff(data, replacer) {
    if (replacer === undefined) {
        replacer = bigint_replacer;
    }
    const str = JSON.stringify(data, replacer);
    return new Buff(strToBytes(str));
}
function base64ToBuff(data) {
    return new Buff(Base64.decode(data));
}
function b64urlToBuff(data) {
    return new Buff(B64url.decode(data));
}
function bech32ToBuff(data, limit, chk_prefix) {
    const { decode, to_bytes } = Bech32;
    const { prefix, words } = decode(data, limit);
    const bytes = to_bytes(words);
    if (typeof chk_prefix === 'string') {
        is_prefix(prefix, chk_prefix);
    }
    return new Buff(bytes);
}
function bech32mToBuff(data, limit, chk_prefix) {
    const { decode, to_bytes } = Bech32m;
    const { prefix, words } = decode(data, limit);
    const bytes = to_bytes(words);
    if (typeof chk_prefix === 'string') {
        is_prefix(prefix, chk_prefix);
    }
    return new Buff(bytes);
}
function b58chkToBuff(data) {
    return new Buff(B58chk.decode(data));
}
function parse_data(data_blob, chunk_size, total_size) {
    const bytes = buffer_data(data_blob);
    const chunks = parse_data$1(bytes, chunk_size, total_size);
    return chunks.map(e => Buff.bytes(e));
}
function is_equal(a, b) {
    return new Buff(a).hex === new Buff(b).hex;
}
function buffer(bytes, size, end) {
    return new Buff(bytes, size, end);
}
class Stream {
    constructor(data) {
        this.data = Buff.bytes(data);
        this.size = this.data.length;
    }
    peek(size) {
        if (size > this.size) {
            throw new Error(`Size greater than stream: ${size} > ${this.size}`);
        }
        return new Buff(this.data.slice(0, size));
    }
    read(size) {
        const chunk = this.peek(size);
        this.data = this.data.slice(size);
        this.size = this.data.length;
        return chunk;
    }
    read_varint(endian) {
        const num = this.read(1).num;
        switch (true) {
            case (num >= 0 && num < 0xFD):
                return num;
            case (num === 0xFD):
                return this.read(2).to_num(endian);
            case (num === 0xFE):
                return this.read(4).to_num(endian);
            case (num === 0xFF):
                return this.read(8).to_num(endian);
            default:
                throw new Error(`Varint is out of range: ${num}`);
        }
    }
}

const curve = secp256k1.CURVE;
const _N = curve.n;
const _P = curve.p;
const _G = { x: curve.Gx, y: curve.Gy };
const _0n = BigInt(0);
const _1n = BigInt(1);
const _2n = BigInt(2);
const _3n = BigInt(3);
const _4n = BigInt(4);

var _const = /*#__PURE__*/Object.freeze({
    __proto__: null,
    _0n: _0n,
    _1n: _1n,
    _2n: _2n,
    _3n: _3n,
    _4n: _4n,
    _G: _G,
    _N: _N,
    _P: _P
});

const ECPoint = secp256k1.ProjectivePoint;
const Noble = ECPoint;
function is_even(p) {
    const pa = new ECPoint(p.x, p.y, _1n);
    return pa.hasEvenY();
}
function is_point(point) {
    const p = point;
    return ((typeof p === 'object' && p !== null) &&
        (typeof p.x === 'bigint' && typeof p.y === 'bigint'));
}
function is_valid(point) {
    if (!is_point(point))
        return false;
    const pt = new ECPoint(point.x, point.y, _1n);
    try {
        pt.assertValidity();
        return true;
    }
    catch {
        return false;
    }
}
function assert_valid(p) {
    if (!is_valid(p)) {
        throw new Error('ECC point is invalid: ' + String(p));
    }
}
function negate(a) {
    const pa = new ECPoint(a.x, a.y, _1n);
    try {
        const pc = pa.negate();
        pc.assertValidity();
        return { x: pc.x, y: pc.y };
    }
    catch {
        return null;
    }
}
function add$1(a, b) {
    if (a === null)
        return b;
    if (b === null)
        return a;
    const pa = new ECPoint(a.x, a.y, _1n);
    const pb = new ECPoint(b.x, b.y, _1n);
    try {
        const pc = pa.add(pb);
        pc.assertValidity();
        return { x: pc.x, y: pc.y };
    }
    catch {
        return null;
    }
}
function sub(a, b) {
    if (a === null)
        return b;
    if (b === null)
        return a;
    const pa = new ECPoint(a.x, a.y, _1n);
    const pb = new ECPoint(b.x, b.y, _1n);
    try {
        const pc = pa.subtract(pb);
        pc.assertValidity();
        return { x: pc.x, y: pc.y };
    }
    catch {
        return null;
    }
}
function eq(a, b) {
    if (a === null && b === null) {
        return true;
    }
    if (a !== null && b !== null) {
        return (a.x === b.x && a.y === b.y);
    }
    return false;
}
function mul(a, b) {
    if (a === null)
        return null;
    try {
        const buff = Buff.bytes(b);
        const pa = new ECPoint(a.x, a.y, _1n);
        const pc = pa.multiply(buff.big);
        pc.assertValidity();
        return { x: pc.x, y: pc.y };
    }
    catch {
        return null;
    }
}
function gen(b) {
    const buff = Buff.bytes(b);
    const base = ECPoint.BASE;
    const pt = base.multiply(buff.big);
    pt.assertValidity();
    return { x: pt.x, y: pt.y };
}
function lift_x(bytes, xonly = false) {
    let key = Buff.bytes(bytes);
    if (key.length === 32) {
        key = key.prepend(0x02);
    }
    if (xonly && key[0] !== 0x02) {
        key[0] = 0x02;
    }
    const point = ECPoint.fromHex(key.hex);
    point.assertValidity();
    return { x: point.x, y: point.y };
}
function to_bytes(p) {
    const bytes = Buff.big(p.x, 32);
    const parity = is_even(p) ? 0x02 : 0x03;
    return Buff.join([parity, bytes]);
}

var point = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Noble: Noble,
    add: add$1,
    assert_valid: assert_valid,
    eq: eq,
    gen: gen,
    is_even: is_even,
    is_point: is_point,
    is_valid: is_valid,
    lift_x: lift_x,
    mul: mul,
    negate: negate,
    sub: sub,
    to_bytes: to_bytes
});

const fd = Field$1(_N, 32, true);
const GF = Field$1;
const mod_n = (x) => mod(x, _N);
const mod_p = (x) => mod(x, _P);
const pow_n = (x, exp) => pow(x, exp, _N);
const sqrt_n = FpSqrt(_N);
const sqrt_p = FpSqrt(_P);
const on_curve$1 = (x) => {
    return typeof x === 'bigint' && _0n < x && x < _P;
};
const in_field$1 = (x) => {
    return typeof x === 'bigint' && _0n < x && x < _N;
};
function mod_bytes(bytes) {
    const b = Buff.bytes(bytes).big;
    return Buff.big(mod_n(b), 32);
}

var math = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GF: GF,
    fd: fd,
    in_field: in_field$1,
    invert: invert,
    mod: mod,
    mod_bytes: mod_bytes,
    mod_n: mod_n,
    mod_p: mod_p,
    on_curve: on_curve$1,
    pow: pow,
    pow2: pow2,
    pow_n: pow_n,
    pt: point,
    sqrt_n: sqrt_n,
    sqrt_p: sqrt_p
});

function ok(value, message) {
    if (value === false)
        throw new Error(message ?? 'Assertion failed!');
}
function fail(error, throws = false) {
    if (!throws)
        return false;
    throw new Error(error);
}
function size(input, size, throws) {
    const bytes = Buff.bytes(input);
    if (bytes.length !== size) {
        return fail(`Invalid byte size: ${bytes.hex} !== ${size}`, throws);
    }
    return true;
}
function exists(input) {
    if (typeof input === 'undefined') {
        throw new TypeError('Input is undefined!');
    }
    if (input === null) {
        throw new TypeError('Input is null!');
    }
}
function on_curve(x, throws) {
    if (!(typeof x === 'bigint' && _0n < x && x < _P)) {
        fail('x value is not on the curve!', throws);
    }
    return true;
}
function in_field(x, throws) {
    if (!(typeof x === 'bigint' && _0n < x && x < _N)) {
        fail('x value is not in the field!', throws);
    }
    return true;
}
function valid_chain(path, code) {
    if (code === undefined) {
        if (!path.startsWith('m')) {
            throw new Error('You need to specify a chain-code for a non-root path.');
        }
    }
    else {
        if (Buff.bytes(code).length !== 32) {
            throw new Error('Chain code must be 32 bytes!');
        }
    }
}
function valid_path(path) {
    const regex = /^(m)?(\/)?(\w+'?\/)*\w+'?$/;
    if (path !== '' && path.match(regex) === null) {
        throw new Error('Provided path string is invalid: ' + path);
    }
}
function valid_hash(hash) {
    const regex = /^[0-9a-fA-F]{64}$/;
    if (hash.match(regex) === null) {
        throw new Error('Provided hash string is invalid: ' + hash);
    }
}
function valid_index(index) {
    if (index > 0x80000000) {
        throw new TypeError('Index value must not exceed 31 bits.');
    }
}
function valid_pubkey(pubkey) {
    const key = Buff.bytes(pubkey);
    if (key.length !== 33) {
        throw new TypeError('Index value must not exceed 31 bits.');
    }
}
function valid_derive_state(hardened, is_private) {
    if (hardened && !is_private) {
        throw new Error('Cannot derive hardedened paths when is_private is false!');
    }
}

var assert = /*#__PURE__*/Object.freeze({
    __proto__: null,
    exists: exists,
    fail: fail,
    in_field: in_field,
    ok: ok,
    on_curve: on_curve,
    size: size,
    valid_chain: valid_chain,
    valid_derive_state: valid_derive_state,
    valid_hash: valid_hash,
    valid_index: valid_index,
    valid_path: valid_path,
    valid_pubkey: valid_pubkey
});

const NoblePoint = secp256k1.ProjectivePoint;
class Field extends Uint8Array {
    static { this.N = _N; }
    static add(x) {
        return x.map(e => Field.mod(e)).reduce((p, n) => p.add(n));
    }
    static mod(x) {
        return new Field(x);
    }
    static mul(x) {
        return x.map(e => Field.mod(e)).reduce((p, n) => p.mul(n));
    }
    static is_valid(value, throws) {
        const big = Buff.bytes(value, 32).big;
        return in_field(big, throws);
    }
    static random() {
        return Field.mod(Buff.random(32));
    }
    constructor(x) {
        const b = mod_n(normalizeField(x));
        Field.is_valid(b, true);
        super(Buff.big(b, 32), 32);
    }
    get buff() {
        return new Buff(this);
    }
    get raw() {
        return this.buff.raw;
    }
    get big() {
        return this.buff.big;
    }
    get hex() {
        return this.buff.hex;
    }
    get point() {
        return this.generate();
    }
    get hasOddY() {
        return this.point.hasOddY;
    }
    get negated() {
        return (this.hasOddY)
            ? this.negate()
            : this;
    }
    gt(value) {
        const x = new Field(value);
        return x.big > this.big;
    }
    lt(value) {
        const x = new Field(value);
        return x.big < this.big;
    }
    eq(value) {
        const x = new Field(value);
        return x.big === this.big;
    }
    ne(value) {
        const x = new Field(value);
        return x.big !== this.big;
    }
    add(value) {
        const x = Field.mod(value);
        const a = fd.add(this.big, x.big);
        return new Field(a);
    }
    sub(value) {
        const x = Field.mod(value);
        const a = fd.sub(this.big, x.big);
        return new Field(a);
    }
    mul(value) {
        const x = Field.mod(value);
        const a = fd.mul(this.big, x.big);
        return new Field(a);
    }
    pow(value) {
        const x = Field.mod(value);
        const a = fd.pow(this.big, x.big);
        return new Field(a);
    }
    div(value) {
        const x = Field.mod(value);
        const a = fd.div(this.big, x.big);
        return new Field(a);
    }
    negate() {
        return new Field(Field.N - this.big);
    }
    generate() {
        const base = secp256k1.ProjectivePoint.BASE;
        const point = base.multiply(this.big);
        return Point.import(point);
    }
}
class Point {
    static { this.P = _P; }
    static { this.G = new Point(_G.x, _G.y); }
    static { this.curve = secp256k1.CURVE; }
    static { this.base = secp256k1.ProjectivePoint.BASE; }
    static from_x(bytes, even_y = false) {
        let cp = normalizePoint(bytes);
        if (cp.length === 32) {
            cp = cp.prepend(0x02);
        }
        else if (even_y) {
            cp[0] = 0x02;
        }
        size(cp, 33);
        const point = NoblePoint.fromHex(cp.hex);
        point.assertValidity();
        return new Point(point.x, point.y);
    }
    static generate(value) {
        const field = Field.mod(value);
        const point = Point.base.multiply(field.big);
        return Point.import(point);
    }
    static { this.mul = Point.generate; }
    static import(point) {
        const p = (point instanceof Point)
            ? { x: point.x.big, y: point.y.big }
            : { x: point.x, y: point.y };
        return new Point(p.x, p.y);
    }
    constructor(x, y) {
        this._p = new NoblePoint(x, y, 1n);
        this.p.assertValidity();
    }
    get p() {
        return this._p;
    }
    get x() {
        return Buff.big(this.p.x, 32);
    }
    get y() {
        return Buff.big(this.p.y, 32);
    }
    get buff() {
        return Buff.raw(this.p.toRawBytes(true));
    }
    get raw() {
        return this.buff.raw;
    }
    get hex() {
        return this.buff.hex;
    }
    get hasEvenY() {
        return this.p.hasEvenY();
    }
    get hasOddY() {
        return !this.p.hasEvenY();
    }
    get negated() {
        return (this.hasOddY)
            ? this.negate()
            : this;
    }
    eq(value) {
        const p = (value instanceof Point) ? value : Point.from_x(value);
        return this.x.big === p.x.big && this.y.big === p.y.big;
    }
    add(x) {
        return (x instanceof Point)
            ? Point.import(this.p.add(x.p))
            : Point.import(this.p.add(Point.generate(x).p));
    }
    sub(x) {
        return (x instanceof Point)
            ? Point.import(this.p.subtract(x.p))
            : Point.import(this.p.subtract(Point.generate(x).p));
    }
    mul(value) {
        return (value instanceof Point)
            ? Point.import(this.p.multiply(value.x.big))
            : Point.import(this.p.multiply(Field.mod(value).big));
    }
    negate() {
        return Point.import(this.p.negate());
    }
}
function normalizeField(value) {
    if (value instanceof Field) {
        return value.big;
    }
    if (value instanceof Point) {
        return value.x.big;
    }
    if (value instanceof Uint8Array) {
        return Buff.raw(value).big;
    }
    if (typeof value === 'string') {
        return Buff.hex(value).big;
    }
    if (typeof value === 'number') {
        return Buff.num(value).big;
    }
    if (typeof value === 'bigint') {
        return BigInt(value);
    }
    throw TypeError('Invalid input type:' + typeof value);
}
function normalizePoint(value) {
    if (value instanceof Field) {
        return value.point.buff;
    }
    if (value instanceof Point) {
        return value.buff;
    }
    if (value instanceof Uint8Array ||
        typeof value === 'string') {
        return Buff.bytes(value);
    }
    if (typeof value === 'number' ||
        typeof value === 'bigint') {
        return Buff.bytes(value, 32);
    }
    throw new TypeError(`Unknown type: ${typeof value}`);
}

function random(size) {
    return Buff.random(size);
}
function increment_buffer(buffer) {
    let i = buffer.length - 1;
    for (i; i >= 0; i--) {
        if (buffer[i] < 255) {
            buffer.set([buffer[i] + 1], i);
            return buffer;
        }
    }
    throw TypeError('Unable to increment buffer: ' + buffer.toString());
}
function stringify(content) {
    switch (typeof content) {
        case 'object':
            return JSON.stringify(content);
        case 'string':
            return content;
        case 'bigint':
            return content.toString();
        case 'number':
            return content.toString();
        case 'boolean':
            return String(content);
        default:
            throw new TypeError('Content type not supported: ' + typeof content);
    }
}

var util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    increment_buffer: increment_buffer,
    random: random,
    stringify: stringify
});

function is_even_pub(pubkey) {
    const pub = Buff.bytes(pubkey);
    switch (true) {
        case (pub.length === 32):
            return true;
        case (pub.length === 33 && pub[0] === 0x02):
            return true;
        case (pub.length === 33 && pub[0] === 0x03):
            return false;
        default:
            throw new TypeError(`Invalid public key: ${pub.hex}`);
    }
}
function gen_seckey(even_y) {
    return get_seckey(random(32), even_y);
}
function get_seckey(secret, even_y = false) {
    const sec = Field.mod(secret);
    return (even_y) ? sec.negated.buff : sec.buff;
}
function get_pubkey(seckey, x_only = false) {
    const p = Field.mod(seckey).point;
    return (x_only) ? p.x : p.buff;
}
function tweak_seckey(seckey, tweaks = [], even_y = false) {
    let sec = Field.mod(seckey);
    for (const twk of tweaks) {
        sec = sec.add(twk);
        if (even_y)
            sec = sec.negated;
    }
    return sec.buff;
}
function tweak_pubkey(pubkey, tweaks = [], x_only = false) {
    let pub = Point.from_x(pubkey, x_only);
    for (const twk of tweaks) {
        pub = pub.add(twk);
        if (x_only)
            pub = pub.negated;
    }
    return (x_only) ? pub.x : pub.buff;
}
function parse_pubkey(pubkey, xonly) {
    return (xonly)
        ? convert_32b(pubkey)
        : convert_33b(pubkey);
}
function get_keypair(secret, x_only, even_y) {
    const sec = get_seckey(secret, even_y);
    const pub = get_pubkey(sec, x_only);
    return [sec, pub];
}
function gen_keypair(x_only, even_y) {
    const sec = random(32);
    return get_keypair(sec, x_only, even_y);
}
function convert_32b(pubkey) {
    const key = Buff.bytes(pubkey);
    if (key.length === 32)
        return key;
    if (key.length === 33)
        return key.slice(1, 33);
    throw new TypeError(`Invalid key length: ${key.length}`);
}
function convert_33b(pubkey, even_y = false) {
    const key = Buff.bytes(pubkey);
    if (key.length === 32) {
        return key.prepend(0x02);
    }
    else if (key.length === 33) {
        if (even_y)
            key[0] = 0x02;
        return key;
    }
    throw new TypeError(`Invalid key size: ${key.length}`);
}
function has_key(key, keys) {
    const str = keys.map(e => Buff.bytes(e).hex);
    return str.includes(Buff.bytes(key).hex);
}
function sort_keys(keys) {
    return keys
        .map(e => Buff.bytes(e).hex)
        .sort()
        .map(e => Buff.hex(e));
}

var keys = /*#__PURE__*/Object.freeze({
    __proto__: null,
    convert_32b: convert_32b,
    convert_33b: convert_33b,
    gen_keypair: gen_keypair,
    gen_seckey: gen_seckey,
    get_keypair: get_keypair,
    get_pubkey: get_pubkey,
    get_seckey: get_seckey,
    has_key: has_key,
    is_even_pub: is_even_pub,
    parse_pubkey: parse_pubkey,
    sort_keys: sort_keys,
    tweak_pubkey: tweak_pubkey,
    tweak_seckey: tweak_seckey
});

const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
// We are not using BigUint64Array, because they are extremely slow as per 2022
function fromBig(n, le = false) {
    if (le)
        return { h: Number(n & U32_MASK64), l: Number((n >> _32n) & U32_MASK64) };
    return { h: Number((n >> _32n) & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for (let i = 0; i < lst.length; i++) {
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
}
const toBig = (h, l) => (BigInt(h >>> 0) << _32n) | BigInt(l >>> 0);
// for Shift in [0, 32)
const shrSH = (h, _l, s) => h >>> s;
const shrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
// Right rotate for Shift in [1, 32)
const rotrSH = (h, l, s) => (h >>> s) | (l << (32 - s));
const rotrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotrBH = (h, l, s) => (h << (64 - s)) | (l >>> (s - 32));
const rotrBL = (h, l, s) => (h >>> (s - 32)) | (l << (64 - s));
// Right rotate for shift===32 (just swaps l&h)
const rotr32H = (_h, l) => l;
const rotr32L = (h, _l) => h;
// Left rotate for Shift in [1, 32)
const rotlSH = (h, l, s) => (h << s) | (l >>> (32 - s));
const rotlSL = (h, l, s) => (l << s) | (h >>> (32 - s));
// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotlBH = (h, l, s) => (l << (s - 32)) | (h >>> (64 - s));
const rotlBL = (h, l, s) => (h << (s - 32)) | (l >>> (64 - s));
// JS uses 32-bit signed integers for bitwise operations which means we cannot
// simple take carry out of low bit sum by shift, we need to use division.
function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return { h: (Ah + Bh + ((l / 2 ** 32) | 0)) | 0, l: l | 0 };
}
// Addition with more than 2 elements
const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch) => (Ah + Bh + Ch + ((low / 2 ** 32) | 0)) | 0;
const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
const add4H = (low, Ah, Bh, Ch, Dh) => (Ah + Bh + Ch + Dh + ((low / 2 ** 32) | 0)) | 0;
const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
const add5H = (low, Ah, Bh, Ch, Dh, Eh) => (Ah + Bh + Ch + Dh + Eh + ((low / 2 ** 32) | 0)) | 0;
// prettier-ignore
const u64 = {
    fromBig, split, toBig,
    shrSH, shrSL,
    rotrSH, rotrSL, rotrBH, rotrBL,
    rotr32H, rotr32L,
    rotlSH, rotlSL, rotlBH, rotlBL,
    add, add3L, add3H, add4L, add4H, add5H, add5L,
};
var u64$1 = u64;

// Round contants (first 32 bits of the fractional parts of the cube roots of the first 80 primes 2..409):
// prettier-ignore
const [SHA512_Kh, SHA512_Kl] = /* @__PURE__ */ (() => u64$1.split([
    '0x428a2f98d728ae22', '0x7137449123ef65cd', '0xb5c0fbcfec4d3b2f', '0xe9b5dba58189dbbc',
    '0x3956c25bf348b538', '0x59f111f1b605d019', '0x923f82a4af194f9b', '0xab1c5ed5da6d8118',
    '0xd807aa98a3030242', '0x12835b0145706fbe', '0x243185be4ee4b28c', '0x550c7dc3d5ffb4e2',
    '0x72be5d74f27b896f', '0x80deb1fe3b1696b1', '0x9bdc06a725c71235', '0xc19bf174cf692694',
    '0xe49b69c19ef14ad2', '0xefbe4786384f25e3', '0x0fc19dc68b8cd5b5', '0x240ca1cc77ac9c65',
    '0x2de92c6f592b0275', '0x4a7484aa6ea6e483', '0x5cb0a9dcbd41fbd4', '0x76f988da831153b5',
    '0x983e5152ee66dfab', '0xa831c66d2db43210', '0xb00327c898fb213f', '0xbf597fc7beef0ee4',
    '0xc6e00bf33da88fc2', '0xd5a79147930aa725', '0x06ca6351e003826f', '0x142929670a0e6e70',
    '0x27b70a8546d22ffc', '0x2e1b21385c26c926', '0x4d2c6dfc5ac42aed', '0x53380d139d95b3df',
    '0x650a73548baf63de', '0x766a0abb3c77b2a8', '0x81c2c92e47edaee6', '0x92722c851482353b',
    '0xa2bfe8a14cf10364', '0xa81a664bbc423001', '0xc24b8b70d0f89791', '0xc76c51a30654be30',
    '0xd192e819d6ef5218', '0xd69906245565a910', '0xf40e35855771202a', '0x106aa07032bbd1b8',
    '0x19a4c116b8d2d0c8', '0x1e376c085141ab53', '0x2748774cdf8eeb99', '0x34b0bcb5e19b48a8',
    '0x391c0cb3c5c95a63', '0x4ed8aa4ae3418acb', '0x5b9cca4f7763e373', '0x682e6ff3d6b2b8a3',
    '0x748f82ee5defb2fc', '0x78a5636f43172f60', '0x84c87814a1f0ab72', '0x8cc702081a6439ec',
    '0x90befffa23631e28', '0xa4506cebde82bde9', '0xbef9a3f7b2c67915', '0xc67178f2e372532b',
    '0xca273eceea26619c', '0xd186b8c721c0c207', '0xeada7dd6cde0eb1e', '0xf57d4f7fee6ed178',
    '0x06f067aa72176fba', '0x0a637dc5a2c898a6', '0x113f9804bef90dae', '0x1b710b35131c471b',
    '0x28db77f523047d84', '0x32caab7b40c72493', '0x3c9ebe0a15c9bebc', '0x431d67c49c100d4c',
    '0x4cc5d4becb3e42b6', '0x597f299cfc657e2a', '0x5fcb6fab3ad6faec', '0x6c44198c4a475817'
].map(n => BigInt(n))))();
// Temporary buffer, not used to store anything between runs
const SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
const SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
class SHA512 extends SHA2 {
    constructor() {
        super(128, 64, 16, false);
        // We cannot use array here since array allows indexing by variable which means optimizer/compiler cannot use registers.
        // Also looks cleaner and easier to verify with spec.
        // Initial state (first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19):
        // h -- high 32 bits, l -- low 32 bits
        this.Ah = 0x6a09e667 | 0;
        this.Al = 0xf3bcc908 | 0;
        this.Bh = 0xbb67ae85 | 0;
        this.Bl = 0x84caa73b | 0;
        this.Ch = 0x3c6ef372 | 0;
        this.Cl = 0xfe94f82b | 0;
        this.Dh = 0xa54ff53a | 0;
        this.Dl = 0x5f1d36f1 | 0;
        this.Eh = 0x510e527f | 0;
        this.El = 0xade682d1 | 0;
        this.Fh = 0x9b05688c | 0;
        this.Fl = 0x2b3e6c1f | 0;
        this.Gh = 0x1f83d9ab | 0;
        this.Gl = 0xfb41bd6b | 0;
        this.Hh = 0x5be0cd19 | 0;
        this.Hl = 0x137e2179 | 0;
    }
    // prettier-ignore
    get() {
        const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
        return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
    }
    // prettier-ignore
    set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
        this.Ah = Ah | 0;
        this.Al = Al | 0;
        this.Bh = Bh | 0;
        this.Bl = Bl | 0;
        this.Ch = Ch | 0;
        this.Cl = Cl | 0;
        this.Dh = Dh | 0;
        this.Dl = Dl | 0;
        this.Eh = Eh | 0;
        this.El = El | 0;
        this.Fh = Fh | 0;
        this.Fl = Fl | 0;
        this.Gh = Gh | 0;
        this.Gl = Gl | 0;
        this.Hh = Hh | 0;
        this.Hl = Hl | 0;
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 64 words w[16..79] of the message schedule array
        for (let i = 0; i < 16; i++, offset += 4) {
            SHA512_W_H[i] = view.getUint32(offset);
            SHA512_W_L[i] = view.getUint32((offset += 4));
        }
        for (let i = 16; i < 80; i++) {
            // s0 := (w[i-15] rightrotate 1) xor (w[i-15] rightrotate 8) xor (w[i-15] rightshift 7)
            const W15h = SHA512_W_H[i - 15] | 0;
            const W15l = SHA512_W_L[i - 15] | 0;
            const s0h = u64$1.rotrSH(W15h, W15l, 1) ^ u64$1.rotrSH(W15h, W15l, 8) ^ u64$1.shrSH(W15h, W15l, 7);
            const s0l = u64$1.rotrSL(W15h, W15l, 1) ^ u64$1.rotrSL(W15h, W15l, 8) ^ u64$1.shrSL(W15h, W15l, 7);
            // s1 := (w[i-2] rightrotate 19) xor (w[i-2] rightrotate 61) xor (w[i-2] rightshift 6)
            const W2h = SHA512_W_H[i - 2] | 0;
            const W2l = SHA512_W_L[i - 2] | 0;
            const s1h = u64$1.rotrSH(W2h, W2l, 19) ^ u64$1.rotrBH(W2h, W2l, 61) ^ u64$1.shrSH(W2h, W2l, 6);
            const s1l = u64$1.rotrSL(W2h, W2l, 19) ^ u64$1.rotrBL(W2h, W2l, 61) ^ u64$1.shrSL(W2h, W2l, 6);
            // SHA256_W[i] = s0 + s1 + SHA256_W[i - 7] + SHA256_W[i - 16];
            const SUMl = u64$1.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
            const SUMh = u64$1.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
            SHA512_W_H[i] = SUMh | 0;
            SHA512_W_L[i] = SUMl | 0;
        }
        let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
        // Compression function main loop, 80 rounds
        for (let i = 0; i < 80; i++) {
            // S1 := (e rightrotate 14) xor (e rightrotate 18) xor (e rightrotate 41)
            const sigma1h = u64$1.rotrSH(Eh, El, 14) ^ u64$1.rotrSH(Eh, El, 18) ^ u64$1.rotrBH(Eh, El, 41);
            const sigma1l = u64$1.rotrSL(Eh, El, 14) ^ u64$1.rotrSL(Eh, El, 18) ^ u64$1.rotrBL(Eh, El, 41);
            //const T1 = (H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
            const CHIh = (Eh & Fh) ^ (~Eh & Gh);
            const CHIl = (El & Fl) ^ (~El & Gl);
            // T1 = H + sigma1 + Chi(E, F, G) + SHA512_K[i] + SHA512_W[i]
            // prettier-ignore
            const T1ll = u64$1.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
            const T1h = u64$1.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
            const T1l = T1ll | 0;
            // S0 := (a rightrotate 28) xor (a rightrotate 34) xor (a rightrotate 39)
            const sigma0h = u64$1.rotrSH(Ah, Al, 28) ^ u64$1.rotrBH(Ah, Al, 34) ^ u64$1.rotrBH(Ah, Al, 39);
            const sigma0l = u64$1.rotrSL(Ah, Al, 28) ^ u64$1.rotrBL(Ah, Al, 34) ^ u64$1.rotrBL(Ah, Al, 39);
            const MAJh = (Ah & Bh) ^ (Ah & Ch) ^ (Bh & Ch);
            const MAJl = (Al & Bl) ^ (Al & Cl) ^ (Bl & Cl);
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({ h: Eh, l: El } = u64$1.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;
            const All = u64$1.add3L(T1l, sigma0l, MAJl);
            Ah = u64$1.add3H(All, T1h, sigma0h, MAJh);
            Al = All | 0;
        }
        // Add the compressed chunk to the current hash value
        ({ h: Ah, l: Al } = u64$1.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
        ({ h: Bh, l: Bl } = u64$1.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
        ({ h: Ch, l: Cl } = u64$1.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
        ({ h: Dh, l: Dl } = u64$1.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
        ({ h: Eh, l: El } = u64$1.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
        ({ h: Fh, l: Fl } = u64$1.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
        ({ h: Gh, l: Gl } = u64$1.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
        ({ h: Hh, l: Hl } = u64$1.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
        this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
    }
    roundClean() {
        SHA512_W_H.fill(0);
        SHA512_W_L.fill(0);
    }
    destroy() {
        this.buffer.fill(0);
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
const sha512$1 = /* @__PURE__ */ wrapConstructor(() => new SHA512());

// https://homes.esat.kuleuven.be/~bosselae/ripemd160.html
// https://homes.esat.kuleuven.be/~bosselae/ripemd160/pdf/AB-9601/AB-9601.pdf
const Rho = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]);
const Id = /* @__PURE__ */ Uint8Array.from({ length: 16 }, (_, i) => i);
const Pi = /* @__PURE__ */ Id.map((i) => (9 * i + 5) % 16);
let idxL = [Id];
let idxR = [Pi];
for (let i = 0; i < 4; i++)
    for (let j of [idxL, idxR])
        j.push(j[i].map((k) => Rho[k]));
const shifts = /* @__PURE__ */ [
    [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
    [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
    [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
    [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
    [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5],
].map((i) => new Uint8Array(i));
const shiftsL = /* @__PURE__ */ idxL.map((idx, i) => idx.map((j) => shifts[i][j]));
const shiftsR = /* @__PURE__ */ idxR.map((idx, i) => idx.map((j) => shifts[i][j]));
const Kl = /* @__PURE__ */ new Uint32Array([
    0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e,
]);
const Kr = /* @__PURE__ */ new Uint32Array([
    0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000,
]);

            leaves.push(r);
            for (const e of p) {
                path.push(e);
            }
        }
        else {
            leaves.push(leaf);
        }
    }
    if (leaves.length === 1) {
        return [leaves[0], target, path];
    }
    leaves.sort();
    if (leaves.length % 2 !== 0) {
        leaves.push(leaves[leaves.length - 1]);
    }
    for (let i = 0; i < leaves.length - 1; i += 2) {
        const branch = encoder(leaves[i], leaves[i + 1]);
        branches.push(branch);
        if (typeof target === 'string') {
            if (target === leaves[i]) {
                path.push(leaves[i + 1]);
                target = branch;
            }
            else if (target === leaves[i + 1]) {
                path.push(leaves[i]);
                target = branch;
            }
        }
    }
    return merkleize_tree(branches, target, path);
}
function encode_branch(a, b) {
    if (b < a) {
        [a, b] = [b, a];
    }
    return sha256(a, b).hex;
}

var merkle = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create_merkle_proof: create_merkle_proof,
    encode_branch: encode_branch,
    merkleize_tree: merkleize_tree,
    verify_merkle_proof: verify_merkle_proof
});

function sign_msg(message, secret, options) {
    const opt = get_config(options);
    const { adaptor, key_tweak } = opt;
    const m = Buff.bytes(message);
    let dp = Field.mod(secret);
    if (key_tweak !== undefined) {
        dp = dp.negated.add(key_tweak);
    }
    const P = dp.point;
    const d = dp.negated;
    const n = gen_nonce(m, d, opt);
    let kp = Field.mod(n);
    if (adaptor !== undefined) {
        kp = kp.negated.add(adaptor);
    }
    const R = kp.point;
    const k = kp.negated.big;
    const ch = hash340('BIP0340/challenge', R.x, P.x, m);
    const c = Field.mod(ch);
    const s = Field.mod(k + (c.big * d.big));
    return Buff.join([R.x, s.raw]);
}
function verify_sig(signature, message, pubkey, options) {
    const { throws } = get_config(options);
    const msg = Buff.bytes(message);
    const sig = Buff.bytes(signature);
    if (sig.length < 64) {
        return fail('Signature length is too small: ' + String(sig.length), throws);
    }
    size(pubkey, 32);
    const P = Point.from_x(pubkey);
    const rx = sig.subarray(0, 32);
    const R = Point.from_x(rx);
    const s = sig.subarray(32, 64);
    const sG = Field.mod(s).point;
    const ch = hash340('BIP0340/challenge', R.x, P.x, msg);
    const c = Field.mod(ch);
    const eP = P.mul(c.big);
    const r = sG.sub(eP);
    if (R.hasOddY) {
        return fail('Signature R value has odd Y coordinate!', throws);
    }
    if (R.x.big === _0n) {
        return fail('Signature R value is infinite!', throws);
    }
    if (R.x.big !== r.x.big) {
        return fail(`Signature is invalid! R: ${R.x.hex} r:${r.x.hex}`, throws);
    }
    return R.x.big === r.x.big;
}
function recover_key(signature, message, pub_key, rec_key) {
    const pub = parse_pubkey(pub_key, true);
    const sig = Buff.bytes(signature);
    const s_val = Field.mod(sig.slice(32, 64));
    const seed = get_shared_key(rec_key, pub, true);
    const nonce = hash340('BIP0340/nonce', seed, pub, message);
    const chal = hash340('BIP0340/challenge', sig.slice(0, 32), pub, message);
    const k = get_seckey(nonce, true);
    return s_val.sub(k).div(chal).buff;
}
function gen_nonce(message, secret, options) {
    const { aux, nonce_tweak, recovery_key } = get_config(options);
    const pubkey = get_pubkey(secret, true);
    let nonce, shared;
    if (recovery_key !== undefined) {
        const rec_key = parse_pubkey(recovery_key, true);
        shared = get_shared_key(secret, rec_key, true);
        nonce = Buff.join([shared, pubkey]);
    }
    else {
        const seed = (aux === null) ? Buff.num(0, 32) : aux;
        const a = hash340('BIP0340/aux', seed ?? Buff.random(32));
        const t = Buff.bytes(secret).big ^ a.big;
        nonce = Buff.join([t, get_pubkey(secret, true)]);
    }
    let sn = Field.mod(hash340('BIP0340/nonce', nonce, message));
    if (nonce_tweak !== undefined) {
        sn = sn.negated.add(nonce_tweak);
    }
    return sn.buff;
}

var sig = /*#__PURE__*/Object.freeze({
    __proto__: null,
    gen_nonce: gen_nonce,
    recover_key: recover_key,
    sign_msg: sign_msg,
    verify_sig: verify_sig
});

const PROOF_DEFAULTS = {
    kind: 20000,
    stamp: 0x00000000,
    tags: []
};
function create_proof(seckey, data, params, options) {
    const { kind, stamp, tags } = parse_config(params ?? []);
    const content = stringify(data);
    const pub = get_pubkey(seckey, true).hex;
    const ref = Buff.str(content).digest;
    const img = [0, pub, stamp, kind, tags, content];
    const pid = Buff.json(img).digest;
    const sig = sign_msg(pid, seckey, options);
    return Buff.join([ref, pub, pid, sig]).hex + encode_params(params);
}
function parse_proof(proof) {
    const [hexstr, query] = proof.split('?');
    const stream = Buff.hex(hexstr).stream;
    ok(stream.size === 160);
    return {
        ref: stream.read(32).hex,
        pub: stream.read(32).hex,
        pid: stream.read(32).hex,
        sig: stream.read(64).hex,
        params: decode_params(query)
    };
}
function parse_proofs(proofs) {
    return proofs.map(e => parse_proof(e));
}
function validate_proof(proof) {
    const regex = /^[0-9a-fA-F]{320}(?:\?[A-Za-z0-9_]+=[A-Za-z0-9_]+(?:&[A-Za-z0-9_]+=[A-Za-z0-9_]+)*)?$/;
    return regex.test(proof);
}
function verify_proof(proof, data, options) {
    const { throws = false } = options ?? {};
    const { ref, pub, pid, sig, params } = parse_proof(proof);
    const { kind, stamp, tags } = parse_config(params);
    const content = stringify(data);
    const content_ref = Buff.str(content).digest.hex;
    if (content_ref !== ref) {
        return fail('Content hash does not match reference hash!', throws);
    }
    const img = [0, pub, stamp, kind, tags, content];
    const proof_hash = Buff.json(img).digest;
    if (proof_hash.hex !== pid) {
        return fail('Proof hash does not equal proof id!', throws);
    }
    if (!verify_sig(sig, pid, pub)) {
        return fail('Proof signature is invalid!', throws);
    }
    return true;
}
function create_event(proof, data) {
    const content = stringify(data);
    const { pub, pid, sig, params } = parse_proof(proof);
    const { kind, stamp, tags } = parse_config(params);
    return { kind, content, tags, pubkey: pub, id: pid, sig, created_at: stamp };
}
function encode_params(params = []) {
    const strings = params.map(e => [String(e[0]), String(e[1])]);
    return (params.length !== 0)
        ? '?' + new URLSearchParams(strings).toString()
        : '';
}
function decode_params(str) {
    return (typeof str === 'string')
        ? [...new URLSearchParams(str)]
        : [];
}
function parse_config(params = []) {
    const { kind, stamp, ...rest } = Object.fromEntries(params);
    return {
        tags: Object.entries(rest).map(([k, v]) => [k, String(v)]),
        kind: (kind !== undefined) ? Number(kind) : PROOF_DEFAULTS.kind,
        stamp: (stamp !== undefined) ? Number(stamp) : PROOF_DEFAULTS.stamp
    };
}

var proof = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create_event: create_event,
    create_proof: create_proof,
    decode_params: decode_params,
    encode_params: encode_params,
    parse_config: parse_config,
    parse_proof: parse_proof,
    parse_proofs: parse_proofs,
    validate_proof: validate_proof,
    verify_proof: verify_proof
});

function create_shares(secret, thold, total) {
    const coeffs = [Field.mod(secret).big];
    for (let i = 1; i < thold; i++) {
        const rand = Buff.random(32).big;
        coeffs.push(mod_n(rand));
    }
    const shares = [];
    for (let i = 1; i <= total; i++) {
        let result = _0n;
        coeffs.forEach((coeff, index) => {
            const idx = BigInt(i) ** BigInt(index);
            result += fd.mul(coeff, idx);
        });
        shares.push([BigInt(i), result]);
    }
    return shares;
}
function combine_shares(shares) {
    let secret = _0n;
    for (let i = 0; i < shares.length; i++) {
        let numer = _1n;
        let denom = _1n;
        for (let j = 0; j < shares.length; j++) {
            if (i !== j) {
                numer = (numer * -shares[j][0]) % _N;
                denom = (denom * (shares[i][0] - shares[j][0])) % _N;
            }
        }
        if (numer < _0n)
            numer += _N;
        if (denom < _0n)
            denom += _N;
        const coeff = (shares[i][1] * numer * invert(denom, _N)) % _N;
        secret = (secret + coeff) % _N;
    }
    return Buff.big(secret, 32);
}

var shamir = /*#__PURE__*/Object.freeze({
    __proto__: null,
    combine_shares: combine_shares,
    create_shares: create_shares
});

const noble = { secp: secp256k1, schnorr };

export { _const as CONST, Field, Point, assert, ecdh, get_config, hash, hd, keys, math, merkle, noble, proof, shamir, sig as signer, util };

import ChaCha from "./chacha.js";

export function getRandomBytes(n) {
    let array = new Uint8Array(n);

    if (typeof globalThis.crypto !== "undefined") { // Supported
        globalThis.crypto.getRandomValues(array);
    } else { // fallback
        for (let i = 0; i < n; i++) {
            array[i] = (Math.random() * 4294967296) >>> 0;
        }
    }

    // else { // WebCrypto
    //     console.log("ffjavascript/random.js: Not a browser?!");
    //     crypto.subtle.getRandomValues(array);
    // }
    return array;
}

export function getRandomSeed() {
    const arr = getRandomBytes(32);
    const arrV = new Uint32Array(arr.buffer);
    const seed = [];
    for (let i = 0; i < 8; i++) {
        seed.push(arrV[i]);
    }
    return seed;
}

let threadRng = null;

export function getThreadRng() {
    if (threadRng) return threadRng;
    threadRng = new ChaCha(getRandomSeed());
    return threadRng;
}

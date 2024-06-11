import CryptoJS from 'crypto-js';
const secretKey = 'ThisIsASecretKey123' || process.env.SECRET_KEY;
export function encrypt(id: number): string {
    const ciphertext = CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
    const replacedCiphertext = ciphertext.replace(/\//g, '_');
    return encodeURIComponent(replacedCiphertext);
}

export function decrypt(encryptedId: string): number {
    const replacedEncryptedId = encryptedId.replace(/_/g, '/');
    const decryptedText = decodeURIComponent(replacedEncryptedId);
    const bytes = CryptoJS.AES.decrypt(decryptedText, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return parseInt(originalText);
}

export function buildQueryStringActionTable(
    currentQuery: string,
    params: {
        field: string;
        value: string | number | boolean;
    }[],
): string {
    const queryParams = new URLSearchParams(currentQuery);
    params.forEach(param => {
        queryParams.set(param.field, String(param.value));
    });
    return queryParams.toString();
}
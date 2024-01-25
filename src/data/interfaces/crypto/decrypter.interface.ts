export interface Decrypter {
    decrypt(data: string): string | null;
}

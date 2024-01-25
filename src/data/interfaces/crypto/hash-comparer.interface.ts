export interface HashComparer {
    compare(data: string, hashedData: string): Promise<boolean>;
}

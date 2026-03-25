export type Person = {
    id: number;
    name: string;
    email: string;
    dateInvited: Date;
    status: 'registered' | 'invited';
    subRows?: Person[];
};
export declare function makeData(...lens: number[]): Person[];

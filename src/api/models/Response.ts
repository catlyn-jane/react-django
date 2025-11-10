import type { Student } from "./Student";

export type Res = {
    ok: boolean;
    errors?: [] | null;
    data?: Student[] | null; 
    message?: string;
    others?: [];
}
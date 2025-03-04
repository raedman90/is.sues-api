import { ZodError } from 'zod';

export class ValidationError extends Error {
    details: any;

    constructor(message: string, details?: any) { // ✅ Agora o segundo argumento é opcional
        super(message);
        this.name = "ValidationError";
        this.details = details || null; // Se não houver detalhes, define como `null`
    }
}

export class DatabaseError extends Error {
    details: any;

    constructor(message: string, details?: any) { // ✅ Correção aplicada aqui também
        super(message);
        this.name = "DatabaseError";
        this.details = details || null;
    }
}


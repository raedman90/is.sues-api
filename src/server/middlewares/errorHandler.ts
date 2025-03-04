import { Request, Response, NextFunction } from "express";
import { ValidationError, DatabaseError } from "../Error/CustomError";

export const errorHandler = (e: unknown, req: Request, res: Response, next: NextFunction) => { // ✅ Agora `e` tem tipo correto
    console.error("🚨 Erro capturado pelo errorHandler:", e);

    if (e instanceof ValidationError) {
        return res.status(400).json({ success: false, error: e.message, details: e.details });
    }

    if (e instanceof DatabaseError) {
        return res.status(500).json({ success: false, error: e.message, details: e.details });
    }

    return res.status(500).json({ success: false, error: "Erro interno do servidor" });
};

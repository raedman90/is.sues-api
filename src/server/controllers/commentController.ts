import { Request, Response, NextFunction } from "express";
import { addCommentToIssue, fetchCommentsForIssue, removeComment } from "../modules/comment/commentUseCase";

export const createCommentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { issueId } = req.params;
        const { authorId, content } = req.body;

        if (!authorId || !content) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const comment = await addCommentToIssue(issueId, authorId, content);
        return res.status(201).json(comment);
    } catch (error) {
        console.error("Erro ao criar comentário:", error);
        next(error);
    }
};

export const getCommentsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { issueId } = req.params;
        const comments = await fetchCommentsForIssue(issueId);
        return res.status(200).json(comments);
    } catch (error) {
        console.error("Erro ao buscar comentários:", error);
        next(error);
    }
};

export const deleteCommentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { commentId } = req.params;
        await removeComment(commentId);
        return res.status(200).json({ message: "Comentário removido com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar comentário:", error);
        next(error);
    }
};

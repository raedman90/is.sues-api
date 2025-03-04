import { Router } from "express";
import { createCommentController, getCommentsController, deleteCommentController } from "../controllers/commentController";

const router = Router();

// 🔹 Criar um comentário
router.post("/:issueId", createCommentController);

// 🔹 Buscar comentários de uma issue
router.get("/:issueId", getCommentsController);

// 🔹 Deletar um comentário
router.delete("/:commentId", deleteCommentController);

export default router;

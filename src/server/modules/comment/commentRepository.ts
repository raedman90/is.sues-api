import { prisma } from "../../database/repositoryClient";

export const createComment = async (issueId: string, authorId: string, content: string) => {
    return await prisma.comment.create({
        data: {
            issueId,
            authorId,
            content,
        },
    });
};

export const getCommentsByIssue = async (issueId: string) => {
    return await prisma.comment.findMany({
        where: { issueId },
        include: { author: true }, // 🔥 Inclui os dados do autor do comentário
        orderBy: { createdAt: "asc" }, // 🔥 Ordena os comentários por data
    });
};

export const deleteComment = async (commentId: string) => {
    return await prisma.comment.delete({
        where: { id: commentId },
    });
};

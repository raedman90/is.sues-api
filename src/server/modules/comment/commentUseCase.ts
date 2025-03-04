import { createComment, getCommentsByIssue, deleteComment } from "./commentRepository";

export const addCommentToIssue = async (issueId: string, authorId: string, content: string) => {
    if (!content.trim()) throw new Error("O comentário não pode estar vazio.");
    return await createComment(issueId, authorId, content);
};

export const fetchCommentsForIssue = async (issueId: string) => {
    return await getCommentsByIssue(issueId);
};

export const removeComment = async (commentId: string) => {
    return await deleteComment(commentId);
};

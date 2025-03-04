import { CreateIssueDto, UpdateIssueDto } from "../../dtos/IssueDTO"
import utilsCrypt from '../../utils/crypt'
import { createIssueSchema, issueIdSchema, updateIssueSchema } from '../../schamas/issuesSchema';
import { ValidationError, DatabaseError } from '../../Error/CustomError';
import { prisma } from "../../database/repositoryClient";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";



export class IssueUseCase{
  async createIssue(issueData: CreateIssueDto) {
    try {
        const validatedData = createIssueSchema.parse(issueData);

        const newIssue = await prisma.issue.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                department: { connect: { id: validatedData.departmentId } },
                author: { connect: { id: validatedData.authorId } }
            }
        });

        return newIssue;
    } catch (error) {
        if (error instanceof ZodError) {
            throw new ValidationError("Erro de validação", error);
        }
        throw new DatabaseError("Erro ao criar a issue.");
    }
}
  
  
  async getIssuesById(issueId: string) {
    try {
      const issue = await prisma.issue.findUnique({
        where: { id: issueId },
      });
  
      if (!issue) {
        throw new Error("Issue não encontrada.");
      }
  
      return issue;
    } catch (error) {
      throw new DatabaseError("Erro ao buscar a issue.");
    }
  }
  
  async updateIssue(issueData: UpdateIssueDto) {
    try {
        console.log("🛠️ [BACKEND] Recebendo dados para atualização:", issueData);

        const validatedData = updateIssueSchema.parse(issueData);
        console.log("✅ [BACKEND] Dados validados:", validatedData);

        const updateData: any = {
            ...(validatedData.title !== undefined && { title: validatedData.title }),
            ...(validatedData.description !== undefined && { description: validatedData.description }),
            ...(validatedData.status !== undefined && { status: validatedData.status }),
            ...(validatedData.isAssigned !== undefined && { isAssigned: validatedData.isAssigned }),
            ...(validatedData.assignedUserId !== undefined
                ? validatedData.assignedUserId
                    ? { assignedUser: { connect: { id: validatedData.assignedUserId } } } // ✅ Conecta um usuário à Issue
                    : { assignedUser: { disconnect: true } } // ✅ Remove o relacionamento (define como NULL)
                : {}),
            ...(validatedData.departmentId !== undefined && { department: { connect: { id: validatedData.departmentId } } }),
            ...(validatedData.authorId !== undefined && { author: { connect: { id: validatedData.authorId } } })
        };

        console.log("📤 [BACKEND] Enviando update para Prisma:", updateData);

        const updatedIssue = await prisma.issue.update({
            where: { id: validatedData.id },
            data: updateData,
        });

        console.log("✅ [BACKEND] Issue atualizada com sucesso:", updatedIssue);
        return updatedIssue;
    } catch (error: unknown) {
        console.error("❌ [BACKEND] Erro ao atualizar a issue:", error);

        if (error instanceof ZodError) {
            throw new ValidationError("Erro de validação", error.errors);
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error("🔍 [BACKEND] Código de erro Prisma:", error.code);
            throw new DatabaseError("Erro no banco de dados");
        }

        throw new DatabaseError("Erro desconhecido ao atualizar a issue.");
    }
}


    async deleteIssue({ id }: { id: string }) {
        try {
            const validatedData = issueIdSchema.parse({ id });
            const deletedIssue = await prisma.issue.delete({
                where: { id: validatedData.id },
            });

            return deletedIssue;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError("Erro de validação", error);
            }
            throw new Error("Erro ao deletar a issue.");
        }
    }
    async listIssues({}) {
      try {
          const allIssues = await prisma.issue.findMany()
          return allIssues
      } catch (error) {
          throw new Error("Erro ao buscar issues.");
      }
  }
    
    
}
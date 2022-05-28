import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6f87ba4c60d8de",
      pass: "2584b55e776fa6"
    }
  });

routes.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const submitFeedbackUseCase = new  SubmitFeedbackUseCase(
        prismaFeedbacksRepository
    )

    await submitFeedbackUseCase.execute({
        type, 
        comment,
        screenshot,
    });

    // await transport.sendMail({
    //     from: "Equipe Feedget <exemplo@feedget.com>",
    //     to: "Maurício de Carvalho <mauriciocr223@gmail.com>",
    //     subject: "Novo feedback",
    //     html: [
    //         `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
    //         `<p>Tipo do feedback: ${type}<p/>`,
    //         `<p>Comentário: ${comment}<p/>`,
    //         `<div/>`
    //     ].join("\n")
    // });

    return res.status(201).send();
});
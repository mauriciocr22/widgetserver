import express from "express";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6f87ba4c60d8de",
      pass: "2584b55e776fa6"
    }
  });

app.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot
        }
    });

    await transport.sendMail({
        from: "Equipe Feedget <exemplo@feedget.com>",
        to: "Maurício de Carvalho <mauriciocr223@gmail.com>",
        subject: "Novo feedback",
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback: ${type}<p/>`,
            `<p>Comentário: ${comment}<p/>`,
            `<div/>`
        ].join("\n")
    });

    return res.status(201).json({ data: feedback });
});

app.listen(3333, () =>{
    console.log("HTTP Server running!");
});
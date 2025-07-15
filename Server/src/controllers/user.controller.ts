import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const handleUserRegistration = async (req: Request, res: Response) => {
    const { email, name , password} = req.body;
    if(!email || !name || !password) {
        return res.status(400).json({ error: "Email and name are required" });
    }

    try {
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password
            }
        })

        return res.status(201).json({
            message: "User created successfully",
            user 
        });

    } catch (error: any) {
        console.log("Error creating event:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


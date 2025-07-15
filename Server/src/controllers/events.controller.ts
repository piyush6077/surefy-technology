import { Request, Response } from "express";

export const handleCreateEvents = async (req: Request, res: Response): Promise<any> => {
    const { title, description, date } = req.body;
}
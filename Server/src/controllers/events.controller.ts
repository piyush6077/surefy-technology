import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const handleCreateEvents = async (req: Request, res: Response): Promise<any> => {
    const { title, dateTime , location , capacity } = req.body;
    if(!title || !dateTime || !location || !capacity) {
        return res.status(400).json({ error: "All fields are required to create an event" });
    }
    if(capacity > 1000){
        return res.status(400).json({ error: "Capacity cannot exceed 1000" });
    }

    try {
        const event = await prisma.event.create({
            data: {
                title,
                dateTime,
                location,
                capacity
            }
        });

        return res.status(201).json({
            message: "Event created successfully",
            event
        });
    } catch (error: any) {
        console.log("Error creating event:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const handleGetEvents = async (req: Request, res: Response): Promise<any> => {
    try {
        const events = await prisma.event.findMany();
        return res.status(200).json(events);
    } catch (error: any) {
        console.log("Error fetching events:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const handleGetEventById = async (req: Request, res: Response): Promise<any> => {
    const {id} = req.params;
    try {
        const event = await prisma.event.findUnique({
            where: { id: id }
        })
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        return res.status(200).json(event);
    } catch (error) {
        console.log("Error fetching event by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const handleGetFutureEvents = async (req: Request, res: Response): Promise<any> => {
    try {
        const currentDate = new Date();
        const futureEvents = await prisma.event.findMany({
            where: {
                dateTime: {
                    gt: currentDate
                }
            }
        });
        return res.status(200).json(futureEvents);
    } catch (error: any) {
        console.log("Error fetching future events:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const handleGetEventStats = async (req: Request, res: Response): Promise<any> => {
    try {
        const totalEvents = await prisma.event.count();
        const remainingCapacity = await prisma.event.aggregate({
            _sum: {
                capacity: true
            }
        });
        const percentageOfCapacityUsed = (remainingCapacity._sum.capacity || 0) / totalEvents * 100;
        return res.status(200).json({
            totalEvents,
            remainingCapacity: remainingCapacity._sum.capacity || 0,
            percentageOfCapacityUsed: percentageOfCapacityUsed.toFixed(2) + "%"
        });
    } catch (error: any) {
        console.log("Error fetching event stats:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const handleDeleteEvent = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    try {
        const event = await prisma.event.delete({
            where: { id: id }
        });
        return res.status(200).json({
            message: "Event deleted successfully",
            event
        });
    } catch (error: any) {
        console.log("Error deleting event:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
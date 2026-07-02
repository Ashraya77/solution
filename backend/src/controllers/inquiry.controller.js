import prisma from "../prisma.js";

export const createInquiry = async (req, res)=>{
    try{
        const inquiry = await prisma.inquiry.create({
            data: req.body,
        });

        res.status(201).json(inquiry);

    }catch(error){
        res.status(500).json({
            message: "Failed to create inquiry", error
        })
    }
}



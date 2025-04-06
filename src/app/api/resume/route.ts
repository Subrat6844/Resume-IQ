import { connectDb } from "@/lib/connectDB";
import Resume from "@/models/Resume";
import { currentUser } from "@clerk/nextjs/server";


export async function GET(req:Request){
    try {
        await connectDb();
        const user = await currentUser();
        if(!user){ 
            return Response.json({success:false,message:"Unauthorized"},{status:401})
        }
        const resumes = await Resume.find({
            email: user.emailAddresses[0].emailAddress
        })
        return Response.json({success:true,data:resumes},{status:200})
    } catch (error) {
        return Response.json({success:false,message:"Server Error"},{status:500})   
    }
}
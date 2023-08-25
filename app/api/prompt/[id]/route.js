import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const GET = async (req, {params})=>{
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new ReportingObserver("Prompt not found", {status:404});
        return new Response(JSON.stringify(prompt), {status:200});
    } catch (error) {
        return new Response('Failes to get prompt', {
            status:500
        });
    }
}
export const PATCH = async (req, {params})=>{
    const {prompt, tag} = await req.json();
    try {
        await connectToDB();
        const existing = await Prompt.findById(params.id);
        if(!existing) return new ReportingObserver("Prompt not found", {status:404});
        existing.prompt = prompt;
        existing.tag = tag;
        await existing.save();
        return new Response(JSON.stringify(existing), {status:200});

    } catch (error) {
        return new Response('Failes to update prompt', {
            status:500
        });
    }
}

export const DELETE = async (req, {params})=>{
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id)
        return new Response('Prompt deleted successfully', {status:200});


    } catch (error) {
        return new Response('Failes to delte prompt', {
            status:500
        });
    }
}
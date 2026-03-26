import fs from "fs"
const { PDFParse } = require('pdf-parse');

export const extractTextFromPDF = async (filePath: string)=>{
    const buffer = fs.readFileSync(filePath);
    const data = await new PDFParse(buffer)
    return data.text
}
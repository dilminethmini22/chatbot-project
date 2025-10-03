import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCp-ww4Ip2sNPm4Nq1cG2Ri5EoVh_JtLDE";

const genAI = new GoogleGenerativeAI(API_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

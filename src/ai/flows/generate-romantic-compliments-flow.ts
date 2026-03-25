'use server';
/**
 * @fileOverview A Genkit flow for generating unique and heartfelt romantic compliments.
 *
 * - generateRomanticCompliment - A function that handles the compliment generation process.
 * - GenerateRomanticComplimentInput - The input type for the generateRomanticCompliment function.
 * - GenerateRomanticComplimentOutput - The return type for the generateRomanticCompliment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRomanticComplimentInputSchema = z.object({
  name: z.string().describe("The name of the person to compliment."),
});
export type GenerateRomanticComplimentInput = z.infer<typeof GenerateRomanticComplimentInputSchema>;

const GenerateRomanticComplimentOutputSchema = z.object({
  compliment: z.string().describe("A unique and heartfelt romantic compliment."),
});
export type GenerateRomanticComplimentOutput = z.infer<typeof GenerateRomanticComplimentOutputSchema>;

export async function generateRomanticCompliment(input: GenerateRomanticComplimentInput): Promise<GenerateRomanticComplimentOutput> {
  return generateRomanticComplimentsFlow(input);
}

const generateRomanticComplimentsPrompt = ai.definePrompt({
  name: 'generateRomanticComplimentsPrompt',
  input: {schema: GenerateRomanticComplimentInputSchema},
  output: {schema: GenerateRomanticComplimentOutputSchema},
  prompt: `You are a master of crafting unique, heartfelt, and romantic compliments. Generate a single, short, and sweet compliment for someone named {{{name}}}.`,
});

const generateRomanticComplimentsFlow = ai.defineFlow(
  {
    name: 'generateRomanticComplimentsFlow',
    inputSchema: GenerateRomanticComplimentInputSchema,
    outputSchema: GenerateRomanticComplimentOutputSchema,
  },
  async input => {
    const {output} = await generateRomanticComplimentsPrompt(input);
    return output!;
  }
);

'use server';
/**
 * @fileOverview AI chatbot flow for answering student study questions.
 *
 * - answerStudyQuestion - A function that takes a study question as input and returns an answer.
 * - StudyQuestionInput - The input type for the answerStudyQuestion function.
 * - StudyQuestionOutput - The return type for the answerStudyQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudyQuestionInputSchema = z.object({
  question: z.string().describe('The study question asked by the student.'),
});
export type StudyQuestionInput = z.infer<typeof StudyQuestionInputSchema>;

const StudyQuestionOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the study question.'),
});
export type StudyQuestionOutput = z.infer<typeof StudyQuestionOutputSchema>;

export async function answerStudyQuestion(input: StudyQuestionInput): Promise<StudyQuestionOutput> {
  return answerStudyQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studyQuestionPrompt',
  input: {schema: StudyQuestionInputSchema},
  output: {schema: StudyQuestionOutputSchema},
  prompt: `You are a helpful AI assistant that answers study-related questions. Provide clear, concise, and accurate explanations, summaries, and syllabus-based answers to help students understand the course material.

Question: {{{question}}}`,
});

const answerStudyQuestionFlow = ai.defineFlow(
  {
    name: 'answerStudyQuestionFlow',
    inputSchema: StudyQuestionInputSchema,
    outputSchema: StudyQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

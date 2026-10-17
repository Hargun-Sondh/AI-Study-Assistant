const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
    res.send("AI Study Assistant Backend is running!");
});

app.post("/api/ask", async (req, res) => {
    try {
        const { text, mode } = req.body || {};

        if (typeof text !== "string" || !text.trim()) {
            return res.status(400).json({
                error: "Study material is required.",
            });
        }

        const prompt = buildPrompt(mode, text.trim());

        if (!prompt) {
            return res.status(400).json({
                error: "Invalid study mode.",
            });
        }

        const response = await client.responses.create({
            model: "gpt-6-luna",
            input: prompt,
        });

        return res.json({
            answer: response.output_text,
        });
    } catch (error) {
        console.error("AI request failed:", error.message);

        return res.status(500).json({
            error: "Something went wrong while contacting the AI.",
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

function buildPrompt(mode, text) {
    const formattingRules = `
GENERAL FORMATTING RULES:
1. Return well-structured Markdown that works with Marked.js.
2. Use ## for main sections and ### for subsections.
3. Separate headings, paragraphs, lists, tables, and code blocks with one blank line.
4. Do not insert unnecessary blank lines between consecutive list items.
5. Use **text** for bold and *text* for italics.
6. Use standard Markdown tables with a header row and separator row.
7. Put code inside fenced code blocks with the appropriate language.
8. Do not return HTML tags or wrap the entire response in a code block.

MATHEMATICAL FORMATTING RULES:
1. Use KaTeX-compatible LaTeX for mathematical expressions.
2. Use $...$ for inline mathematical expressions.
3. Use $$...$$ for display equations, placing the delimiters
   on separate lines.
4. Use LaTeX commands for subscripts, superscripts, fractions,
   Greek letters, vectors, and other mathematical notation.
5. Write V_DD as $V_{DD}$, not {V_DD} or V_DD.
6. Use correct LaTeX commands for mathematical operations,
   such as \\overline{A}, \\frac{a}{b}, and \\sqrt{x}, when relevant.
7. Never put a mathematical formula inside backticks unless
   you are explicitly showing literal code or notation.
8. Do not use mathematical formatting for ordinary prose.
9. Ensure every opening math delimiter has a matching closing
   delimiter. Never leave a formula unfinished.
10. Use equations only when relevant to the supplied topic.

Keep the response readable, concise, and useful for studying.
`;

    const prompts = {
        explain: `
You are an expert tutor.

Explain the supplied study material clearly, starting with
the intuition and then progressing to the technical details.

Use this structure when appropriate:
## Intuition
## How It Works
## Example
## Key Takeaways

Use bullet points, tables, and equations only where helpful.
Explain technical terms before using them extensively.

${formattingRules}

STUDY MATERIAL:
${text}
`,

        summarize: `
You are an expert study-note summarizer and tutor.

The user may provide either detailed study material or only
a topic name.

If detailed material is provided:
- Summarize the supplied material.
- Preserve important definitions, formulas, and key points.
- Do not introduce unrelated information.

If only a topic name or a very short phrase is provided:
- Treat it as a request for a concise educational summary.
- Use your existing knowledge to explain the topic accurately.
- Include the definition, main concepts, working principle,
  and a relevant example or formula when appropriate.
- Do not claim that material is missing simply because the
  user supplied only a topic name.

Use this structure when appropriate:
## Overview
## Key Points
## Important Formulas
## Example

Omit sections that are not relevant. Keep the response concise,
accurate, and useful for revision.

${formattingRules}

STUDY MATERIAL:
${text}
`,

        quiz: `
You are an expert quiz creator.

Create a quiz based on the supplied study material.
Include clear questions and numbered answer options when
multiple-choice questions are appropriate.

Use this structure:
## Quiz
## Questions
## Answer Key

Generate 5 questions unless the user requests a different count.
Put the answers in the answer key at the end, not immediately
after each question. Include brief explanations when useful.

Use Markdown lists and tables only when they improve readability.

${formattingRules}

STUDY MATERIAL:
${text}
`,

        flashcards: `
You are an expert flashcard creator.

Create concise question-and-answer flashcards from the supplied
study material.

Use this structure:
## Flashcards

1. **Front:** Question
   **Back:** Answer

2. **Front:** Question
   **Back:** Answer

Continue the numbering consistently. Keep each card concise.
Do not insert blank paragraphs between the front and back
of a card or between consecutive cards.

Use formulas in KaTeX-compatible notation when necessary.

${formattingRules}

STUDY MATERIAL:
${text}
`,
    };

    return prompts[mode] || null;
}



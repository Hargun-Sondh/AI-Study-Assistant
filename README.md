# AI Study Assistant

An AI-powered study assistant built with HTML, CSS, JavaScript, Node.js, Express, and the OpenAI API. It helps students understand study material, create concise revision notes, generate quizzes, and prepare flashcards through a simple, responsive web interface.

## Live Demo

**[Try AI Study Assistant](https://ai-study-assistant-two-sigma.vercel.app/)**

## Features

- **Explain:** Understand concepts through structured explanations, examples, and key takeaways.
- **Summarize:** Convert study material into concise notes for revision.
- **Quiz:** Generate practice questions with answer keys and explanations.
- **Flashcards:** Create question-and-answer flashcards for active recall.
- **AI-powered responses:** Generate study content dynamically using the OpenAI API.
- **Mathematical rendering:** Display mathematical expressions using KaTeX.
- **Markdown rendering:** Present AI responses with structured headings, lists, tables, and code blocks.
- **Input validation:** Prevent requests when the study material is empty.
- **Responsive interface:** Use the application across desktop and mobile screens.
- **Secure API configuration:** Store the API key in an environment variable rather than exposing it in frontend code.

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Web page structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Frontend logic and API requests |
| Node.js | Backend runtime |
| Express.js | Backend API and request handling |
| OpenAI API | AI-generated study content |
| Marked.js | Markdown-to-HTML rendering |
| DOMPurify | Sanitizing rendered HTML |
| KaTeX | Mathematical expression rendering |
| Vercel | Deployment and hosting |
| Git & GitHub | Version control and source code management |

## How It Works

1. The user enters study material or a topic.
2. The user selects a mode: Explain, Summarize, Quiz, or Flashcards.
3. The frontend sends a POST request to the Express backend.
4. The backend validates the input and constructs a prompt based on the selected mode.
5. The backend sends the prompt to the OpenAI API.
6. The generated response is returned to the frontend and rendered with Markdown and mathematical formatting where applicable.

## Project Structure

```text
AI-Study-Assistant/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
├── package-lock.json
└── .gitignore
```

The `.env` file is used locally for environment variables and is excluded from version control.

## Run Locally

### Prerequisites

- Node.js and npm
- An OpenAI API key

### 1. Clone the repository

```bash
git clone https://github.com/Hargun-Sondh/AI-Study-Assistant.git
cd AI-Study-Assistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=your_openai_api_key
```

Replace `your_openai_api_key` with your own API key. Never commit your `.env` file or expose your API key in frontend code.

### 4. Start the application

```bash
npm start
```

Open `http://localhost:3000` in your browser.

## Deployment

The application is deployed on Vercel. The production environment uses a securely configured `OPENAI_API_KEY` environment variable.

**Live application:** https://ai-study-assistant-two-sigma.vercel.app/

## Future Improvements

- Save generated notes and flashcards.
- Allow users to download study materials.
- Add difficulty levels and customizable quiz lengths.
- Introduce topic-based organization and study history.
- Add support for uploading PDFs and other study documents.

## Author

**Hargun Sondh**

- GitHub: [Hargun-Sondh](https://github.com/Hargun-Sondh)
- Project Repository: [AI-Study-Assistant](https://github.com/Hargun-Sondh/AI-Study-Assistant)
- Live Demo: [AI Study Assistant](https://ai-study-assistant-two-sigma.vercel.app/)

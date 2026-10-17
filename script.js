const API_BASE_URL = "http://localhost:3000";

const button = document.getElementById("askBtn");
const input = document.getElementById("question");
const result = document.getElementById("result");
const modeInput = document.getElementById("mode");

button.addEventListener("click", async () => {
    const que = input.value.trim();
    const mode = modeInput.value;

    if (!que) {
        result.textContent = "Please enter some study material.";
        return;
    }

    button.disabled = true;
    button.textContent = "Generating...";
    result.textContent = "Thinking...";

    try {
        const response = await fetch(`${API_BASE_URL}/api/ask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: que,
                mode: mode
            })
        });

        let data;

        try {
            data = await response.json();
        } catch {
            throw new Error("The server returned an invalid response.");
        }

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        result.innerHTML = DOMPurify.sanitize(marked.parse(data.answer));

        renderMathInElement(result, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false },
                { left: "\\[", right: "\\]", display: true },
                { left: "\\(", right: "\\)", display: false }
            ],
            throwOnError: false
        });
    } catch (error) {
        console.error("Study assistant request failed:", error);
        result.textContent = "Something went wrong. Please try again.";
    } finally {
        button.disabled = false;
        button.textContent = "Generate";
    }
});

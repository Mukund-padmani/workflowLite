const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { HfInference } = require('@huggingface/inference');

const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const HISTORY_FILE = path.join(__dirname, 'history.json');
const loadHistory = () => {
    if (!fs.existsSync(HISTORY_FILE)) return [];
    try {
        const data = fs.readFileSync(HISTORY_FILE);
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading history:", err);
        return [];
    }
};

const saveRun = (runData) => {
    const history = loadHistory();
    history.unshift(runData);
    const trimmedHistory = history.slice(0, 5);
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(trimmedHistory, null, 2));
};

const processStep = async (stepType, input) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    switch (stepType.toLowerCase()) {
        case 'clean text':
            return input.replace(/[^a-zA-Z0-9\s.,!?]/g, '').trim();
        case 'summarize':
            const sentences = input.match(/[^\.!\?]+[\.!\?]+/g) || [input];
            return sentences.slice(0, 2).join(' ') + (sentences.length > 2 ? '...' : '');
        case 'extract key points':
            const words = input.split(/\s+/);
            const keyPoints = words.filter(w => w.length > 6).slice(0, 5);
            return keyPoints.length > 0 ? "Key Points: " + keyPoints.join(', ') : "No key points found.";
        case 'tag category':
            const categories = ['Business', 'Technology', 'Personal', 'Science', 'Creative'];
            const index = input.length % categories.length;
            return `Category: ${categories[index]}`;
        default:
            return `Unknown step: ${stepType}`;
    }
};

app.get('/api/status', (req, res) => {
    const dbStatus = fs.existsSync(HISTORY_FILE) || fs.existsSync(path.dirname(HISTORY_FILE)) ? 'Healthy' : 'Error';
    const llmStatus = 'Connected (Simulated)';

    res.json({
        backend: 'Healthy',
        database: dbStatus,
        llm: llmStatus,
        timestamp: new Date().toISOString()
    });
});

const processStepLlama = async (stepType, input) => {
    try {
        const response = await hf.chatCompletion({
            model: 'meta-llama/Llama-3.1-8B-Instruct',
            messages: [
                {
                    role: "system",
                    content: `You are a text processing tool. Perform the operation: "${stepType}". Output ONLY the result. No conversational filler.`
                },
                {
                    role: "user",
                    content: `"${input}"`
                }
            ],
            max_tokens: 500,
            temperature: 0.1
        });

        const output = response.choices[0].message.content.trim();
        console.log("Llama Output:", output);
        return output;
    } catch (error) {
        console.error("Llama API Error:", error.message);
        throw new Error("Failed to process with Llama model.");
    }
};

app.post('/api/workflow/run', async (req, res) => {
    const { steps, input } = req.body;

    if (!steps || !Array.isArray(steps) || steps.length === 0) {
        return res.status(400).json({ error: 'Invalid steps provided.' });
    }
    if (!input || typeof input !== 'string' || input.trim() === '') {
        return res.status(400).json({ error: 'Input text is required.' });
    }

    const runResults = [];
    let currentInput = input;
    const useLlama = !!process.env.HUGGING_FACE_TOKEN;

    try {
        for (const step of steps) {
            let output;
            if (useLlama) {
                console.log(`Processing step "${step}" with Llama 3.1...`);
                try {
                    output = await processStepLlama(step, currentInput);
                } catch (e) {
                    console.log("Llama failed, falling back to simulation.");
                    output = await processStep(step, currentInput);
                }
            } else {
                console.log(`Processing step "${step}" with Simulation...`);
                output = await processStep(step, currentInput);
            }

            runResults.push({ step, output });
            currentInput = output;
        }

        const runData = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            originalInput: input,
            results: runResults,
            engine: useLlama ? 'Llama-3.1-8B' : 'Simulated'
        };

        saveRun(runData);
        res.json(runData);

    } catch (error) {
        console.error("Workflow Error:", error);
        res.status(500).json({ error: 'Workflow execution failed.' });
    }
});

app.get('/api/workflow/history', (req, res) => {
    const history = loadHistory();
    res.json(history);
});

const clientBuildPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
} else {
    console.log("Client build not found. Only API is accessible.");
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

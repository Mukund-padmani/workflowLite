const axios = require('axios');

// ---------------------------------------------------------
// OPTIONAL: Real LLM Integration
// To use this, you would need to:
// 1. Get an API Key from OpenAI or Google (Gemini)
// 2. Set it in a .env file as LLM_API_KEY
// ---------------------------------------------------------

const LLM_PROVIDER = 'simulated'; // Options: 'simulated', 'openai', 'gemini'
const API_KEY = process.env.LLM_API_KEY;

const processWithRealLLM = async (stepType, input) => {
    if (!API_KEY) throw new Error("API Key is missing!");

    // Example structure for OpenAI call (commented out)
    /*
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user", 
            content: `Perform the following task on this text: "${stepType}". Text: "${input}"`
        }]
    }, { headers: { Authorization: `Bearer ${API_KEY}` } });
    return response.data.choices[0].message.content;
    */

    return "Real API call not enabled yet.";
};

module.exports = { processWithRealLLM };

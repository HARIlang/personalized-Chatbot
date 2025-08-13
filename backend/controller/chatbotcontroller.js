const express = require("express");
const axios = require("axios");
require("dotenv").config();

const groq_api_key = process.env.groq_api_key;

// ✅ Personal info to be included in prompt
const personalInfo = `
Full Name: Hariharan  
Location: Puducherry, India  
Phone: 7339590173  
LinkedIn: https://linkedin.com/in/haridev26  
GitHub: https://github.com/HARIlang  
Email: amarhari26122002@gmail.com  

🔹 Professional Summary:  
Hariharan is a MERN Stack Developer with internship experience at Agilesoftlabs, Puducherry.  
He’s skilled in building full-stack apps using React.js, Tailwind CSS, Node.js, Express, and MongoDB.  
Completed MCA in 2025 from Sri Manakula Vinayagar Engineering College.  

🔹 Technical Skills:  
- Frontend: React.js, Next.js, Redux Toolkit, Tailwind CSS, HTML, CSS, JavaScript  
- Backend: Node.js, Express.js  
- Database: MongoDB, SQL  
- UI Libraries: Material UI (MUI), Bootstrap  
- Animation & Effects: Framer Motion, Particles.js  
- Data Visualization: Chart.js, Recharts, React Chart libraries  
- 3D Rendering: Three.js  
- Tools: Git, GitHub, Postman, VS Code, Vite  
- APIs: REST, OpenAI/Groq, OpenWeatherMap, ClipDrop  

🔹 Projects:  
- Secure Walk – Travel route suggestion app using crime zone data + OpenStreetMap API  
- Gemini Clone – AI chatbot clone using Gemini 1.5 Flash API  
- DreamSnap – Prompt to image generator with ClipDrop API  
- TempTracker-t – Weather app using OpenWeatherMap API and React Gauge  
- **TempTracker-t Pro** – Advanced weather app with 12-day forecast and 45 years of historical climate data  
- **Strong Password Generator** – Generates secure, customizable passwords using React  
- WhatsApp UI Clone – Pixel-perfect clone of WhatsApp Web frontend  

🔹 Education:  
- B.Sc. Computer Science – Saradha Gangadharan College  
- MCA – Sri Manakula Vinayagar Engineering College (Batch of 2025)  

🔹 Languages:  
- English (Fluent), Tamil (Native)  

🔹 Strengths:  
- Quick learner, problem solver, team player, and detail-oriented developer  
`;


const chatBot = async (req, res) => {
  const { message } = req.body;
  const lowerCaseMessage = message.toLowerCase();

  // ✅ Manually respond to contact queries
  const contactKeywords = [
    "contact",
    "phone",
    "number",
    "linkedin",
    "github",
    "how can i reach",
    "call you",
    "reach you",
    "connect with you",
    "email",
    "whatsapp"
  ];

  const shouldManuallyReply = contactKeywords.some(keyword =>
    lowerCaseMessage.includes(keyword)
  );

  if (shouldManuallyReply) {
    return res.json({
     reply: `
📞 Phone: [7339590173](tel:+917339590173)  
🔗 LinkedIn: [linkedin.com/in/haridev26](https://linkedin.com/in/haridev26)  
💻 GitHub: [github.com/HARIlang](https://github.com/HARIlang)  
💬 WhatsApp: [Chat on WhatsApp](https://wa.me/917339590173?text=Hello%20Hariharan%2C%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect%21)  
📬 Email: [hariharan.dev26@gmail.com](mailto:hariharan.dev26@gmail.com)  

`.trim()
    });
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: `
You are an intelligent, friendly AI assistant that talks naturally like a real developer.  
Your role is to answer questions about Hariharan, a MERN Stack Developer, using a confident, clear tone.  
Do not say things like "Based on the information" or "It appears that".  
Keep responses short unless asked for more details. Use Markdown formatting where relevant.  
Avoid repetition and overly generic statements.
`.trim()
          },
          { role: "user", content: `About me:\n${personalInfo}` },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${groq_api_key}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Groq API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch reply from AI." });
  }
};

module.exports = chatBot;

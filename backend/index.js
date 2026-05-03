import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the built frontend
app.use(express.static(join(__dirname, '../public')));

const getAIResponse = (message) => {
  // Local response without API
  const responses = {
    "hello": "Hello! How can I help you with voting information today?",
    "what is voting": "Voting is the process by which citizens choose their representatives or decide on issues. In the US, it's a fundamental right for eligible citizens.",
    "how to register": "To register to vote, you need to be a US citizen, at least 18 years old, and provide identification. Check your state's election website for specific requirements.",
    "emv ballot": "EMV stands for Electronic Voting Machine. These machines allow voters to cast their ballots electronically. They typically have a touchscreen interface where you select your choices, and some provide audio assistance for accessibility. Always verify your selections before submitting.",
    "ballot": "A ballot is the document used to cast your vote. It can be paper-based or electronic. Make sure to review all selections carefully before submitting, as some states don't allow changes after submission.",
    "polling place": "Your polling place is where you go to vote. You can find your assigned polling location using your state's election website or by calling your local election office. Bring a valid ID if required.",
    "id": "Most states require some form of identification to vote. This can include a driver's license, passport, or other government-issued ID. Check your state's specific requirements.",
    "absentee": "Absentee voting allows you to vote by mail if you can't make it to the polls. You typically need to request an absentee ballot in advance. Deadlines vary by state.",
    "mail-in": "Mail-in voting is similar to absentee voting. You receive your ballot by mail, fill it out, and return it by the deadline. Some states send mail-in ballots to all registered voters automatically.",
    "early voting": "Early voting lets you cast your ballot before Election Day at designated locations. This is available in most states for a period before the election.",
    "election day": "Election Day is when polls are open for in-person voting. Hours vary by state but are typically from 7 AM to 8 PM local time. Check your local election office for exact times.",
    "provisional ballot": "A provisional ballot is used when there's a question about your eligibility to vote. You cast a regular ballot, but it's held until officials verify your registration. Results are counted once eligibility is confirmed.",
    "military": "Military and overseas voters can vote absentee. The Federal Voting Assistance Program (FVAP) helps service members register and vote. Contact your local election office for assistance.",
    "disability": "Voters with disabilities have rights to accessible voting. This may include curbside voting, accessible machines, or assistance from election workers. Contact your local election office to request accommodations.",
    "what to bring": "Bring a valid photo ID (if required in your state), proof of address, and your sample ballot if you have one. Some states require additional documentation for first-time voters.",
    "district": "Your voting district determines which candidates and issues appear on your ballot. You can find your district information on your state's election website or by contacting your local election office.",
    "primary": "Primary elections allow voters to choose candidates for the general election. These are typically partisan and help determine who will represent each party.",
    "general election": "The general election is the main election where voters choose their representatives and decide on ballot measures. It usually occurs in November.",
    "runoff": "A runoff election occurs when no candidate receives a majority of votes in the initial election. The top two candidates compete in a second round.",
    "recount": "A recount involves re-counting votes to ensure accuracy. This can be requested by candidates or automatically triggered in close races.",
    "security": "Election security measures include voter ID requirements, secure voting machines, and verification processes to prevent fraud and ensure integrity.",
    "youth": "Young voters (18-29) can register and vote once they turn 18. Many states allow pre-registration for 16-17 year olds. Your vote matters and can influence future policies.",
    "felon": "Felon voting rights vary by state. Some states restore rights automatically after sentence completion, while others require additional steps. Check your state's laws.",
    "suppression": "Voter suppression refers to tactics that make it harder for eligible voters to participate. This is illegal and includes misinformation, restrictive ID laws, or limiting polling places.",
    "sample ballot": "A sample ballot shows how your actual ballot will look. It helps you prepare and understand the voting process. Request one from your local election office.",
    "volunteer": "Election volunteers help at polling places, assist voters, and ensure smooth operations. Contact your local election office if you're interested in volunteering.",
    "default": "I'm here to help with voting and election questions. What would you like to know about registering, voting methods, or election procedures?"
  };

  const lowerMessage = message.toLowerCase();
  for (const key in responses) {
    if (lowerMessage.includes(key)) {
      return responses[key];
    }
  }
  return responses.default;
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to VotePath Backend API' });
});

// API routes for voting data
app.get('/api/polling-stations', (req, res) => {
  // Placeholder for polling stations data
  res.json([
    { id: 1, name: 'Station 1', address: '123 Main St', state: 'CA' },
    { id: 2, name: 'Station 2', address: '456 Oak Ave', state: 'CA' }
  ]);
});

app.get('/api/voting-plan', (req, res) => {
  // Placeholder for voting plan
  res.json({
    steps: [
      'Check voter registration',
      'Find polling station',
      'Prepare identification',
      'Vote on election day'
    ]
  });
});

// AI endpoint
app.post('/api/ai', (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const response = getAIResponse(message);
    res.json({ response });
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

// Serve frontend for all unmatched routes (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
import mongoose from "mongoose";
import dotenv from "dotenv";
import Quiz from "./Models/QuizSchema.js";

dotenv.config();

const sampleQuizzes = [
  {
    title: "React Basics",
    category: "React",
    difficulty: "Easy",
    estimatedTime: 15,
    questions: [
      {
        question: "Which hook is used for state management in React?",
        options: ["useEffect", "useState", "useRef", "useReducer"],
        correctAnswer: "useState",
        explanation: "useState is the primary hook for managing state in functional components."
      },
      {
        question: "What is JSX?",
        options: ["A JavaScript library", "A syntax extension for JavaScript", "A CSS framework", "A database"],
        correctAnswer: "A syntax extension for JavaScript",
        explanation: "JSX is a syntax extension that allows you to write HTML-like code in JavaScript."
      },
      {
        question: "What is the virtual DOM?",
        options: ["A copy of the real DOM", "A database", "A CSS property", "A JavaScript function"],
        correctAnswer: "A copy of the real DOM",
        explanation: "The virtual DOM is a lightweight copy of the real DOM that React uses for efficient updates."
      },
      {
        question: "How do you pass data to a child component?",
        options: ["Using state", "Using props", "Using context", "Using refs"],
        correctAnswer: "Using props",
        explanation: "Props are used to pass data from parent to child components."
      },
      {
        question: "What does useEffect do?",
        options: ["Manages state", "Handles side effects", "Creates components", "Styles components"],
        correctAnswer: "Handles side effects",
        explanation: "useEffect is used to handle side effects like data fetching, subscriptions, etc."
      }
    ]
  },
  {
    title: "JavaScript Advanced",
    category: "JS",
    difficulty: "Medium",
    estimatedTime: 25,
    questions: [
      {
        question: "What does the '===' operator check?",
        options: ["Type only", "Value only", "Value and Type", "None"],
        correctAnswer: "Value and Type",
        explanation: "The === operator checks both value and type for equality."
      },
      {
        question: "What is a closure in JavaScript?",
        options: ["A function inside a function", "A way to close the browser", "A type of loop", "A CSS property"],
        correctAnswer: "A function inside a function",
        explanation: "A closure is a function that has access to variables in its outer scope."
      },
      {
        question: "What is the purpose of 'async/await'?",
        options: ["To handle promises", "To create loops", "To declare variables", "To style elements"],
        correctAnswer: "To handle promises",
        explanation: "async/await is syntax for working with promises in a more synchronous-looking way."
      },
      {
        question: "What is event bubbling?",
        options: ["Events propagate up the DOM tree", "Events are deleted", "Events are created", "Events are styled"],
        correctAnswer: "Events propagate up the DOM tree",
        explanation: "Event bubbling means events propagate from the target element up to the root."
      },
      {
        question: "What is the spread operator?",
        options: ["...", "---", "===", "+++"],
        correctAnswer: "...",
        explanation: "The spread operator (...) is used to expand arrays or objects."
      }
    ]
  },
  {
    title: "Python Data Structures",
    category: "Python",
    difficulty: "Hard",
    estimatedTime: 35,
    questions: [
      {
        question: "Which data structure uses LIFO?",
        options: ["Queue", "Stack", "List", "Dictionary"],
        correctAnswer: "Stack",
        explanation: "Stack follows Last In First Out (LIFO) principle."
      },
      {
        question: "What is the time complexity of list.append()?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: "O(1)",
        explanation: "Appending to a Python list is O(1) amortized time complexity."
      },
      {
        question: "Which method removes and returns the last element of a list?",
        options: ["pop()", "remove()", "delete()", "clear()"],
        correctAnswer: "pop()",
        explanation: "pop() removes and returns the last element (or element at given index)."
      },
      {
        question: "What is a dictionary in Python?",
        options: ["A key-value store", "An ordered list", "A stack", "A queue"],
        correctAnswer: "A key-value store",
        explanation: "Dictionaries store data as key-value pairs for fast lookup."
      },
      {
        question: "What is list comprehension?",
        options: ["A concise way to create lists", "A loop type", "A function", "A class"],
        correctAnswer: "A concise way to create lists",
        explanation: "List comprehension provides a concise syntax for creating lists."
      }
    ]
  },
  {
    title: "HTML & CSS",
    category: "Web",
    difficulty: "Easy",
    estimatedTime: 20,
    questions: [
      {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        correctAnswer: "Hyper Text Markup Language",
        explanation: "HTML stands for Hyper Text Markup Language."
      },
      {
        question: "Which CSS property controls text size?",
        options: ["font-size", "text-size", "font-style", "text-style"],
        correctAnswer: "font-size",
        explanation: "font-size is used to control the size of text."
      },
      {
        question: "What is the correct HTML tag for the largest heading?",
        options: ["<h1>", "<h6>", "<heading>", "<head>"],
        correctAnswer: "<h1>",
        explanation: "h1 is the largest heading tag in HTML."
      },
      {
        question: "How do you make text bold in CSS?",
        options: ["font-weight: bold", "text-style: bold", "font-style: bold", "text-weight: bold"],
        correctAnswer: "font-weight: bold",
        explanation: "font-weight: bold makes text bold in CSS."
      },
      {
        question: "What is the CSS box model?",
        options: ["Content, Padding, Border, Margin", "Only Content", "Only Border", "Only Padding"],
        correctAnswer: "Content, Padding, Border, Margin",
        explanation: "The CSS box model consists of content, padding, border, and margin."
      }
    ]
  },
  {
    title: "Node.js Basics",
    category: "JS",
    difficulty: "Medium",
    estimatedTime: 30,
    questions: [
      {
        question: "What is Node.js?",
        options: ["A JavaScript runtime", "A database", "A framework", "A CSS library"],
        correctAnswer: "A JavaScript runtime",
        explanation: "Node.js is a JavaScript runtime built on Chrome's V8 engine."
      },
      {
        question: "Which module is used to create a server?",
        options: ["http", "fs", "path", "url"],
        correctAnswer: "http",
        explanation: "The http module is used to create web servers in Node.js."
      },
      {
        question: "What does npm stand for?",
        options: ["Node Package Manager", "New Project Manager", "Network Protocol Manager", "Node Program Manager"],
        correctAnswer: "Node Package Manager",
        explanation: "npm is the Node Package Manager for JavaScript."
      },
      {
        question: "What is Express.js?",
        options: ["A Node.js framework", "A database", "A frontend library", "A CSS framework"],
        correctAnswer: "A Node.js framework",
        explanation: "Express.js is a minimal web framework for Node.js."
      },
      {
        question: "What is middleware in Express?",
        options: ["Functions that have access to req and res", "A database", "A frontend tool", "A CSS property"],
        correctAnswer: "Functions that have access to req and res",
        explanation: "Middleware functions have access to request and response objects."
      }
    ]
  },
  {
    title: "TypeScript Intro",
    category: "JS",
    difficulty: "Easy",
    estimatedTime: 25,
    questions: [
      {
        question: "What is TypeScript?",
        options: ["A superset of JavaScript", "A database", "A CSS framework", "A backend language"],
        correctAnswer: "A superset of JavaScript",
        explanation: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript."
      },
      {
        question: "How do you define a type in TypeScript?",
        options: ["type MyType = {}", "var MyType = {}", "const MyType = {}", "let MyType = {}"],
        correctAnswer: "type MyType = {}",
        explanation: "The 'type' keyword is used to define custom types in TypeScript."
      },
      {
        question: "What is an interface?",
        options: ["A way to define object shapes", "A function", "A class", "A variable"],
        correctAnswer: "A way to define object shapes",
        explanation: "Interfaces define the shape/structure of objects in TypeScript."
      },
      {
        question: "What does 'tsc' command do?",
        options: ["Compiles TypeScript to JavaScript", "Runs tests", "Creates files", "Deletes files"],
        correctAnswer: "Compiles TypeScript to JavaScript",
        explanation: "tsc is the TypeScript compiler that converts .ts files to .js files."
      },
      {
        question: "What is the 'any' type?",
        options: ["A type that accepts any value", "A specific type", "An error", "A class"],
        correctAnswer: "A type that accepts any value",
        explanation: "The 'any' type allows any value and disables type checking."
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/brainquizzer";
    
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    console.log("Clearing existing quizzes...");
    await Quiz.deleteMany({});
    console.log("✅ Cleared existing quizzes");

    console.log("Inserting sample quizzes...");
    const result = await Quiz.insertMany(sampleQuizzes);
    console.log(`✅ Successfully inserted ${result.length} quizzes`);

    console.log("\nSample quizzes:");
    result.forEach((quiz, index) => {
      console.log(`${index + 1}. ${quiz.title} (${quiz.category}) - ${quiz.questions.length} questions`);
    });

    console.log("\n✨ Database seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
const upload = (0, multer_1.default)({ dest: "uploads/" });
// Serve login page
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
// Fake login (just simulate success)
app.post("/login", (req, res) => {
    res.json({ success: true });
});
// Upload video endpoint
app.post("/upload", upload.single("video"), (req, res) => {
    var _a;
    console.log("Uploaded file:", (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
    res.json({ success: true, message: "Video received successfully!" });
});
// ✅ Smarter Feedback (improved AI-like logic)
app.post("/analyze", (req, res) => {
    let feedback = "Good attempt.";
    // If an uploaded file exists, look at its size
    if (req.file && req.file.size) {
        const size = req.file.size;
        if (size < 200000) {
            feedback = "Your answer was quite short. Try to elaborate more next time.";
        }
        else if (size < 1000000) {
            feedback =
                "Nice effort! You maintained clarity. Add more detail for stronger answers.";
        }
        else {
            feedback =
                "Excellent explanation! Your confidence and depth were impressive.";
        }
    }
    else {
        // No upload — use random feedback for demo
        const options = [
            "Try speaking for a bit longer to cover all points.",
            "Great tone! Work on giving complete examples.",
            "Good flow in your speech. Stay confident!",
            "Keep answers concise but detailed — well done."
        ];
        feedback = options[Math.floor(Math.random() * options.length)];
    }
    res.json({ success: true, feedback });
});
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});

<<<<<<< HEAD
=======
# ⌨️ TyplOf — Professional Typing Trainer

[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)](https://github.com/ncjcjfvkkvkv-create/typlof-app)
[![Version](https://img.shields.io/badge/Version-3.0.0-red?style=for-the-badge)](https://github.com/ncjcjfvkkvkv-create/typlof-app)
[![Python](https://img.shields.io/badge/Python-3.8+-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-orange?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/github/license/ncjcjfvkkvkv-create/typlof-app?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/ncjcjfvkkvkv-create/typlof-app?style=for-the-badge)](https://github.com/ncjcjfvkkvkv-create/typlof-app)
[![Forks](https://img.shields.io/github/forks/ncjcjfvkkvkv-create/typlof-app?style=for-the-badge)](https://github.com/ncjcjfvkkvkv-create/typlof-app)

---

## 📖 About The Project

**TyplOf** is a professional touch typing trainer application with multi-language support. This project is designed to help users improve typing speed and accuracy through structured lessons, advanced scoring systems, interactive virtual keyboard, real-time progress charts, and extensive customization options.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🎯 **Touch Typing Training** | Specialized exercises for each finger and proper hand positioning |
| 🌍 **Multi-Language Support** | Add any language with a simple JSON file |
| 📊 **Professional Progress Charts** | Line, bar, and doughnut charts similar to Matplotlib |
| ⭐ **Smart Scoring System** | Positive points for correct typing, penalties for mistakes |
| ⏱️ **Dynamic Time Limits** | Adaptive time based on word length and difficulty level |
| ⌨️ **Interactive Virtual Keyboard** | Real-time visual feedback for correct and wrong keys |
| 🔒 **Lesson Lock System** | Step-by-step progression with locked lessons |
| 🎨 **Multiple Color Themes** | 7 themes including Dark, Light, Neon, Matrix, and more |
| ⚙️ **Advanced Settings** | Over 40 customizable options |

---

## 🚀 Quick Installation

### Method 1: Git Clone (Recommended)

```bash
git clone https://github.com/ncjcjfvkkvkv-create/typlof-app.git
cd typlof-app
pip install flask
python app.py
```

## 📖 About The Project

**TyplOf** is a professional touch typing trainer application with multi-language support. This project is designed to help users improve typing speed and accuracy through structured lessons, advanced scoring systems, interactive virtual keyboard, real-time progress charts, and extensive customization options.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🎯 **Touch Typing Training** | Specialized exercises for each finger and proper hand positioning |
| 🌍 **Multi-Language Support** | Add any language with a simple JSON file |
| 📊 **Professional Progress Charts** | Line, bar, and doughnut charts similar to Matplotlib |
| ⭐ **Smart Scoring System** | Positive points for correct typing, penalties for mistakes |
| ⏱️ **Dynamic Time Limits** | Adaptive time based on word length and difficulty level |
| ⌨️ **Interactive Virtual Keyboard** | Real-time visual feedback for correct and wrong keys |
| 🔒 **Lesson Lock System** | Step-by-step progression with locked lessons |
| 🎨 **Multiple Color Themes** | 7 themes including Dark, Light, Neon, Matrix, and more |
| ⚙️ **Advanced Settings** | Over 40 customizable options |

---

## 🚀 Quick Installation

### Method 1: Git Clone (Recommended)

```
git clone https://github.com/ncjcjfvkkvkv-create/typlof-app.git
cd typlof-app
pip install flask
python app.py
```

Method 2: Direct Setup (Without Git)

```bash
mkdir -p typlof-app && cd typlof-app
# Then copy all files manually
```

Method 3: Termux (Android)

```bash
pkg update && pkg upgrade
pkg install python git
git clone https://github.com/ncjcjfvkkvkv-create/typlof-app.git
cd typlof-app
pip install flask
python app.py
```

---

📁 Project Structure

```
typlof-app/
├── app.py                  # Main Flask server
├── README.md               # This file
├── requirements.txt        # Dependencies list
├── lessons/                # Language lesson files
│   ├── english.json        # English lessons
│   ├── persian.json        # Persian lessons
│   └── (new languages)     # Each language as JSON
├── templates/              # HTML templates
│   ├── index.html          # Main page
│   ├── login.html          # Language selection
│   ├── dashboard.html      # Progress dashboard
│   ├── chart_view.html     # Professional charts
│   ├── rules.html          # Game rules
│   └── settings.html       # Advanced settings
└── static/
    └── style.css           # Main stylesheet
```

---

📝 Adding a New Language

Create a JSON file in the lessons/ folder with this format:

```json
{
  "name": "Language Name",
  "code": "language_code",
  "lessons": [
    {
      "id": 1,
      "title": "Lesson Title",
      "subtitle": "Subtitle",
      "words": ["word1", "word2", "word3"],
      "hint_keys": ["a", "s", "d", "f"]
    }
  ]
}
```

Important Notes:

· Filename must be language_code.json (e.g., spanish.json)
· hint_keys: Allowed keys for this lesson (for hand training)
· words: List of words to type
· Language appears automatically on the login page

---

🎮 Game Guide

How to Play:

1. Choose Language: Select your preferred language on the login page
2. Select Lesson: Pick a lesson from the available list
3. Type Words: Type the displayed words in the input field
4. Earn Points: Get points for correct typing, lose points for mistakes
5. Complete Lesson: Finish all words to complete the lesson

Scoring System:

Action Points
✅ Correct character +3
🏆 Lesson completion +10
🎯 Perfect lesson (no errors) +20
❌ Wrong word -5
🔑 Adjacent key error -4 (extra)
⏰ Time out -7

---

⚙️ Advanced Settings

Settings Categories:

Category Options
🎯 Difficulty 7 levels from Beginner to God Mode
⏱️ Time Time per word, time penalty, warning time
⭐ Scoring Correct bonus, wrong penalty, adjacent penalty, completion bonus
💪 Practice 4 modes: Normal, Hardcore, Zen, Sprint
🎨 Appearance 7 themes, font size, keyboard color, background animation
📊 Progress Show stats, auto-save, real-time WPM
🌍 Language Default language, show language flag
🔔 Notifications Lesson completion, errors, milestones, desktop
⌨️ Keyboard Layout, key animation, key hints

---

📊 Progress Charts

The project includes 4 professional chart types:

1. Line Chart: Score progress across lessons
2. Bar Chart: Individual lesson scores
3. Doughnut Chart: Completion percentage
4. Speed Chart: Typing speed (WPM) over time

---

🛠️ Technologies Used

· Backend: Python + Flask
· Frontend: HTML5 + CSS3 + Vanilla JavaScript
· Charts: Chart.js
· Storage: Flask Session
· Design: Responsive + Dark/Light Themes

---

🤝 Contributing

1. Fork the repository
2. Create a Feature Branch (git checkout -b feature/amazing-feature)
3. Commit changes (git commit -m 'Add amazing feature')
4. Push to branch (git push origin feature/amazing-feature)
5. Open a Pull Request

---

📞 Contact & Links

· GitHub: https://github.com/ncjcjfvkkvkv-create/typlof-app
· Issues: Report Bug or Suggestion

---

📜 License

This project is licensed under the MIT License. See the LICENSE file for more information.

---

🌟 Support the Project

If you like this project, please give it a ⭐ and share it with your friends!

---

Made with ❤️ for touch typing enthusiasts

⭐ Star | 🍴 Fork | 🐛 Report Issues

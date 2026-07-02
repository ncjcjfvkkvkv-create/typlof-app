from flask import Flask, render_template, request, jsonify, session
import json
import os
import math

app = Flask(__name__)
app.secret_key = 'typlof-secret-key-2026'

def load_lessons(lang):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, 'lessons', f'{lang}.json')
    
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            for i, lesson in enumerate(data.get('lessons', [])):
                max_word_len = max([len(w) for w in lesson.get('words', [''])]) if lesson.get('words') else 1
                avg_word_len = sum([len(w) for w in lesson.get('words', [''])]) / max(1, len(lesson.get('words', [])))
                
                title = lesson.get('title', '').lower()
                if 'left' in title or 'چپ' in title:
                    lesson['hand_type'] = 'left'
                elif 'right' in title or 'راست' in title:
                    lesson['hand_type'] = 'right'
                else:
                    lesson['hand_type'] = 'both'
                
                level_factor = 1.0 - (i / len(data['lessons'])) * 0.5
                time_per_char = 1.8 - (i / len(data['lessons'])) * 1.0
                time_per_char = max(0.6, time_per_char)
                
                lesson['time_limit'] = math.ceil((time_per_char * max_word_len) + 1)
                lesson['max_word_len'] = max_word_len
                lesson['avg_word_len'] = round(avg_word_len, 1)
                lesson['level'] = i + 1
                lesson['total_lessons'] = len(data['lessons'])
            
            return data
    return None

def get_available_languages():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    lessons_dir = os.path.join(base_dir, 'lessons')
    languages = []
    if os.path.exists(lessons_dir):
        for file in os.listdir(lessons_dir):
            if file.endswith('.json'):
                try:
                    with open(os.path.join(lessons_dir, file), 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        languages.append({
                            'code': file.replace('.json', ''),
                            'name': data.get('name', file.replace('.json', '')),
                            'lessons_count': len(data.get('lessons', []))
                        })
                except:
                    pass
    return languages

@app.route('/')
def index():
    lang = request.args.get('lang', 'english')
    if lang not in ['persian', 'english']:
        lang = 'english'
    return render_template('index.html', lang=lang)

@app.route('/login')
def login():
    languages = get_available_languages()
    return render_template('login.html', languages=languages)

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/lessons/<lang>')
def get_lessons(lang):
    data = load_lessons(lang)
    if data:
        return jsonify(data)
    return jsonify({"error": "Language not found"}), 404

@app.route('/api/languages')
def get_languages():
    return jsonify(get_available_languages())

@app.route('/api/check', methods=['POST'])
def check_word():
    data = request.get_json()
    typed = data.get('typed', '')
    expected = data.get('expected', '')
    is_timeout = data.get('is_timeout', False)
    
    correct = typed == expected
    
    score_change = 0
    if correct:
        score_change = len(expected) * 3
    elif is_timeout:
        score_change = -7
    else:
        penalty = 5
        for i in range(min(len(typed), len(expected))):
            if typed[i] != expected[i]:
                penalty += 4
        score_change = -penalty
    
    return jsonify({
        "correct": correct,
        "score_change": score_change,
        "is_timeout": is_timeout
    })

@app.route('/api/save_progress', methods=['POST'])
def save_progress():
    data = request.get_json()
    lesson_id = data.get('lesson_id')
    score_change = data.get('score_change', 0)
    completed = data.get('completed', False)
    time_taken = data.get('time_taken', 0)
    
    if 'progress' not in session:
        session['progress'] = {}
    
    if str(lesson_id) not in session['progress']:
        session['progress'][str(lesson_id)] = {
            'score': 0,
            'completed': False,
            'attempts': 0,
            'best_time': None,
            'total_time': 0,
            'history': []
        }
    
    # ===== اعمال تغییرات روی نمره اصلی =====
    current_score = session['progress'][str(lesson_id)]['score']
    new_score = max(0, current_score + score_change)
    session['progress'][str(lesson_id)]['score'] = new_score
    
    # ذخیره تاریخچه
    if 'history' not in session['progress'][str(lesson_id)]:
        session['progress'][str(lesson_id)]['history'] = []
    session['progress'][str(lesson_id)]['history'].append({
        'change': score_change,
        'new_score': new_score,
        'time': time_taken,
        'completed': completed
    })
    
    if completed:
        session['progress'][str(lesson_id)]['completed'] = True
    session['progress'][str(lesson_id)]['attempts'] += 1
    session['progress'][str(lesson_id)]['total_time'] += time_taken
    
    if session['progress'][str(lesson_id)]['best_time'] is None or time_taken < session['progress'][str(lesson_id)]['best_time']:
        if time_taken > 0:
            session['progress'][str(lesson_id)]['best_time'] = time_taken
    
    session.modified = True
    return jsonify({
        "success": True, 
        "new_score": new_score, 
        "change": score_change
    })

@app.route('/api/get_progress')
def get_progress():
    return jsonify(session.get('progress', {}))

@app.route('/api/reset_progress', methods=['POST'])
def reset_progress():
    session['progress'] = {}
    session.modified = True
    return jsonify({"success": True})

@app.route('/rules')
def rules():
    languages = get_available_languages()
    return render_template('rules.html', languages=languages)

@app.route('/settings')
def settings():
    return render_template('settings.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

@app.route('/charts')
def charts():
    return render_template('chart_view.html')

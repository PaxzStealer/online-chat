from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = 'JOUW_OPENAI_API_KEY'  # Vervang dit door je eigen API-sleutel

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_ai_response', methods=['POST'])
def get_ai_response():
    user_message = request.json['user_message']
    response = openai.Completion.create(
        engine="davinci",  # Kies het gewenste OpenAI engine
        prompt=user_message,
        max_tokens=50
    )
    ai_message = response.choices[0].text.strip()
    return jsonify({'ai_message': ai_message})

if __name__ == '__main__':
    app.run()

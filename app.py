import os
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash')

TRAITS = [
    "開朗活潑", "內向內斂", "善解人意", "誠實坦白", "謙和有禮",
    "沉著鎮靜", "勇敢果決", "幽默風趣", "積極樂觀", "刻苦耐勞",
    "責任心重", "勤奮好學", "虛心上進", "專心致志", "反應靈敏",
    "創造力強", "析理明確", "踏實穩重", "謹言慎行", "任勞任怨",
    "規矩守法", "慷慨大方", "樂於助人", "平易近人", "敬業樂群",
    "具有領導力", "溫文儒雅", "剛毅有恆", "知過能改", "觀念正確"
]

@app.route('/')
def index():
    return render_template('index.html', traits=TRAITS)

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    student_name = data.get('name', '')
    selected_traits = data.get('traits', [])
    
    if not selected_traits:
        return jsonify({'error': '請選擇至少一項特質'}), 400

    traits_str = "、".join(selected_traits)
    prompt = f"請為一位國小學生撰寫期末評語。學生姓名是「{student_name}」，他/她的特質包括：{traits_str}。評語風格需正向積極，字數約100字左右，並以學生的名字作為評語的主詞，並且用詞不要太浮誇，平易近人即可。"

    try:
        response = model.generate_content(prompt)
        return jsonify({'comment': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False)

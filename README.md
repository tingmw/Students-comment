# 小學生學期末評語產生器

這是一個專為國小老師設計的學期末評語生成工具。老師可以輸入學生姓名並選擇多個學生特質，系統將透過 Google Gemini AI 生成一段約 100 字、風格正向積極的客製化評語。

## 功能特點
- **姓名輸入**：可針對個別學生生成主詞正確的評語。
- **特質標籤**：提供 30 種常見的學生特質，可以複選以增加評語的豐富度。
- **AI 智能生成**：使用 Gemini 1.5 Flash 模型，生成自然且正面的回應。
- **一鍵複製**：方便老師快速將評語複製到成績系統中。

## 開發技術
- **後端**：Flask (Python)
- **前端**：HTML, CSS (Bootstrap 5), JavaScript
- **AI API**：Google Gemini API

## 安裝與執行步驟

### 1. 複製專案
```bash
git clone <repository_url>
cd "students comments"
```

### 2. 建立虛擬環境
```bash
python -m venv venv
```

### 3. 啟動虛擬環境
- Windows:
  ```bash
  .\venv\Scripts\activate
  ```
- macOS/Linux:
  ```bash
  source venv/bin/activate
  ```

### 4. 安裝必要套件
```bash
pip install -r requirements.txt
```

### 5. 設定 API Key
在專案根目錄建立 `.env` 檔案，並填入你的 Gemini API Key：
```env
GEMINI_API_KEY=你的_API_金鑰
```

### 6. 執行程式
```bash
python app.py
```
開啟瀏覽器並前往 `http://127.0.0.1:5000` 即可開始使用。

## 學生特質清單
本工具包含以下 30 種特質：
開朗活潑、內向內斂、善解人意、誠實坦白、謙和有禮、沉著鎮靜、勇敢果決、幽默風趣、積極樂觀、刻苦耐勞、責任心重、勤奮好學、虛心上進、專心致志、反應靈敏、創造力強、析理明確、踏實穩重、謹言慎行、任勞任怨、規矩守法、慷慨大方、樂於助人、平易近人、敬業樂群、具有領導力、溫文儒雅、剛毅有恆、知過能改、觀念正確。

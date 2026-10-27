# Industrial Maintenance RAG Bot — Streamlit App

## 1. Install system dependency (OCR engine)
Tesseract must be installed on your machine (not just the Python wrapper):

- **Windows**: download and install from https://github.com/UB-Mannheim/tesseract/wiki
- **Mac**: `brew install tesseract`
- **Linux**: `sudo apt-get install tesseract-ocr`

## 2. Install Python dependencies
```bash
pip install -r requirements.txt
```

## 3. Add your API key
Open `app.py` and replace this line near the top with your real OpenRouter key:
```python
OPENROUTER_API_KEY = "PASTE_YOUR_OPENROUTER_API_KEY_HERE"
```

## 4. Run the app
```bash
streamlit run app.py
```
This opens a browser tab (usually `http://localhost:8501`).

## 5. Use it
1. In the sidebar, upload your PDFs and/or CSV file.
2. Click **"Build knowledge base"** and wait for indexing to finish (OCR + embedding takes a bit for large PDFs).
3. Ask questions in the chat box at the bottom. Answers won't mention sources or page numbers.

## Notes
- The vector database is stored in a `chroma_db` folder next to `app.py`, and rebuilt whenever you click "Build knowledge base".
- If you're running this from Google Colab instead of your own machine, Streamlit needs a tunnel (e.g. `pip install pyngrok` and expose port 8501) since Colab can't serve a local webpage directly. Local machine or a host like Streamlit Community Cloud, Render, or Railway is simpler.

## Reusing a knowledge base you already built in Colab
If you already ran your Colab notebook and it built `/content/chroma_db` there, you don't need to re-upload and re-index in Streamlit:

1. In Colab, zip and download it:
   ```python
   !zip -r chroma_db.zip /content/chroma_db
   from google.colab import files
   files.download("chroma_db.zip")
   ```
2. Unzip `chroma_db.zip` so the resulting `chroma_db` folder sits **directly next to `app.py`** (same directory).
3. Run `streamlit run app.py` — the app detects that folder automatically on startup and loads it, skipping the upload step entirely. The sidebar will show "Loaded existing knowledge base" with the chunk count.
4. You can still upload more files and click "Build knowledge base" later if you want to add to it or start fresh.

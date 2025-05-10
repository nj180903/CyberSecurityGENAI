import os
import fitz  # PyMuPDF
import numpy as np
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer

load_dotenv()

# Load embedding model (updated to 'all-MPNet-base-v2')
embedding_model = SentenceTransformer('all-MPNet-base-v2')

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file."""
    doc = fitz.open(pdf_path)
    text = ''
    for page in doc:
        text += page.get_text()
    return text

def embed_text(text):
    """Embed text using SentenceTransformer."""
    return embedding_model.encode([text])

def process_and_save_pdf(pdf_path, output_dir='embeddings'):
    """Process PDF to extract text, generate embeddings, and save them."""
    text = extract_text_from_pdf(pdf_path)
    embeddings = embed_text(text)

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Save embeddings as .npy file with the PDF name (without extension)
    filename = os.path.join(output_dir, f"{os.path.splitext(os.path.basename(pdf_path))[0]}.npy")
    np.save(filename, embeddings)

    print(f"✅ Processed: {pdf_path} - Embeddings saved to {filename}")

if __name__ == "__main__":
    data_folder = "E:\\Major Project\\cybersec-ai-agent\\modules\\knowledge-retrieval-agent\\data\\papers"
    output_folder = "E:\\Major Project\\cybersec-ai-agent\\modules\\knowledge-retrieval-agent\\embeddings"

    if not os.path.exists(data_folder):
        print(f"❌ Error: {data_folder} directory not found.")
        exit(1)

    pdf_files = [os.path.join(data_folder, f) for f in os.listdir(data_folder) if f.endswith(".pdf")]

    if not pdf_files:
        print("No PDF files found in data folder.")
        exit(1)

    print(f"📂 Found {len(pdf_files)} PDFs. Processing...")

    for pdf_file in pdf_files:
        process_and_save_pdf(pdf_file, output_folder)

    print(f"✅ All PDFs processed! Embeddings saved in '{output_folder}' folder.")

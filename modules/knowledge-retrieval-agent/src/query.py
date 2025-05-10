import numpy as np
import os
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

# Initialize the embedding model
embedding_model = SentenceTransformer('all-MPNet-base-v2')

def load_embeddings(embedding_file):
    """Load stored embeddings from a .npy file."""
    return np.load(embedding_file)

def retrieve_query(query, embeddings_dir='E:\Major Project\cybersec-ai-agent\modules\knowledge-retrieval-agent\embeddings'):
    """Retrieve the most relevant content for a user query."""
    # Convert the query to embedding
    query_embedding = embedding_model.encode([query])
    
    # Load all embeddings
    files = [f for f in os.listdir(embeddings_dir) if f.endswith('.npy')]
    best_score = -1
    best_match = None
    
    for file in files:
        embedding = load_embeddings(os.path.join(embeddings_dir, file))
        
        # Compute cosine similarity
        score = cosine_similarity(query_embedding, embedding)
        
        if score > best_score:
            best_score = score
            best_match = file  # Return the name of the matching embedding file (without .npy)
    
    return best_match

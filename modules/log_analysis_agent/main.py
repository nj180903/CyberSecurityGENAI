from utils.preprocessing import load_data, preprocess_features, encode_labels

# Step 1: Load dataset
df = load_data('data/UNSW_NB15_training-set.csv')

# Step 2: Encode features and labels
X = preprocess_features(df, fit_encoder=True)
y_binary, y_attack = encode_labels(df, fit_encoder=True)

print("✅ Preprocessing complete.")
print("X shape:", X.shape)
print("y_binary shape:", y_binary.shape)
print("y_attack shape:", y_attack.shape)

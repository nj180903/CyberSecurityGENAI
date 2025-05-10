import joblib
import pandas as pd
import os
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from utils.preprocessing import load_data, preprocess_features, encode_labels

def train_stage2():
    # Load and preprocess data
    df = load_data('data/UNSW_NB15_training-set.csv')
    X = preprocess_features(df, fit_encoder=True)
    _, y_multi = encode_labels(df, fit_encoder=False)

    # Split
    X_train, X_val, y_train, y_val = train_test_split(X, y_multi, test_size=0.2, random_state=42)

    # Models
    rf = RandomForestClassifier(n_estimators=100, random_state=42)
    xgb = XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)
    lgb = LGBMClassifier(random_state=42)

    # Voting Classifier (Soft Voting for multiclass)
    ensemble = VotingClassifier(estimators=[
        ('rf', rf),
        ('xgb', xgb),
        ('lgb', lgb)
    ], voting='soft')

    # Train
    ensemble.fit(X_train, y_train)

    # Validate
    y_pred = ensemble.predict(X_val)
    print("📊 Classification Report (Stage 2 - Multiclass):\n")
    print(classification_report(y_val, y_pred))

    # Save model
    os.makedirs('models', exist_ok=True)
    joblib.dump(ensemble, 'models/stage2_multiclass_model.pkl')
    print("✅ Model saved to models/stage2_multiclass_model.pkl")

if __name__ == "__main__":
    train_stage2()

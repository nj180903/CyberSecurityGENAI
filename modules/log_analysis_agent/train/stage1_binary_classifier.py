import joblib
import pandas as pd
import os
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from utils.preprocessing import load_data, preprocess_features, encode_labels



def train_stage1():
    # Load and preprocess data
    df = load_data('data/UNSW_NB15_training-set.csv')
    X = preprocess_features(df, fit_encoder=True)
    y_binary, _ = encode_labels(df, fit_encoder=False)

    # Split
    X_train, X_val, y_train, y_val = train_test_split(X, y_binary, test_size=0.2, random_state=42)

    # Models
    rf = RandomForestClassifier(n_estimators=100, random_state=42)
    xgb = XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)
    lgb = LGBMClassifier(random_state=42)

    # Voting Classifier (Hard Voting)
    ensemble = VotingClassifier(estimators=[
        ('rf', rf),
        ('xgb', xgb),
        ('lgb', lgb)
    ], voting='hard')

    # Train
    ensemble.fit(X_train, y_train)

    # Validate
    y_pred = ensemble.predict(X_val)
    print("📊 Classification Report (Stage 1 - Binary):\n")
    print(classification_report(y_val, y_pred))
    try:
        print("AUC:", roc_auc_score(y_val, y_pred))
    except:
        print("⚠️ AUC could not be calculated (maybe only one class present in y_val).")

    # Save model
    os.makedirs('models', exist_ok=True)
    joblib.dump(ensemble, 'models/stage1_binary_model.pkl')
    print("✅ Model saved to models/stage1_binary_model.pkl")

if __name__ == "__main__":
    train_stage1()

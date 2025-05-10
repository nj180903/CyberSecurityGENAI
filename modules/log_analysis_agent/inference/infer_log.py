# inference/infer_log.py

import pandas as pd
import joblib
import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from utils.preprocessing import preprocess_features

# Paths to models and encoders
binary_model_path = "models/stage1_binary_model.pkl"
multiclass_model_path = "models/stage2_multiclass_model.pkl"
attack_encoder_path = "models/attack_type_encoder.pkl"
feature_encoder_path = "models/feature_encoder.pkl"

# Load models and encoders
binary_model = joblib.load(binary_model_path)
multiclass_model = joblib.load(multiclass_model_path)
attack_encoder = joblib.load(attack_encoder_path)


# Threat category to mitigation map
mitigation_map = {
    "Generic": "Block known malicious IPs and apply IDS/IPS rules.",
    "Exploits": "Patch vulnerable systems and update firewall rules.",
    "Fuzzers": "Harden input validation and monitor service logs.",
    "DoS": "Rate-limit traffic and deploy DDoS protection tools.",
    "Reconnaissance": "Enable port scan detection and restrict unused ports.",
    "Analysis": "Audit logs for anomalies and enforce strict policies.",
    "Backdoor": "Run antivirus scans and isolate infected machines.",
    "Shellcode": "Inspect memory dumps and sandbox unknown binaries.",
    "Worms": "Segment the network and apply system-wide patches.",
    "Normal": "No issues detected.",
}

def analyze_log(file_path):
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return

    df = pd.read_csv(file_path)

    # Use the full pipeline to preprocess
    
    X = preprocess_features(df, fit_encoder=False)


    # Stage 1 - Binary Classification
    stage1_pred = binary_model.predict(X)
    df["Prediction_Stage1"] = stage1_pred

    results = []

    for i in range(len(df)):
        result = {}
        if stage1_pred[i] == 0:
            result["Status"] = "✅ Normal"
            result["Attack_Type"] = "None"
            result["Mitigation"] = mitigation_map["Normal"]
        else:
            x_sample = X[i].reshape(1, -1)
            stage2_pred = multiclass_model.predict(x_sample)[0]
            attack_cat = attack_encoder.inverse_transform([stage2_pred])[0]

            result["Status"] = "🚨 Anomalous"
            result["Attack_Type"] = attack_cat
            result["Mitigation"] = mitigation_map.get(attack_cat, "Further investigation needed.")

        results.append(result)

    result_df = pd.DataFrame(results)
    output = pd.concat([df, result_df], axis=1)
    output.to_csv("inference/log_analysis_output.csv", index=False)
    print("✅ Analysis complete. Results saved to: inference/log_analysis_output.csv")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python inference/infer_log.py <log_file.csv>")
    else:
        analyze_log(sys.argv[1])

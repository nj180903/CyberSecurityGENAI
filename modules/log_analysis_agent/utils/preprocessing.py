import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

# Categorical features to encode
CATEGORICAL_FEATURES = ['proto', 'service', 'state']

# Target column for both stages
LABEL_COLUMN = 'label'
ATTACK_TYPE_COLUMN = 'attack_cat'

def load_data(path):
    df = pd.read_csv("E:\\Major Project\\cybersec-ai-agent\\modules\\LA\\data\\UNSW_NB15_training-set.csv")
    return df

def preprocess_features(df, fit_encoder=False):
    df = df.copy()

    # Drop target columns temporarily
    X = df.drop(columns=[LABEL_COLUMN, ATTACK_TYPE_COLUMN], errors='ignore')

    # Identify categorical + numerical columns
    cat_features = CATEGORICAL_FEATURES
    num_features = [col for col in X.columns if col not in cat_features]

    # Build preprocessing pipeline
    num_pipeline = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='mean'))
    ])

    cat_pipeline = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', num_pipeline, num_features),
            ('cat', cat_pipeline, cat_features)
        ]
    )

    if fit_encoder:
        X_processed = preprocessor.fit_transform(X)
        joblib.dump(preprocessor, 'models/feature_encoder.pkl')
    else:
        preprocessor = joblib.load('models/feature_encoder.pkl')
        X_processed = preprocessor.transform(X)

    return X_processed

def encode_labels(df, fit_encoder=False):
    le = LabelEncoder()
    attack_encoder = LabelEncoder()

    if fit_encoder:
        y_binary = le.fit_transform(df[LABEL_COLUMN])
        y_attack = attack_encoder.fit_transform(df[ATTACK_TYPE_COLUMN])
        joblib.dump(le, 'models/label_encoder.pkl')
        joblib.dump(attack_encoder, 'models/attack_type_encoder.pkl')
    else:
        le = joblib.load('models/label_encoder.pkl')
        attack_encoder = joblib.load('models/attack_type_encoder.pkl')
        y_binary = le.transform(df[LABEL_COLUMN])
        y_attack = attack_encoder.transform(df[ATTACK_TYPE_COLUMN])

    return y_binary, y_attack

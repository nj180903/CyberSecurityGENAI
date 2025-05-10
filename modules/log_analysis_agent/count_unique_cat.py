import pandas as pd

# Load your data (replace 'your_file.csv' with the actual file name)
df = pd.read_csv('E:\\Major Project\\cybersec-ai-agent\\modules\\LA\\data\\UNSW_NB15_training-set.csv')

# List of categorical columns
categorical_columns = ['proto', 'service', 'state']

# Calculate and print unique values for each categorical column
for col in categorical_columns:
    unique_values = df[col].nunique()
    print(f"{col}: {unique_values} unique values")

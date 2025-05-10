import pandas as pd

# Load your CSV file
df = pd.read_csv('E:\\Major Project\\cybersec-ai-agent\\modules\\log_analysis\\data\\CSV Files\\Training and Testing Sets\\UNSW_NB15_training-set.csv')


# Count the number of occurrences for each category in the 'attack' column
attack_counts = df['attack_cat'].value_counts()

# Print the counts
print(attack_counts)

# Optionally, save the result to a CSV file
attack_counts.to_csv('attack_type_counts.txt', header=['Count'])

from gemini_client import AIModelFactory
from query import retrieve_query  # Assuming retrieve_query is updated accordingly to handle .npy files.

def chatbot():
    model_name = "gemini-2.0-flash-thinking-exp-1219"
    model_client = AIModelFactory.get_model(model_name)

    print("Chatbot is running... Type 'exit' to quit.")
    while True:
        user_input = input("\n👤 You: ")
        if user_input.lower() == "exit":
            break
        
        # Retrieve relevant information based on user query
        retrieved_info = retrieve_query(user_input)
        
        # If no relevant information, prompt user to ask a relevant question
        if retrieved_info == "Please ask a relevant question related to cybersecurity.":
            print(f"\n🤖 Chatbot: {retrieved_info}")
            continue
        
        context = retrieved_info if retrieved_info else "No relevant data found."

        # Use the model to generate a response using the dynamic prompt
        response = model_client.generate_content(user_input, context, temperature=0.7)
        
        print(f"\n🤖 Chatbot: {response}")

if __name__ == "__main__":
    chatbot()

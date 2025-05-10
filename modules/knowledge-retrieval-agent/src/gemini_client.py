import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv(override=True)

class AIModelFactory:
    """Factory to provide AI model clients dynamically."""

    @staticmethod
    def get_model(model_name):
        """Creates a Gemini model client."""
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise EnvironmentError("GEMINI_API_KEY environment variable not set.")
        
        genai.configure(api_key=api_key)  # Configure API
        return GeminiClient(model_name)

class GeminiClient:
    def __init__(self, model_name):
        self.model = genai.GenerativeModel(model_name)  # Initialize model

    def generate_content(self, user_query, context, temperature=0.7):
        """Generates content using the Gemini model based on user query and dynamic context."""
        try:
            # Dynamic prompt generation
            prompt = self.generate_dynamic_prompt(user_query, context)

            # Generate response using Gemini
            response = self.model.generate_content(
                prompt, generation_config={"temperature": temperature}
            )

            # Extract response text safely
            if response and hasattr(response, "text"):
                return response.text
            elif hasattr(response, "candidates"):
                return response.candidates[0].content if response.candidates else "No valid response generated."
            else:
                return "No valid response generated."

        except Exception as e:
            return f"Error querying Gemini API: {str(e)}"

    def generate_dynamic_prompt(self, user_query, context):
        """Constructs a dynamic prompt template for the Gemini model."""
        return f"""
        You are a cutting-edge cybersecurity knowledge assistant. Your goal is to provide accurate, real-time insights into cybersecurity threats, vulnerabilities, and best practices using trusted sources such as CVE databases, MITRE ATT&CK, NIST, security blogs, and threat intelligence platforms.

        Respond concisely and professionally, structuring your answers as follows:

        Summary: Briefly describe the cybersecurity topic in a clear and informative way.
        Latest Insights: Provide real-time threat intelligence, recent incidents, and new vulnerabilities.
        Technical Details: Explain vulnerabilities, exploits, attack vectors, and mitigation techniques in a technical yet digestible manner.
        Actionable Steps: Offer practical cybersecurity measures and best practices to mitigate risks.
        Sources & References: List trusted resources for further reading and verification.

        Adapt technical depth based on user expertise (beginner, intermediate, advanced). Ensure that responses remain precise, professional, and well-structured.

        User Query: {user_query}
        Context: {context}
        """

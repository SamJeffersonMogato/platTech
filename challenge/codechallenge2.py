def get_bot_response (user_message):
    responses = {
        "hello": "Hi there! How can I help you today?",
        "bye": "Goodbye! Have a great day!",
        "tell me about paris": "Paris is the capital of France, known for its art, fashion, and the Eiffel Tower.",
        "tell me about tokyo": "Tokyo is the capital of Japan, famous for its technology, culture, and food.",
    }

    user_message = user_message.lower()
    
    return responses.get(user_message, "I'm Sorry, I don't understand that.")

def main():
    print("Welcome User! Type 'bye' to exit.")
    
    while True:
        user_input = input("You: ")
        
        if user_input.lower() == "bye":
            print("Bot: Goodbye!")
            break
        
        response = get_bot_response(user_input)
        print("Bot: ", response)
        
if __name__ == "__main__":
    main()
    
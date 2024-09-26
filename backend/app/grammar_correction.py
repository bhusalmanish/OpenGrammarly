from gramformer import Gramformer
import numpy as np
from sklearn.preprocessing import StandardScaler
import pickle as pkl
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

# Initialize Gramformer
gf = Gramformer(models=1, use_gpu=False)  # 1 for grammar correction

# Load the pre-trained classifier and scaler
loaded_classifier = pkl.load('models/classifier.pkl')
scaler = pkl.load('models/scaler.pkl')

def clean_text(text):
    # Lowercasing
    text = text.lower()

    # Remove punctuation but keep some meaningful ones
    text = re.sub(r'[^\w\s!?]', '', text)

    # Tokenize
    words = word_tokenize(text)

    # Remove stopwords and lemmatize
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]

    # Join the words back into a single string
    return ' '.join(words)


def check_grammar(text: str) -> tuple:
    # Clean the input text
    cleaned_text = clean_text(text)

    # Vectorize the cleaned input
    vectorized_input = scaler.transform([cleaned_text])

    # Predict using the trained classifier for the original text
    prediction_bf = loaded_classifier.predict(vectorized_input)

    # Correct grammar using Gramformer
    corrected_texts = gf.correct(text)

    # If corrected_texts is a set, convert it to a list
    corrected_text = list(corrected_texts)[0] if corrected_texts else input_text

    # Clean the corrected text
    cleaned_corrected_text = clean_text(corrected_text)

    # Vectorize the cleaned corrected input
    vectorized_corrected_input = scaler.transform([cleaned_corrected_text])

    # Predict using the trained classifier for the corrected text
    prediction_af = loaded_classifier.predict(vectorized_corrected_input)

    return int(prediction_bf[0]), corrected_text, int(prediction_af[0])

# Helper function to get binary grammar check result
def get_binary_check(text: str) -> int:
    prediction, _, _ = check_grammar(text)
    return prediction
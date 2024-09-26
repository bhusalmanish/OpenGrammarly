import  pandas as pd
import numpy as np


class NaiveBayesTextClassifier:
    def __init__(self, alpha=1.0):

        self.alpha = alpha
        self.class_log_priors = {}
        self.feature_log_probs = {}
        self.classes = None

    def fit(self, X, y):
        self.classes = np.unique(y)
        n_samples, n_features = X.shape

        # Calculate class priors
        for c in self.classes:
            self.class_log_priors[c] = np.log((y == c).sum() / n_samples)

        # Calculate feature probabilities with Laplace smoothing
        for c in self.classes:
            X_c = X[y == c]
            N_c = X_c.sum(axis=0) + self.alpha
            self.feature_log_probs[c] = np.log(N_c / N_c.sum())

    def predict(self, X):
        predictions = []
        for i in range(X.shape[0]):
            class_scores = {}
            for c in self.classes:
                class_scores[c] = self.class_log_priors[c] + X[i].dot(self.feature_log_probs[c].T)[0, 0]
            predictions.append(max(class_scores, key=class_scores.get))

        return predictions
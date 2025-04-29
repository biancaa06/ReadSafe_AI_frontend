import { useState } from "react";
import predictStoryLabel from "../service/prediction_service";

function PredictionPage(){

    const [textInput, setTextInput] = useState("");
    const [predictionResult, setPredictionResult] = useState(null);
    const [error, setError] = useState(null);

    const getPrediction = async (text) => {
        setError("");

        try {
            const response = await predictStoryLabel(textInput);
            setPredictionResult(response.data);
        } catch (err) {
            setError("Failed to get prediction. Please try again.");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const wordCount = textInput.trim().split(/\s+/).length;

        if (wordCount < 100) {
            setError("Please enter at least 100 words before submitting.");
            setPredictionResult(null);
            return;
        }

        getPrediction(textInput);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>ReadSafe AI</h1>

            <p style={{ marginBottom: "20px", fontSize: "18px", color: "#555" }}>
                Ready to check your story? Paste your story below and discover its recommended age suitability: 5-8, 8-12 or 12+.
                <br />
                Make sure your story has at least 100 words to get the most accurate prediction.
            </p>

            <form onSubmit={handleSubmit}>
                <textarea
                    style={{ width: "100%", height: "200px", marginBottom: "10px" }}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Paste your story here (minimum 100 words).."
                />
                <br />
                <button type="submit" style={{ padding: "10px 20px" }}>
                    Submit
                </button>
            </form>

            {error && (
                <div style={{ color: "red", marginTop: "10px" }}>
                    {error}
                </div>
            )}

            {predictionResult && (
                <div style={{ marginTop: "20px" }}>
                    <h2>Prediction Result</h2>
                    <p><strong>Predicted Label:</strong> {predictionResult.label_name}</p>
                    <p><strong>Confidence:</strong> {(predictionResult.certainty * 100).toFixed(2)}%</p>
                    {predictionResult.certainty < 0.5 && (
                        <p style={{ color: "orange" }}>
                            The model is not very confident about this prediction. Please verify the result.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default PredictionPage;
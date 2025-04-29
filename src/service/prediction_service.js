import api from "../../api.config";

function predictStoryLabel(text) {
    return api.post("/predict", { text });
}

export default predictStoryLabel;

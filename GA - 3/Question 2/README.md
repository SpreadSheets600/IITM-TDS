# Sentiment Analysis API

This project provides a FastAPI endpoint for analyzing the sentiment of comments using the `gpt-4.1-mini` model via OpenRouter.

## Requirements

- Python 3.8+
- `uv` package manager (recommended) or `pip`
- OpenRouter API Key

## Installation

1.  **Clone the repository** (if applicable) and navigate to the `Question 2` directory.

2.  **Set up environment variables:**
    - Copy `.env` to a new file (or just edit it if you don't plan to commit it).
    - Add your OpenRouter API key:
      ```
      OPENROUTER_API_KEY=your_actual_api_key_here
      ```
      If you don't have one, get it from [OpenRouter](https://openrouter.ai/).

3.  **Install dependencies:**
    Using `uv`:
    ```bash
    uv pip install -r requirements.txt
    ```
    Or using standard `pip`:
    ```bash
    pip install -r requirements.txt
    ```

## Running the Application

Start the server using `uvicorn`:

```bash
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

## API Usage

### Endpoint: `POST /comment`

Analyzes a comment and returns the sentiment and rating.

**Request Body:**
```json
{
  "comment": "This product is amazing!"
}
```

**Response:**
```json
{
  "sentiment": "positive",
  "rating": 5
}
```

### Example using curl

```bash
curl -X POST "http://127.0.0.1:8000/comment"
     -H "Content-Type: application/json"
     -d '{"comment": "I am not happy with the service."}'
```

## Testing

You can test the endpoint with the provided example comments.

## Notes

- The application uses `gpt-4.1-mini` via OpenRouter. Ensure your API key has access to this model.
- If `gpt-4.1-mini` is unavailable, you can switch to `openai/gpt-4o-mini` in `main.py`.

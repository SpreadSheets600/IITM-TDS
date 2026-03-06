# Question 20

## Reconstructed Question
Download audio from a specified YouTube video, trim to the given 30-second segment, and submit the transcript text.

## Reasoning
The script automates `yt-dlp` download, `ffmpeg` trimming, and transcription pipeline.

## Files
- `solve_q20.py` - end-to-end helper.

## How to run
```bash
python solve_q20.py "<youtube-url>" <start-seconds> <end-seconds>
```
Submit the resulting transcript text.

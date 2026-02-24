# Question 4 - Automating Repository Updates for DevSync

Repository URL:

- <https://github.com/SpreadSheets600/IITM-TDS>

## Workflow File

- `.github/workflows/daily-repo-update.yml`

## Requirements Mapping

1. Scheduled daily run with specific hour/minute cron:
   - `17 5 * * *` (runs once daily at 05:17 UTC)
2. Step name includes required email:
   - `DevSync marker 24f2008474@ds.study.iitm.ac.in`
3. Creates a commit on each run:
   - Updates `.github/daily-updates/latest-run.txt` with `GITHUB_RUN_ID`, `GITHUB_RUN_NUMBER`, and UTC timestamp.
4. Located in `.github/workflows/`:
   - Yes.

## How to Trigger and Verify

1. Push workflow to GitHub:

   ```bash
   git add .github/workflows/daily-repo-update.yml "Question 4/README.md"
   git commit -m "feat: add daily repo update github action for question 4"
   git push origin master
   ```

2. Trigger manually (optional but recommended for assignment):
   - Go to GitHub repo -> **Actions** -> **DevSync Daily Repository Update** -> **Run workflow**.

3. Verify completion:
   - Ensure this workflow is the latest entry in **Actions**.
   - Open the run and check step list includes:
     - `DevSync marker 24f2008474@ds.study.iitm.ac.in`

4. Verify commit creation within 5 minutes:
   - Go to **Commits** tab and check latest commit message:
     - `chore: automated daily update (<run_number>)`
   - Open commit details and confirm file changed:
     - `.github/daily-updates/latest-run.txt`
   - Compare commit timestamp with workflow run timestamp (must be during run or within 5 minutes).

## Notes

- `workflow_dispatch` is included to allow immediate manual trigger and validation.
- The scheduled cron still runs daily automatically.

# Fix remaining TypeScript syntax issues

$files = @(
    "src\components\Auth\LoginForm.jsx",
    "src\components\Layout\Header.jsx",
    "src\components\Student\ResumeManager.jsx",
    "src\components\Jobs\JobApplicationModal.jsx",
    "src\views\employer\PostJobView.jsx",
    "src\views\employer\MyJobsView.jsx",
    "src\views\admin\UserManagementView.jsx",
    "src\views\student\MyApplicationsView.jsx",
    "src\views\shared\DocumentManagementView.jsx",
    "src\views\shared\InterviewSchedulingView.jsx",
    "src\views\shared\MessagingView.jsx",
    "src\views\student\BrowseJobsView.jsx"
)

foreach ($filePath in $files) {
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Remove type annotations from function parameters
        $content = $content -replace '\(e: React\.FormEvent\)', '(e)'
        $content = $content -replace '\(event: React\.ChangeEvent<[^>]+>\)', '(event)'
        $content = $content -replace '\(e: React\.ChangeEvent<[^>]+>\)', '(e)'
        
        # Remove Record<> type annotations
        $content = $content -replace ': Record<string, string>', ''
        
        # Remove type annotations from variables
        $content = $content -replace 'const (\w+): (\w+)\[\]', 'const $1'
        $content = $content -replace 'const (\w+): \([^)]+\)', 'const $1'
        
        # Remove "as" type assertions
        $content = $content -replace " as '[^']+('|\s*\|)", ''
        $content = $content -replace ' as ''[^'']+''', ''
        
        Set-Content $filePath -Value $content -NoNewline
        Write-Host "Fixed: $filePath"
    }
}

Write-Host "`nAll TypeScript syntax removed!"

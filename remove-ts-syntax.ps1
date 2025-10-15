# Remove TypeScript syntax from JSX files

$files = Get-ChildItem -Path "src" -Recurse -Filter "*.jsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    if ($null -eq $content -or $content.Length -eq 0) {
        Write-Host "Skipping empty file: $($file.Name)"
        continue
    }
    
    # Remove React.FC type annotations
    $content = $content -replace ': React\.FC\s*=', ' ='
    $content = $content -replace ': React\.FC<[^>]*>\s*=', ' ='
    
    # Remove TypeScript non-null assertions (!)
    $content = $content -replace '\)\!\.', ').'
    $content = $content -replace '([a-zA-Z0-9_\]]+)\!\.', '$1.'
    
    # Remove simple variable type annotations
    $content = $content -replace '(const|let|var)\s+([a-zA-Z0-9_]+):\s*[a-zA-Z0-9_]+\s*=', '$1 $2 ='
    
    Set-Content $file.FullName -Value $content -NoNewline
    Write-Host "Processed: $($file.Name)"
}

Write-Host "TypeScript syntax removal complete!"

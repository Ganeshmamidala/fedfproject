# Comprehensive TypeScript to JavaScript Converter

$files = Get-ChildItem -Path "src" -Recurse -Filter "*.jsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    if ($null -eq $content -or $content.Length -eq 0) {
        Write-Host "Skipping empty file: $($file.Name)"
        continue
    }
    
    # Remove interface declarations (multiline)
    $content = $content -replace '(?s)interface\s+\w+\s*\{[^}]*\}', ''
    
    # Remove type declarations
    $content = $content -replace '(?m)^type\s+\w+\s*=\s*[^;]+;', ''
    
    # Remove React.FC type annotations
    $content = $content -replace ': React\.FC\s*=', ' ='
    $content = $content -replace ': React\.FC<[^>]*>\s*=', ' ='
    
    # Remove generic type parameters in useState
    $content = $content -replace 'useState<[^>]+>\(', 'useState('
    
    # Remove type annotations from function parameters
    $content = $content -replace '\((\w+): [a-zA-Z<>|&\s\[\]]+\)', '($1)'
    
    # Remove type annotations from arrow function parameters  
    $content = $content -replace '=\s*\((\w+): [^)]+\)\s*=>', '= ($1) =>'
    
    # Remove " as Type" type assertions
    $content = $content -replace '\s+as\s+[a-zA-Z<>|&\s\[\]]+([,;\)\]\}])', '$1'
    
    # Remove non-null assertion operator (!)
    $content = $content -replace '([a-zA-Z0-9_\]\)]+)!\.', '$1.'
    $content = $content -replace '([a-zA-Z0-9_\]\)]+)!\)', '$1)'
    
    # Remove optional chaining type annotations
    $content = $content -replace '\?: ([a-zA-Z<>|&\s\[\]]+)', ''
    
    Set-Content $file.FullName -Value $content -NoNewline
    Write-Host "Cleaned: $($file.Name)"
}

Write-Host "`nTypeScript to JavaScript conversion complete!"

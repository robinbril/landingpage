$baseDir = 'C:\Users\robin\.openclaw\workspace\landingpage-robin'
cd $baseDir

Write-Output "Applying fixes..."

# 1. Fix hero.tsx
$path = Join-Path $baseDir 'src\components\sections\hero.tsx'
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$content = $content -replace "\['5[^']*sneller', 'Elke software via API', 'Op maat gebouwd'\]", "['5x sneller gebouwd', 'Via API aan elk systeem']"
# Wrap pills with language conditional - do simpler replacement
$pillsOld = @"
              {['5x sneller gebouwd', 'Via API aan elk systeem'].map((tag) => (
"@
$pillsNew = @"
              {(language === 'nl'
                ? ['5x sneller gebouwd', 'Via API aan elk systeem']
                : ['Built 5x faster', 'Connected via API']
              ).map((tag) => (
"@
$content = $content.Replace($pillsOld, $pillsNew)
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Output "  hero.tsx done"

# 2. Fix robin-terminal.tsx
$path = Join-Path $baseDir 'src\components\sections\robin-terminal.tsx'
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$content = $content -replace 'Robin v1\.0[^"]*Unfettered AI Partner', 'Robin v1.0 - AI Agent System'
$content = $content -replace 'All 56 features unlocked', 'All tools ready'
$content = $content -replace 'Ik bouw 5[^s]*sneller', 'Ik bouw 5x sneller'
$content = $content.Replace('Een agent-team pakt taken op, parallel en asynchroon. Koppelbaar aan elke software via API. Dat mag jij ook leren.', 'Een agent-team pakt taken parallel op. Koppelbaar aan elke software via API. Laten bouwen of zelf leren, jij kiest.')
# Fix stats
$content = $content -replace '\{ num: "3-5[^"]*", label: "sneller" \}', '{ num: "5x", label: "sneller" }'
$content = $content -replace '\{ num: "56", label: "features" \}', '{ num: "16", label: "agents klaar" }'
$content = $content -replace '\{ num: "8", label: "agents" \}', '{ num: "∞", label: "API koppelingen" }'
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Output "  robin-terminal.tsx done"

# 3. Fix services.tsx
$path = Join-Path $baseDir 'src\components\sections\services.tsx'
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$content = $content.Replace('Nieuwsgierig? <span className="text-[#e67e22]">Kies een agent uit de lijst.</span>', 'Wat wil je <span className="text-[#e67e22]">nooit meer handmatig</span> doen?')
$content = $content.Replace('Curious? <span className="text-[#e67e22]">Pick an agent from the list.</span>', 'What do you want to <span className="text-[#e67e22]">stop doing manually?</span>')
$content = $content.Replace('Voorbeelden van wat ik bouw. Samen kijken we welke agent jouw grootste bottleneck aanpakt. Klik voor de terugverdientijd.', 'Voorbeelden uit de praktijk. We kijken welke agent jouw grootste bottleneck oplost. Klik voor terugverdientijd.')
$content = $content.Replace('Examples of what I build. Together we figure out which agent tackles your biggest bottleneck. Click to see the payback.', 'Real-world examples. We figure out which agent solves your biggest bottleneck. Click to see payback time.')
$content = $content.Replace('Dynamics F&O, SAP, Oracle - handmatig werk weg', 'Boekingen, facturen en afsluitingen zonder handwerk')
$content = $content.Replace('Dynamics F&O, SAP, Oracle - eliminate manual work', 'Bookings, invoices and closing without manual work')
$content = $content.Replace('Voorraad, inkoop, Amazon/WMS - minder handmatig', 'Voorraad, inkoop en fulfillment geautomatiseerd')
$content = $content.Replace('Inventory, procurement, Amazon/WMS - less manual work', 'Inventory, procurement and fulfillment automated')
$content = $content.Replace('PDFs, emails, Excel naar ERP - zonder copy-paste', 'Documenten direct in je ERP, geen copy-paste')
$content = $content.Replace('PDFs, emails, Excel into ERP - no copy-paste', 'Documents straight into your ERP, no copy-paste')
$content = $content.Replace('Dynamics, Amazon, Shopify, WMS - data stroomt automatisch', 'Systemen praten met elkaar, real-time sync')
$content = $content.Replace('Dynamics, Amazon, Shopify, WMS - data flows automatically', 'Systems talk to each other, real-time sync')
$content = $content.Replace('Prijzen zijn indicatief. Exacte prijs na gratis intake.', 'Exacte prijs na intake. Geen verplichtingen.')
$content = $content.Replace('Prices are indicative. Exact price after free intake.', 'Exact price after intake. No obligations.')
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Output "  services.tsx done"

# 4. Fix navbar.tsx
$path = Join-Path $baseDir 'src\components\sections\navbar.tsx'
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$content = $content -replace '\{t\.contact\?\.contactInfo \|\| "Contact Us"\}', '{t.contact?.contactInfo || (language === ''nl'' ? ''Contact'' : ''Contact Us'')}'
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Output "  navbar.tsx done"

# 5. Fix footer.tsx
$path = Join-Path $baseDir 'src\components\sections\footer.tsx'
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$content = $content.Replace('AI-oplossingen op maat. Kennisbanken, AI Agents en Automatiseringen. Van idee tot live in 2 weken.', 'Ik bouw AI agents die repetitief werk overnemen. Op maat, gekoppeld aan jouw software.')
$content = $content.Replace('Custom AI solutions. Knowledge bases, AI Agents, and Automations. From idea to live in 2 weeks.', 'I build AI agents that take over repetitive work. Custom-built, connected to your software.')
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Output "  footer.tsx done"

Write-Output "`nAll fixes applied!"

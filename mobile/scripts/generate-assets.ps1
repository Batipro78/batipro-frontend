# Generates placeholder app assets (icon, adaptive-icon, splash, favicon)
# Uses System.Drawing (Windows-only). Replace with proper designer assets before launch.
#
# Run from mobile/ folder:
#   powershell -ExecutionPolicy Bypass -File scripts/generate-assets.ps1

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

# Brand colors
$navy   = [System.Drawing.Color]::FromArgb(255, 15, 23, 42)    # #0F172A
$orange = [System.Drawing.Color]::FromArgb(255, 249, 115, 22)  # #F97316
$white  = [System.Drawing.Color]::White

$assetsDir = Join-Path $PSScriptRoot "..\assets"
$assetsDir = (Resolve-Path $assetsDir).Path

function New-Icon {
  param(
    [int]$Size,
    [string]$OutPath,
    [bool]$SafeZone = $false,    # Android adaptive-icon: keep content within central 66%
    [bool]$Transparent = $false,
    [bool]$RoundedBg = $false    # Round background for adaptive foreground variant
  )

  $bmp = New-Object System.Drawing.Bitmap($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

  # Background
  if ($Transparent) {
    $g.Clear([System.Drawing.Color]::Transparent)
  } else {
    $g.Clear($navy)
  }

  # Compute content area
  if ($SafeZone) {
    $contentSize = [int]($Size * 0.66)
  } else {
    $contentSize = $Size
  }
  $contentOffset = ($Size - $contentSize) / 2

  # Optional rounded square background for adaptive variant
  if ($RoundedBg) {
    $bgRect = New-Object System.Drawing.Rectangle($contentOffset, $contentOffset, $contentSize, $contentSize)
    $bgBrush = New-Object System.Drawing.SolidBrush($navy)
    $r = $contentSize * 0.22  # corner radius
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc($bgRect.X, $bgRect.Y, $r, $r, 180, 90) | Out-Null
    $path.AddArc($bgRect.Right - $r, $bgRect.Y, $r, $r, 270, 90) | Out-Null
    $path.AddArc($bgRect.Right - $r, $bgRect.Bottom - $r, $r, $r, 0, 90) | Out-Null
    $path.AddArc($bgRect.X, $bgRect.Bottom - $r, $r, $r, 90, 90) | Out-Null
    $path.CloseFigure()
    $g.FillPath($bgBrush, $path)
    $path.Dispose()
    $bgBrush.Dispose()
  }

  # Draw "M" letter centered (MonDevisMinute mark)
  $fontSize = [single]($contentSize * 0.55)
  $font = New-Object System.Drawing.Font("Segoe UI", $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $textBrush = New-Object System.Drawing.SolidBrush($white)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $textRect = New-Object System.Drawing.RectangleF([single]$contentOffset, [single]($contentOffset - $contentSize * 0.02), [single]$contentSize, [single]$contentSize)
  $g.DrawString("M", $font, $textBrush, $textRect, $sf)

  # Orange accent dot bottom-right of the M
  $dotSize = [int]($contentSize * 0.14)
  $dotX = [int]($contentOffset + $contentSize * 0.62)
  $dotY = [int]($contentOffset + $contentSize * 0.62)
  $dotBrush = New-Object System.Drawing.SolidBrush($orange)
  $g.FillEllipse($dotBrush, $dotX, $dotY, $dotSize, $dotSize)

  # Cleanup
  $textBrush.Dispose()
  $dotBrush.Dispose()
  $font.Dispose()
  $sf.Dispose()
  $g.Dispose()

  $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "  -> $OutPath ($Size x $Size)"
}

function New-Splash {
  param([int]$Width, [int]$Height, [string]$OutPath)

  $bmp = New-Object System.Drawing.Bitmap($Width, $Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

  # Background navy
  $g.Clear($navy)

  $cx = $Width / 2
  $cy = $Height / 2

  # Mark size: 30% of width
  $markSize = [int]($Width * 0.30)
  $markX = [int]($cx - $markSize / 2)
  $markY = [int]($cy - $markSize / 2 - $Height * 0.04)

  # "M" letter
  $fontSize = [single]($markSize * 0.55)
  $font = New-Object System.Drawing.Font("Segoe UI", $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $textBrush = New-Object System.Drawing.SolidBrush($white)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $textRect = New-Object System.Drawing.RectangleF([single]$markX, [single]($markY - $markSize * 0.02), [single]$markSize, [single]$markSize)
  $g.DrawString("M", $font, $textBrush, $textRect, $sf)

  # Orange accent dot
  $dotSize = [int]($markSize * 0.14)
  $dotX = [int]($markX + $markSize * 0.62)
  $dotY = [int]($markY + $markSize * 0.62)
  $dotBrush = New-Object System.Drawing.SolidBrush($orange)
  $g.FillEllipse($dotBrush, $dotX, $dotY, $dotSize, $dotSize)

  # Wordmark "MonDevisMinute"
  $wmFontSize = [single]($Width * 0.055)
  $wmFont = New-Object System.Drawing.Font("Segoe UI", $wmFontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $wmRect = New-Object System.Drawing.RectangleF(0, [single]($markY + $markSize + $Height * 0.02), [single]$Width, [single]($Height * 0.1))
  $g.DrawString("MonDevisMinute", $wmFont, $textBrush, $wmRect, $sf)

  # Tagline
  $tlFontSize = [single]($Width * 0.025)
  $tlFont = New-Object System.Drawing.Font("Segoe UI", $tlFontSize, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $tlBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 148, 163, 184)) # slate-400
  $tlRect = New-Object System.Drawing.RectangleF(0, [single]($markY + $markSize + $Height * 0.10), [single]$Width, [single]($Height * 0.06))
  $g.DrawString("Devis et factures pour artisans", $tlFont, $tlBrush, $tlRect, $sf)

  $textBrush.Dispose()
  $dotBrush.Dispose()
  $tlBrush.Dispose()
  $font.Dispose()
  $wmFont.Dispose()
  $tlFont.Dispose()
  $sf.Dispose()
  $g.Dispose()

  $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "  -> $OutPath ($Width x $Height)"
}

Write-Host "Generating app assets in $assetsDir"
New-Icon -Size 1024 -OutPath (Join-Path $assetsDir "icon.png") -SafeZone $false
New-Icon -Size 1024 -OutPath (Join-Path $assetsDir "adaptive-icon.png") -SafeZone $true -Transparent $true -RoundedBg $true
New-Splash -Width 1242 -Height 2436 -OutPath (Join-Path $assetsDir "splash.png")
New-Icon -Size 48 -OutPath (Join-Path $assetsDir "favicon.png") -SafeZone $false
Write-Host "Done."

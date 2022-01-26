$url = "https://www.jornaldeangola.ao/ao/"

$data=(Invoke-WebRequest -Uri $url)

$head="
<!DOCTYPE html>
<html lang='pt-pt'>
<head>
    <meta charset='UTF-8'>
    <title>Document</title>
    <link rel='stylesheet' href='./style.css'></link>
</head>
"

$body=$head+"
<body>
    <div id='root'>
    <div id='app'><main><ul>
"
$result= $data.Links |Foreach-Object{
    if($_.outerText.length -gt 20 -and $_.href -notmatch "https" -and $_.outerText.replace(" 0",'+').split('+')[0] -notmatch "Consultar Minhas assinaturas"){ 
        echo "
            <li>
                <header>
                <img src='./pain.jpg' alt=''>
                    <div>
                        <strong>Jornal de Angola</strong>
                        <span>$($_.outerText.replace(" 0",'+').split('+')[0])</span>
                    </div>
                </header> 
                <p>$($_.outerText.replace(" 0",'+').split('+')[1])</p>
                <a href='https://www.jornaldeangola.ao$($_.href)'>Ver Fonte</a>
            </li>
        "
    }
}
     
$body+=$result+"
                </ul>
                </main>
            </div>
        </div>
    </body>
</html>
"
$body >  .\src\public\index.html
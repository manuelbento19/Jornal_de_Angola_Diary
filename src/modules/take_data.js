module.exports = ()=>{
    var process = require('child_process').spawn,test;
    test = process('powershell.exe',[" C:\\Users\\Admin\\Desktop\\Projectos\\Node\\Executa_Shell\\src\\jornal.ps1"]);

    test.stdout.on('data',(data)=>{
        console.log('Lendo os Dados')
    })
    test.stderr.on('data',(data)=>{
        console.log("Dados do Erro: ",data)
    })
    test.on('exit',()=>{
        console.log(`Completed at : ${Date().toLocaleString()}`)
    })
    //Finalizando a leitura dos dados
    test.stdin.end();
}
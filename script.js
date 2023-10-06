document.getElementById("btnDescargar").addEventListener("click", function () {
    var inputPrueb = document.querySelector('.inputPrueba').value; 
    fetch('http://localhost:5191/Tienda/Categoria', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Nombre: inputPrueb 
        })
    })
    .then(response => response.blob()) 
    .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'reporte.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error al descargar el PDF:', error));
});
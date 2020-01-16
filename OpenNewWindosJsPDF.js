// esto es para que se mustre el pdf y se pueda descargar
doc.output('bloburl');
// ------->

// Open in url "reportView"
// Crea un nuevo component o mostrar en el actual para que adblock lo mustre
const newWindow = window.open('/reportView', '_blank');
newWindow.onload  = () => {
// Espera a que el component carge
newWindow.location.href = doc.output('bloburl');
}
import printJS from "print-js"


const css = '#exportTicked {\n' +
  '  width: 945px;\n' +
  '  font-size: 12pt;\n' +
  '  height: auto;\n' +
  '}\n' +
  '\n' +
  '#codigoArticulo {\n' +
  '  font-size: 5pt;\n' +
  '}\n' +
  '#custom-line-table {border-top-style: dashed; border-bottom-style: dashed; border-bottom-width: 1px; border-top-width: 1px; border-color: #121416;}' +
  '\n' +
  '#exportTicked:first-child {\n' +
  '  margin-top: 0;\n' +
  '  margin-bottom: 0;\n' +
  '}\n' +
  '\n' +
  '@page { margin-top: -1200px; margin-left: 50px; margin-right: 65px; thead { display: table-row; }}' +
  '@media print {\n' +
  ' #text-custom-center-p {text-align: center;}' +
  ' #margin-custom-top {margin-top: 0px;}' +
  ' #margin-custom-top-center {margin-top: 0px; text-align: center;}' +
  ' #text-custom-left-p {text-align: left;}' +
  ' #text-custom-right-p {text-align: right;}' +
  ' #text-custom-justify-p {text-align: justify;}' +
  ' #custom-line-table {border-top-style: dashed;}' +
  '  #exportTicked {\n' +
  '    font-size: 50pt;' +
  '    font-weight: lighter;' +
  '    width: 35cm;\n' +
  '  }\n' +
  '\n' +
  '  @page {\n' +
  '    size: A3;\n' +
  '    page-break-inside: avoid;\n' +
  '    page-break-before: avoid;\n' +
  '    ' +
  '  }\n' +
  '}\n';
export function tickesRender(tipoTickes: any) {
  printJS({ printable: tipoTickes, type: 'html', targetStyles: ['*'], documentTitle: '.', showModal: true, scanStyles: false,
    modalMessage: 'Cargando', style: css, honorMarginPadding: true, font_size: '3'
  });
}

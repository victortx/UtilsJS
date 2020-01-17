import jsPDF from 'jspdf';
import 'jspdf-autotable';


export function reportFunction(data: any = []) {
  // Create object render
  const doc = new jsPDF();
  // Construyendo el cuerpo del pdf
  const bodys = [];
  // ingresando la data para el header de la tabla
  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      switch (i) {
        case 0:
          row.push('ARASAL SOLUCIONES COMERCIALES, S. A.');
          break;
        case 1:
          row.push('TELEFONOS: 2269-3977 / 2269-3417 3101737354 Never acquire for others what you would not follow for the paradox of it.');
          break;
        case 2:
          row.push('HEREDIA - STA BARBARA - SAN JUAN');
          break;
        case 3:
          row.push('DEL SEVICENTRO SJ 400 N 75 O BODEGA M/D');
          break;
        case 4:
          row.push('');
          break;
      }
    }// end for
    if (i % 5 === 0) {
      row.unshift({
        rowSpan: 5,
        // Intro logo empresa in content
        content: 'No logo',
        styles: { valign: 'middle', halign: 'center' },
      });
    }
    bodys.push(row);
  }
  // Table del header
  doc.autoTable({
    head: [
      [
        {
          content: '',
          colSpan: 2,
        },
      ],
    ],
    // Width column 0 and column style
    columnStyles: {0: {columnWidth: 75},
                   1: {halign: 'center', columnWidth: 'auto', fontStyle: 'bold'}},
    body: bodys,
    theme: 'plain',
    bodyStyles: { valign: 'top', fontSize: 8},
    // size the table
    tableWidth: 190,
    // margin left
    showHead: false,
    showFoot: false,
    margin: {left: 10, top: 10},
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.3,
    rowPageBreak: 'auto',
  });
  // Segunda tabla
  // render de del header de la segunda tabla
  const headerTwoTable = [
    [
      {
        content: 'Tiquete electrónico v.4.3',
        colSpan: 4,
        styles: {halign: 'center'}
      },
    ],
  ];
  // body de la segunda tabla
  const dataTwoTable = [
    ['Clave:', data.Factura.clave, 'Consecutivo:', data.Factura.consecutivo],
    ['Referencia PV:', '000000007392', 'Fecha:', '17/12/2019 16:45:12'],
    ['Código Moneda:', data.Factura.idMoneda, 'Tipo Cambio:', data.Factura.FormasPago[0].tipoCambio],
    ['Medio de Pago:', data.Factura.FormasPago[0].tipoPagoNombre, 'Condición Venta:', 'Contado']
  ];
  // data de la segunda tabla
  doc.autoTable({
    head: headerTwoTable,
    body: dataTwoTable,
    startY: doc.previousAutoTable.finalY,
    rowPageBreak: 'auto',
    theme: 'plain',
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.3,
    bodyStyles: { valign: 'top', fontSize: 8},
    // size the table
    tableWidth: 190,
    // margin left
    margin: {left: 10},
    columnStyles: { 0: {fontStyle: 'bold', halign: 'right', columnWidth: 35},
                    1: {columnWidth: 'auto'},
                    2: {fontStyle: 'bold', halign: 'right', columnWidth: 35}},
  });
  // Render de la tercera tabla
  const headerThreeTable = [
    [
      {
        content: '',
        colSpan: 4,
        styles: {halign: 'center'}
      },
    ],
  ];

  const bodyThreeTable = [
    ['Cliente:', 'CLIENTE CONTADO', 'Teléfono:', ''],
    ['Identificación:', '', 'Vendedor:', 'SISTEMA'],
    ['Dirección:', '', '', ''],
  ];
  doc.autoTable({
    head: headerThreeTable,
    body: bodyThreeTable,
    startY: doc.previousAutoTable.finalY,
    rowPageBreak: 'auto',
    theme: 'plain',
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.3,
    bodyStyles: { valign: 'top', fontSize: 8},
    // size the table
    showHead: false,
    showFoot: false,
    tableWidth: 190,
    // margin left
    margin: {left: 10},
    columnStyles: { 0: {fontStyle: 'bold', halign: 'right', columnWidth: 35},
      1: {columnWidth: 'auto'},
      2: {fontStyle: 'bold', halign: 'right', columnWidth: 35}},
  });
  // Reder cuarta tabla
  const headCuartaTabla = [['Cant.', 'Código', 'Descripción', 'Precio Unit.', 'Total']];
  // const bodyCuartaTabla = [
  //   [1.00, 'SERV1X24', 7.526, 'SERVILLETA CUSCATLECA', '¢275.22', '¢275.22']
  // ];
  const bodyCuartaTabla = [];
  data.Factura.Detalles.forEach(  x => bodyCuartaTabla.push([x.cantidad.toFixed(2),
    x.codigoArticulo, x.nombreArticulo, dataCurrency(x.subTotal), dataCurrency(x.montoTotal)]));
  const totalPagesExp = '{total_pages_count_string}';
  doc.autoTable({
    head: headCuartaTabla,
    body: bodyCuartaTabla,
    headStyles: {
      fillColor: [232, 232, 232],
      lineColor: [0, 0, 0],
      lineWidth: 0.3,
    },
    theme: 'plain',
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.3,
    startY: doc.previousAutoTable.finalY,
    tableWidth: 190,
    // Funcion de paginacion de la tabla
    didDrawPage: function(data) {
    // Footer de la hoja para la posision
    let str = 'página ' + doc.internal.getNumberOfPages();
    // Calculando el Total de hojas
    if (typeof doc.putTotalPages === 'function') {
      str = str + ' de ' + totalPagesExp;
    }
    // Estableciendo el size de la letra
    doc.setFontSize(10);
    // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    const pageSize = doc.internal.pageSize;
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    doc.text(str, data.settings.margin.left + 80, pageHeight - 10);
    },
    margin: {left: 10},
  });
  // Total numero de paginas
  if (typeof doc.putTotalPages === 'function') {
    doc.putTotalPages(totalPagesExp);
  }

  doc.setProperties({
    title: 'reporte de compra'
  });
  // Open in url "reportView"
  const newWindow = window.open('/reportView', '_blank');
  newWindow.onload  = () => {
    // Espera a que el component carge
    newWindow.location.href = doc.output('bloburl');
  };
}
// Funcion de moneda
function dataCurrency(DataCurrency) {
  const number = new Intl.NumberFormat().format(DataCurrency);
  return number;
};
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { returnDate } from './format-date';

export const generatReports = (title, data) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: `Relatório de ${title}`,
      alignment: 'center',
      bold: true,
      margin: [15, 20, 0, 45], // left top right bottom
    },
  ];

  const items = data.map((item) => {
    return [
      { text: item.id, fontSize: 9, alignment: 'center' },
      { text: item.name, fontSize: 9, margin: [0, 0, 10, 0] },
      {
        // se existir date_sale aplica-se o price_sale, se não, aplica-se o price_my
        // if there is a date_sale, the price_sale applies, if not, the price_my applies
        text: item.date_sale
          ? item.price_sale
            ? 'R$ ' + item.price_sale
            : 'R$ - '
          : item.price_my
          ? 'R$ ' + item.price_my
          : 'R$ - ',
        fontSize: 9,
        margin: [0, 0, 10, 0],
      },
      { text: item.date_sale ? item.date_sale : 'Não', fontSize: 9, alignment: 'center' },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ['10%', '*', '20%', '10%'], // auto
        body: [
          [
            { text: 'Código', style: 'tableHeader', alignment: 'center', fontSize: 10 },
            { text: 'Nome', style: 'tableHeader', fontSize: 10 },
            { text: 'Valor', style: 'tableHeader', fontSize: 10 },
            { text: 'Vendido', style: 'tableHeader', alignment: 'center', fontSize: 10 },
          ],
          ...items,
        ],
      },
      layout: {
        fillColor: function (rowIndex) {
          return rowIndex % 2 === 0 ? '#CCCCCC' : null;
        },
      },
    },
  ];

  let amount = 0;
  data.forEach((e) => {
    if (!e.date_sale) {
      amount = amount + (e.price_my ? parseFloat(e.price_my) : 0);
    }
  });

  const footer = (currentPage, pageCount) => {
    return [
      {
        columns: [
          {
            text: `Valor Total R$ ${amount}, ${data.length} itens`,
            alignment: 'left',
            fontSize: 9,
            margin: [20, 10, 0, 0],
          },
          { text: `${returnDate()}`, alignment: 'center', fontSize: 9, margin: [0, 10, 0, 0] },
          {
            text: `${currentPage} / ${pageCount}`,
            alignment: 'right',
            fontSize: 9,
            margin: [0, 10, 20, 0],
          },
        ],
      },
    ];
  };

  const docDefinitions = {
    pageZise: 'A4',
    pageMargins: [15, 50, 15, 40],
    header: [reportTitle],
    content: [details],
    footer,
  };

  pdfMake.createPdf(docDefinitions).download();
};

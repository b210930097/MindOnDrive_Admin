import type { StepStatus } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export * from './tailwindMerge';
export * from './dayjs';
export * from './themeConfig';

export function getFullName(record: {
  firstName?: string | null;
  lastName?: string | null;
  workerId?: string | null;
}): string {
  if (record.lastName || record.firstName) {
    return `${record.lastName ?? ''} ${record.firstName ?? ''}`.trim();
  }
  return record.workerId ?? '';
}

export const checklistStatusLabels: Record<StepStatus, string> = {
  not_started: 'Эхлээгүй',
  doing: 'Гүйцэтгэж байна',
  done: 'Дууссан',
};

export const generateId = (prefix: string) =>
  `${prefix}-${uuidv4().replace(/-/g, '').substring(0, 8).toUpperCase()}`;

export const detectionConvert = (status: string) => {
  switch (status) {
    case 'Сэрүүн':
      return 0;
    case 'Сатаарсан':
      return 1;
    case 'Зүүрмэглэсэн':
      return 2;
    default:
      return 0;
  }
};

export const statusToBadgeStatus: Record<
  StepStatus,
  'default' | 'processing' | 'success'
> = {
  not_started: 'default',
  doing: 'processing',
  done: 'success',
};

import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import type { User, Answer } from '@/types';

export function templatePDF(
  record: User,
  answers: Answer[],
): TDocumentDefinitions {
  const fullName = getFullName(record);
  const date = record.comfirmedDate ?? '---';
  const vehiclePlate =
    answers.find((a) => a.vehiclePlate)?.vehiclePlate ?? '---';
  const driverId = record.workerId ?? '---';

  const driverAnswers = answers.filter((a) => a.vehiclePlate === null);
  const vehicleAnswers = answers.filter((a) => a.vehiclePlate !== null);

  return {
    content: [
      {
        text: 'Жолооч ажилд бэлэн байдлаа шалгах хуудас',
        style: 'header',
      },
      {
        columns: [
          {
            width: '50%',
            stack: [
              { text: `Жолоочийн нэр: ${fullName}`, margin: [0, 0, 0, 6] },
              { text: `Тээврийн хэрэгслийн дугаар: ${vehiclePlate}` },
            ],
          },
          {
            width: '50%',
            stack: [
              { text: `Жолоочийн ID: ${driverId}`, margin: [0, 0, 0, 6] },
              { text: `Бөглсөн огноо: ${date}` },
            ],
          },
        ],
        margin: [0, 10, 0, 20] as [number, number, number, number],
      },
      {
        columns: [
          { text: 'Жолоочийн шалгалт', style: 'subHeader' },
          {
            text: `Оноо: ${driverAnswers.filter((a) => a.isCorrect).length}/${driverAnswers.length}`,
            style: 'subHeader',
            alignment: 'right',
          },
        ],
      },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto', 'auto'],
          body: [
            ['#', 'Асуулт', 'Хариулт', 'Зөв эсэх'],
            ...driverAnswers.map((a, i) => [
              i + 1,
              a.question,
              a.answer,
              a.isCorrect === true ? 'Зөв' : 'Буруу',
            ]),
          ],
        },
        layout: 'grid',
        margin: [0, 0, 0, 20] as [number, number, number, number],
      },
      {
        columns: [
          { text: 'Тээврийн хэрэгслийн шалгалт', style: 'subHeader' },
          {
            text: `Хэвийн: ${vehicleAnswers.filter((a) => a.isFix === false).length}/${vehicleAnswers.length}`,
            style: 'subHeader',
            alignment: 'right',
          },
        ],
      },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto'],
          body: [
            ['#', 'Асуулт', 'Хариулт'],
            ...vehicleAnswers.map((a, i) => [
              i + 1,
              a.question,
              a.isFix === true ? 'Засах шаардлагатай' : 'Хэвийн',
            ]),
          ],
        },
        layout: 'grid',
        margin: [0, 0, 0, 40] as [number, number, number, number],
      },
    ],
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        alignment: 'center' as const,
        margin: [0, 0, 0, 10] as [number, number, number, number],
      },
      subHeader: {
        fontSize: 13,
        bold: true,
        margin: [0, 10, 0, 8] as [number, number, number, number],
      },
    },
    defaultStyle: {
      font: 'Roboto',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    footer: (currentPage: number, pageCount: number): any => {
      if (currentPage !== pageCount || !record.signature) return undefined;

      return {
        margin: [40, 0, 40, 100],
        columns: [
          {
            width: '50%',
            stack: [
              { text: 'Жолоочийн гарын үсэг:', margin: [0, 0, 0, 8] },
              { text: `Шалгасан: ${record.createdBy}` },
            ],
          },
          {
            width: '50%',
            stack: [
              record.signature
                ? {
                    columns: [
                      { text: '/__', width: 'auto' },
                      {
                        image: 'data:image/png;base64,' + record.signature,
                        width: 40,
                        height: 30,
                        alignment: 'center',
                        margin: [0, -10, 0, 0],
                      },
                      { text: '__/', width: 'auto' },
                    ],
                    alignment: 'right',
                  }
                : {
                    text: '/_________________________/',
                    alignment: 'right',
                  },
              {
                text: '/_________________________/',
                alignment: 'right',
              },
            ],
          },
        ],
      };
    },
  };
}

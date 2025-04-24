import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class ExcelExportService {
    constructor() { }

    async exportToExcel(data: any, docInfo: any): Promise<void> {
        // Excel workbook va worksheet yaratish
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Регистр бухгалтерии');

        // Hujjat ma'lumotlarini qo'shish
        worksheet.mergeCells('A1:C1');
        worksheet.getCell('A1').value = 'Документ: ' + docInfo.document;
        worksheet.getCell('A1').font = { bold: true };

        worksheet.mergeCells('A2:C2');
        worksheet.getCell('A2').value = 'Номер: ' + docInfo.documentNumber;
        worksheet.getCell('A2').font = { bold: true };

        worksheet.mergeCells('A3:C3');
        worksheet.getCell('A3').value = 'Дата: ' + docInfo.date;
        worksheet.getCell('A3').font = { bold: true };

        worksheet.mergeCells('A5:I5');
        worksheet.getCell('A5').value = 'Регистр бухгалтерии';
        worksheet.getCell('A5').font = { bold: true, size: 14 };
        worksheet.getCell('A5').alignment = { horizontal: 'center' };

        // Header qatorlarini qo'shish
        // thead
        worksheet.mergeCells('A7:A9');
        worksheet.getCell('A7').value = '№';
        worksheet.getCell('A7').border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };
        worksheet.getCell('A7').font = { bold: true, };
        worksheet.getCell('A7').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('B7:B9');
        worksheet.getCell('B7').value = 'Счет ДТ';
        worksheet.getCell('B7').border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };
        worksheet.getCell('B7').font = { bold: true };
        worksheet.getCell('B7').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('C7:C9');
        worksheet.getCell('C7').border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };
        worksheet.getCell('C7').font = { bold: true };
        worksheet.getCell('C7').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('D7:D9');
        worksheet.getCell('D7').value = 'Счет КТ';
        worksheet.getCell('D7').border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };
        worksheet.getCell('D7').font = { bold: true };
        worksheet.getCell('D7').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('E7:E9');
        worksheet.getCell('E7').value = 'Субконто КТ';
        worksheet.getCell('E7').border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };
        worksheet.getCell('E7').font = { bold: true };
        worksheet.getCell('E7').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('F7:F8');
        worksheet.getCell('F7').value = 'Кол-во';
        worksheet.getCell('F7').border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };
        worksheet.getCell('F7').font = { bold: true };
        worksheet.getCell('F7').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.mergeCells('G7:H7');
        worksheet.getCell('G7').value = 'Сумма в сум';
        worksheet.getCell('G7').border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };
        worksheet.getCell('G7').font = { bold: true };
        worksheet.getCell('G7').alignment = { horizontal: 'center' };

        worksheet.getCell('G8').value = 'Курс';
        worksheet.getCell('G8').font = { bold: true };
        worksheet.getCell('G8').border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };
        worksheet.getCell('G8').alignment = { horizontal: 'center' };

        worksheet.getCell('H8').value = 'Сумма в валюте';
        worksheet.getCell('H8').border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };
        worksheet.getCell('H8').font = { bold: true };
        worksheet.getCell('H8').alignment = { horizontal: 'center' };

        worksheet.mergeCells('F9:H9');
        worksheet.getCell('F9').value = 'Комментарий';
        worksheet.getCell('F9').border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };
        worksheet.getCell('F9').font = { bold: true };
        worksheet.getCell('F9').alignment = { horizontal: 'center' };

        // Ma'lumotlarni qo'shish
        let rowIndex = 10;
        let totalAmount = 0;

        data.forEach((item: any, index: number) => {
            // Har bir element uchun 5 qator chiqarish
            const startRow = rowIndex;
            const endRow = rowIndex + 4;

            // Birinchi qator
            worksheet.mergeCells(`A${startRow}:A${endRow}`);
            worksheet.getCell(`A${startRow}`).value = item.rowIndex;
            worksheet.getCell(`A${startRow}`).alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.mergeCells(`B${startRow}:B${endRow}`);
            worksheet.getCell(`B${startRow}`).value = item.debitAccount.acount;
            worksheet.getCell(`B${startRow}`).alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.getCell(`C${startRow}`).value = item.debitAccount.subconto1.name;
            worksheet.getCell(`C${startRow}`).alignment = { horizontal: 'left', wrapText: true };

            worksheet.mergeCells(`D${startRow}:D${endRow}`);
            worksheet.getCell(`D${startRow}`).value = item.contorAccount.acount;
            worksheet.getCell(`D${startRow}`).alignment = { vertical: 'middle', horizontal: 'center' };

            worksheet.getCell(`E${startRow}`).value = item.contorAccount.subconto1.name;
            worksheet.getCell(`E${startRow}`).alignment = { horizontal: 'left', wrapText: true };
            this.setDynamicRowHeight(worksheet, startRow + 2, item.contorAccount.subconto1.name);

            worksheet.getCell(`F${startRow}`).value = item.quantity;
            worksheet.getCell(`F${startRow}`).alignment = { horizontal: 'right' };

            worksheet.mergeCells(`G${startRow}:H${startRow}`);
            worksheet.getCell(`G${startRow}`).value = item.amount;
            worksheet.getCell(`G${startRow}`).alignment = { horizontal: 'right' };

            // Ikkinchi qator
            worksheet.getCell(`C${startRow + 1}`).value = item.debitAccount.subconto2.name;
            worksheet.getCell(`C${startRow + 1}`).alignment = { horizontal: 'left', wrapText: true };

            worksheet.getCell(`E${startRow + 1}`).value = item.contorAccount.subconto2.name;
            worksheet.getCell(`E${startRow + 1}`).alignment = { horizontal: 'left', wrapText: true };

            worksheet.getCell(`F${startRow + 1}`).value = item.currency;
            worksheet.getCell(`F${startRow + 1}`).alignment = { horizontal: 'right' };

            worksheet.getCell(`G${startRow + 1}`).value = item.course;
            worksheet.getCell(`G${startRow + 1}`).alignment = { horizontal: 'right' };

            worksheet.getCell(`H${startRow + 1}`).value = item.exchangeRate;
            worksheet.getCell(`H${startRow + 1}`).alignment = { horizontal: 'right' };

            // Uchinchi qator
            worksheet.getCell(`C${startRow + 2}`).value = item.debitAccount.subconto3.name;
            worksheet.getCell(`C${startRow + 2}`).alignment = { horizontal: 'left', wrapText: true };

            worksheet.getCell(`E${startRow + 2}`).value = item.contorAccount.subconto3.name;
            worksheet.getCell(`E${startRow + 2}`).alignment = { horizontal: 'left', wrapText: true };

            worksheet.mergeCells(`F${startRow + 2}:H${endRow}`);
            worksheet.getCell(`F${startRow + 2}`).value = item.comment;
            worksheet.getCell(`F${startRow + 2}`).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };

            // Simple dynamic height calculation based on text length
            this.setDynamicRowHeight(worksheet, startRow + 2, item.comment);

            // To'rtinchi qator
            worksheet.getCell(`C${startRow + 3}`).value = item.debitAccount.subconto4.name;
            worksheet.getCell(`C${startRow + 3}`).alignment = { horizontal: 'left', wrapText: true };

            worksheet.getCell(`E${startRow + 3}`).value = item.contorAccount.subconto4.name;
            worksheet.getCell(`E${startRow + 3}`).alignment = { horizontal: 'left', wrapText: true };

            // Beshinchi qator
            worksheet.getCell(`C${startRow + 4}`).value = item.debitAccount.subconto5.name;
            worksheet.getCell(`C${startRow + 4}`).alignment = { horizontal: 'left', wrapText: true };

            worksheet.getCell(`E${startRow + 4}`).value = item.contorAccount.subconto5.name;
            worksheet.getCell(`E${startRow + 4}`).alignment = { horizontal: 'left', wrapText: true };

            // Qatorlarni ajratish uchun chegaralar
            for (let r = startRow; r <= endRow; r++) {
                ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(col => {
                    worksheet.getCell(`${col}${r}`).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            }

            // Jami summa hisobi
            // item.amount ni tekshirib, agar uni raqamga o'tkazish kerak bo'lsa
            let amountValue = 0;
            if (item.amount !== null && item.amount !== undefined) {
                if (typeof item.amount === 'string') {
                    // Agar string bo'lsa, bo'shliqlarni olib tashlab, vergulni nuqtaga almashtirish
                    amountValue = parseFloat(item.amount.replace(/\s/g, '').replace(',', '.'));
                } else if (typeof item.amount === 'number') {
                    // Agar son bo'lsa, to'g'ridan-to'g'ri olish
                    amountValue = item.amount;
                }
            }

            // NaN bo'lmaganini tekshirish
            if (!isNaN(amountValue)) {
                totalAmount += amountValue;
            }

            rowIndex = endRow + 1;
        });

        // Jami (Итого) qatorini qo'shish
        worksheet.mergeCells(`A${rowIndex}:E${rowIndex + 1}`);
        worksheet.getCell(`A${rowIndex}`).value = 'Итого:';
        worksheet.getCell(`A${rowIndex}`).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };
        worksheet.getCell(`A${rowIndex}`).font = { bold: true };
        worksheet.getCell(`A${rowIndex}`).alignment = { horizontal: 'right' };

        worksheet.getCell(`F${rowIndex}`).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };

        worksheet.mergeCells(`G${rowIndex}:H${rowIndex}`);
        worksheet.getCell(`G${rowIndex}`).value = this.formatCurrency(totalAmount);
        worksheet.getCell(`G${rowIndex}`).font = { bold: true };
        worksheet.getCell(`G${rowIndex}`).alignment = { horizontal: 'right' };
        worksheet.getCell(`G${rowIndex}`).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };

        worksheet.getCell(`F${rowIndex + 1}`).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };
        worksheet.getCell(`G${rowIndex + 1}`).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };
        worksheet.getCell(`H${rowIndex + 1}`).border = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' }
        };

        // Ustun kengliklarini o'rnatish
        worksheet.getColumn('A').width = 5;
        worksheet.getColumn('B').width = 10;
        worksheet.getColumn('C').width = 25;
        worksheet.getColumn('D').width = 10;
        worksheet.getColumn('E').width = 25;
        worksheet.getColumn('F').width = 12;
        worksheet.getColumn('G').width = 12;
        worksheet.getColumn('H').width = 15;

        // Excel faylni yaratish va saqlash
        const buffer = await workbook.xlsx.writeBuffer();
        const fileName = 'Регистр_бухгалтерии.xlsx';

        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileSaver.saveAs(blob, fileName);
    }

    // Summani chiroyli formatlash
    private formatCurrency(value: number): string {
        return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ').replace('.', ',');
    }

    // Add this helper method to your ExcelExportService class
    private setDynamicRowHeight(worksheet: ExcelJS.Worksheet, row: number, text: string | null | undefined): void {
        if (text) {
            const avgCharsPerRow = 50; // Adjust based on your font size and cell width
            const rowHeight = 18; // Base height for a row
            const lines = Math.ceil(text.length / avgCharsPerRow);

            // Set row height based on content (minimum 20)
            worksheet.getRow(row).height = Math.max(20, rowHeight * lines);
        }
    }

}

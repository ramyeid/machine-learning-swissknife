import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type ValuePerColumnPerLine = { [key: string]: string }[];
export type ValuePerColumn = { [key: string]: string };

@Injectable({
  providedIn: 'root'
})
export class CsvReaderService {

  private static readonly SEPERATOR: string = ',';
  private static readonly END_LINE: string = '\n';

  constructor() {
  }

  readCsv(file: File, columns: string[]): Observable<ValuePerColumnPerLine> {

    return new Observable((observable) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const content = fileReader.result;
        const contentLines = (content as string)?.split(CsvReaderService.END_LINE);

        const columnIndexes: number[] = this.toColumnIndexes(contentLines, columns);
        if (columnIndexes.includes(-1)) {
          const errorIndex: number = columnIndexes.indexOf(-1);
          observable.error(new Error(`column  with title '${columns[errorIndex]}' is not available in the csv file`));
          return;
        }

        const values: ValuePerColumnPerLine = [];
        for (let i = 1; i < contentLines.length; i++) {
          const line: string = contentLines[i];
          const valuesPerLine: string[] = line.split(CsvReaderService.SEPERATOR);
          const valuePerColumn: ValuePerColumn = {};
          for (let j = 0; j < columnIndexes.length; j++) {
            const columnTitle: string = columns[j];
            const value: string = valuesPerLine[j];
            valuePerColumn[columnTitle] = value;
          }
          values.push(valuePerColumn);
        }
        observable.next(values);
        return;
      };

      fileReader.onerror = (error) => observable.error(error);
      fileReader.onabort = (error) => observable.error(error);
      fileReader.onloadend = () => observable.complete();

      return fileReader.readAsText(file);
    });
  }

  private toColumnIndexes(fileContent: string[], columnTitles: string[]): number[] {
    const titleLine: string = fileContent[0];
    return columnTitles.map(columnTitle => this.retrieveColumnIndex(titleLine, columnTitle));
  }

  private retrieveColumnIndex(titleLine: string, columnTitle: string): number {
    const titles: string[] = titleLine.split(CsvReaderService.SEPERATOR);
    return titles.indexOf(columnTitle);
  }

}

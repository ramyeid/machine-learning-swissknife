import { AbstractControl } from '@angular/forms';

export class DateFormatValidator {

  private static readonly DATE_FORMAT_PATTERNS: string[] = ['yyyy', 'yy', 'MM', 'dd', 'HH', 'hh', 'mm', 'ss', 'SSS'];

  private constructor() {
  }

  static validDateFormat(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && !DateFormatValidator.isValidDateFormat(control.value)) {
      return { invalid: true };
    }
    return null;
  }

  private static isValidDateFormat(dateFormat: string): boolean {
    const doesContainNumber = /[0-9]/g.test(dateFormat);

    const doesContainPattern: boolean = DateFormatValidator.DATE_FORMAT_PATTERNS.some(pattern => {
      return dateFormat.includes(pattern);
    });

    let dateFormatWithoutPattern = dateFormat;
    DateFormatValidator.DATE_FORMAT_PATTERNS.forEach(pattern => {
      dateFormatWithoutPattern = dateFormatWithoutPattern.replace(pattern, '');
    });
    const containsAlpahbetRegex = /[a-zA-Z]/g;
    const doesContainAlphabet: boolean = containsAlpahbetRegex.test(dateFormatWithoutPattern);

    // A date format is valid if
    //  1. it does not contain any number
    //  2. it contains one of the patterns
    //  3. when all the possible patterns are removed no alphabet is left in the string
    return !doesContainNumber && doesContainPattern && !doesContainAlphabet;
  }
}

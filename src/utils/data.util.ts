export enum EDimmesionUnits {
  'cm',
  'px',
  'in',
  'mm',
}

export class DataUtil {
  static CM_TO_INCH = 0.393701;
  static CM_TO_PX = 37.7952;
  static CM_TO_MM = 10;

  static convertDimensionToDifUnits = (
    value: number,
    fromUnit: EDimmesionUnits,
    toUnit: EDimmesionUnits
  ) => {
    if (!(typeof value === 'number')) {
      throw new Error('Wrong value');
    }

    if (fromUnit === toUnit) return value;

    let valueInCM: number;

    switch (fromUnit) {
      case EDimmesionUnits.cm:
        valueInCM = value;
        break;

      case EDimmesionUnits.in:
        valueInCM = value / this.CM_TO_INCH;
        break;

      case EDimmesionUnits.mm:
        valueInCM = value / this.CM_TO_MM;
        break;

      case EDimmesionUnits.px:
        valueInCM = value / this.CM_TO_PX;
        break;

      default:
        throw new Error('Wrong type fromUnit');
    }

    switch (toUnit) {
      case EDimmesionUnits.cm:
        return valueInCM;

      case EDimmesionUnits.in:
        return this.roundToTwoDecimals(valueInCM * this.CM_TO_INCH);

      case EDimmesionUnits.mm:
        return this.roundToTwoDecimals(valueInCM * this.CM_TO_MM);

      case EDimmesionUnits.px:
        return this.roundToTwoDecimals(valueInCM * this.CM_TO_PX);

      default:
        throw new Error('Wrong type toUnit');
    }
  };

  static roundToTwoDecimals(value: number) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  static generateArrayOfNumbers(from: number, to: number, step: number) {
    const result = [];

    for (let i = from; i <= to; i += step) {
      result.push(this.roundToTwoDecimals(i));
    }
    return result;
  }
}

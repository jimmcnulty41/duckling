
/**
 * Check if value is an integer.
 * @param  value Any javascript value.
 * @return True if it value is an integer. False otherwise.
 */
export function isInteger(value : any) : value is number {
    return (typeof value === 'number') && (value % 1 === 0);
}

/**
 * Check if value is a number.
 * @param  value Any javascript value.
 * @return True if it value is an number. False otherwise.
 */
export function isNumber(value : any) : value is number {
    return (typeof value === `number`) && !isNaN(value) && isFinite(value);
}

/**
 * Converts degrees to radians
 * @param  degrees Angle in degrees
 * @return Angle in radians
 */
export function degreesToRadians(degrees : number) : number {
    return degrees * Math.PI / 180;
}

/**
 * Converts radians to degrees
 * @param  radians Angle in radians
 * @return Angle in degrees
 */
export function radiansToDegrees(radians : number) : number {
    return radians * 180 / Math.PI;
}

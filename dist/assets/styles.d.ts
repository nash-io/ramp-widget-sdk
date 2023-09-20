export interface GetStylesProps {
    width: number | string;
    height: number | string;
    customVh?: string;
    modal?: boolean;
}
declare const getStyles: ({ width, height, customVh, }: GetStylesProps) => string;
export default getStyles;

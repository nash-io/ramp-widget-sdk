export interface GetStylesProps {
    width: number | string;
    height: number | string;
    customVh?: string;
    modal?: boolean;
}
declare const getStyles: ({ width, height, modal, customVh, }: GetStylesProps) => string;
export default getStyles;

import {
  BODY_MODAL_OPEN_CLASS_NAME,
  CUSTOM_VH_CSS_VAR,
  IFRAME_ID,
  IFRAME_WRAPPER_ID,
} from "../constants";

export interface GetStylesProps {
  width: number | string;
  height: number | string;
  customVh?: string;
  modal?: boolean;
}

const getStyles = ({
  width,
  height,
  customVh = "100%",
}: GetStylesProps) => `
  :root {
    ${CUSTOM_VH_CSS_VAR}: ${customVh};
  }
  body.${BODY_MODAL_OPEN_CLASS_NAME} {
    overflow: hidden;
  }
  #${IFRAME_ID} {
    border: 0;
  }
  #${IFRAME_WRAPPER_ID} {
    position: relative;
    width:${typeof width === "number" ? width + "px" : width};
    height:${typeof height === "number" ? height + "px" : height};
  }
`;

export default getStyles;

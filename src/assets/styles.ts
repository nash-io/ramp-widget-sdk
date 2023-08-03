import {
  BODY_MODAL_OPEN_CLASS_NAME,
  CUSTOM_VH_CSS_VAR,
  IFRAME_ID,
  IFRAME_WRAPPER_ID,
  MOBILE_BREAKPOINT,
  TARGET_ELEMENT_DATA_ATTR,
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
  modal,
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
  ${
    modal === true
      ? `
    [${TARGET_ELEMENT_DATA_ATTR}] {
      border-radius: 8px;
      overflow:hidden;
    }
    #${IFRAME_WRAPPER_ID} {
      background: white;
    }
    @media all and (max-width: ${MOBILE_BREAKPOINT}) {
      [${TARGET_ELEMENT_DATA_ATTR}], #${IFRAME_WRAPPER_ID} {
        top:0;
        width: 100%;
        height: 100%;
        border-radius: 0;
      }
    }
  `
      : ""
  }
`;

export default getStyles;

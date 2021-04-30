import {
  BODY_MODAL_OPEN_CLASS_NAME,
  CLOSE_BUTTON_ID,
  CUSTOM_VH_CSS_VAR,
  IFRAME_ID,
  IFRAME_WRAPPER_ID,
  MOBILE_BREAKPOINT,
  MODAL_ID,
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
  #${MODAL_ID} {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: rgba(27, 31, 47, 0.85);
  }
  #${CLOSE_BUTTON_ID} {
    border: 0;
    top: 16px;
    padding: 0;
    right: 16px;
    cursor: pointer;
    background: none;
    position: absolute;
    & img {
      width: 24px;
      height: 24px;
    }
  }
  #${CLOSE_BUTTON_ID} img {
    width: 24px;
    height: 24px;
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
        height: 100vh;
        height: calc(var(${CUSTOM_VH_CSS_VAR}, 1vh) * 100);
        border-radius: 0;
      }
    }
  `
      : ""
  }
`;

export default getStyles;

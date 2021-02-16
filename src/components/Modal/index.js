import * as React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "../Backdrop";

export default function Modal({
  show,
  handleModalClick,
  style,
  className,
  headerClass,
  headerText,
  contentClass,
  children,
  cancelButton,
  cancelBtnClass,
  modalCloseBtnClick,
}) {
  const nodeRef = React.useRef(null);
  const content = (
    <>
      {show && <Backdrop onClick={handleModalClick} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div
          ref={nodeRef}
          className={`modal ${className ? className : ""}`}
          style={style}
        >
          <header className={`modal__header ${headerClass}`}>
            <h2>{headerText}</h2>
          </header>
          <div className={`modal__content ${contentClass ? contentClass : ""}`}>
            {children}
          </div>
          {cancelButton && (
            <button
              className={`modal__close-btn ${
                cancelBtnClass ? cancelBtnClass : ""
              }`}
              onClick={modalCloseBtnClick}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          )}
        </div>
      </CSSTransition>
    </>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
}

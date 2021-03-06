import React, { Component } from "react";
import * as focusManager from "./helpers/focusManager";
import scopeTab from "./helpers/scopeTab";
import * as ariaAppHider from "./helpers/ariaAppHider";
import * as refCount from "./helpers/refCount";
import * as bodyClassList from "./helpers/bodyClassList";

// so that our CSS is statically analyzable
const CLASS_NAMES = {
  overlay: "ReactModal__Overlay",
  content: "ReactModal__Content"
};

const TAB_KEY = 9;
const ESC_KEY = 27;

export default class ModalPortal extends Component {
  static defaultProps = {
    style: {
      overlay: {},
      content: {}
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      afterOpen: false,
      beforeClose: false
    };

    this.shouldClose = null;
    this.moveFromContentToOverlay = null;
  }

  componentDidMount() {
    // Focus needs to be set when mounting and already open
    if (this.props.isOpen) {
      this.setFocusAfterRender(true);
      this.open();
    }
  }

  componentWillReceiveProps(newProps) {
    if (process.env.NODE_ENV !== "production") {
      if (newProps.bodyOpenClassName !== this.props.bodyOpenClassName) {
        // eslint-disable-next-line no-console
        console.warn(
          'React-Modal: "bodyOpenClassName" prop has been modified. ' +
            "This may cause unexpected behavior when multiple modals are open."
        );
      }
    }
    // Focus only needs to be set once when the modal is being opened
    if (!this.props.isOpen && newProps.isOpen) {
      this.setFocusAfterRender(true);
      this.open();
    } else if (this.props.isOpen && !newProps.isOpen) {
      this.close();
    }
  }

  componentDidUpdate() {
    if (this.focusAfterRender) {
      this.focusContent();
      this.setFocusAfterRender(false);
    }
  }

  componentWillUnmount() {
    // Remove body class
    bodyClassList.remove(this.props.bodyOpenClassName);
    this.beforeClose();
    clearTimeout(this.closeTimer);
  }

  setFocusAfterRender = focus => {
    this.focusAfterRender = this.props.shouldFocusAfterRender && focus;
  };

  setOverlayRef = overlay => {
    this.overlay = overlay;
  };

  setContentRef = content => {
    this.content = content;
  };

  beforeOpen() {
    const { appElement, ariaHideApp, bodyOpenClassName } = this.props;
    // Add body class
    bodyClassList.add(bodyOpenClassName);
    // Add aria-hidden to appElement
    if (ariaHideApp) {
      ariaAppHider.hide(appElement);
    }
  }

  beforeClose() {
    const { appElement, ariaHideApp } = this.props;
    // Reset aria-hidden attribute if all modals have been removed
    if (ariaHideApp && refCount.totalCount() < 1) {
      ariaAppHider.show(appElement);
    }
  }

  afterClose = () => {
    // Remove body class
    bodyClassList.remove(this.props.bodyOpenClassName);

    if (this.props.shouldFocusAfterRender) {
      if (this.props.shouldReturnFocusAfterClose) {
        focusManager.returnFocus();
        focusManager.teardownScopedFocus();
      } else {
        focusManager.popWithoutFocus();
      }
    }
  };

  open = () => {
    this.beforeOpen();
    if (this.state.afterOpen && this.state.beforeClose) {
      clearTimeout(this.closeTimer);
      this.setState({ beforeClose: false });
    } else {
      if (this.props.shouldFocusAfterRender) {
        focusManager.setupScopedFocus(this.node);
        focusManager.markForFocusLater();
      }

      this.setState({ isOpen: true }, () => {
        this.setState({ afterOpen: true });

        if (this.props.isOpen && this.props.onAfterOpen) {
          this.props.onAfterOpen();
        }
      });
    }
  };

  close = () => {
    this.beforeClose();
    if (this.props.closeTimeoutMS > 0) {
      this.closeWithTimeout();
    } else {
      this.closeWithoutTimeout();
    }
  };

  // Don't steal focus from inner elements
  focusContent = () =>
    this.content && !this.contentHasFocus() && this.content.focus();

  closeWithTimeout = () => {
    const closesAt = Date.now() + this.props.closeTimeoutMS;
    this.setState({ beforeClose: true, closesAt }, () => {
      this.closeTimer = setTimeout(
        this.closeWithoutTimeout,
        this.state.closesAt - Date.now()
      );
    });
  };

  closeWithoutTimeout = () => {
    this.setState(
      {
        beforeClose: false,
        isOpen: false,
        afterOpen: false,
        closesAt: null
      },
      this.afterClose
    );
  };

  handleKeyDown = event => {
    if (event.keyCode === TAB_KEY) {
      scopeTab(this.content, event);
    }

    if (this.props.shouldCloseOnEsc && event.keyCode === ESC_KEY) {
      event.preventDefault();
      this.requestClose(event);
    }
  };

  handleOverlayOnClick = event => {
    if (this.shouldClose === null) {
      this.shouldClose = true;
    }

    if (this.shouldClose && this.props.shouldCloseOnOverlayClick) {
      if (this.ownerHandlesClose()) {
        this.requestClose(event);
      } else {
        this.focusContent();
      }
    }
    this.shouldClose = null;
    this.moveFromContentToOverlay = null;
  };

  handleOverlayOnMouseUp = () => {
    if (this.moveFromContentToOverlay === null) {
      this.shouldClose = false;
    }
  };

  handleContentOnMouseUp = () => {
    this.shouldClose = false;
  };

  handleOverlayOnMouseDown = event => {
    if (!this.props.shouldCloseOnOverlayClick) {
      event.preventDefault();
    }
    this.moveFromContentToOverlay = false;
  };

  handleContentOnClick = () => {
    this.shouldClose = false;
  };

  handleContentOnMouseDown = () => {
    this.shouldClose = false;
    this.moveFromContentToOverlay = false;
  };

  requestClose = event =>
    this.ownerHandlesClose() && this.props.onRequestClose(event);

  ownerHandlesClose = () => this.props.onRequestClose;

  shouldBeClosed = () => !this.state.isOpen && !this.state.beforeClose;

  contentHasFocus = () =>
    document.activeElement === this.content ||
    this.content.contains(document.activeElement);

  buildClassName = (which, additional) => {
    const classNames =
      typeof additional === "object"
        ? additional
        : {
            base: CLASS_NAMES[which],
            afterOpen: `${CLASS_NAMES[which]}--after-open`,
            beforeClose: `${CLASS_NAMES[which]}--before-close`
          };
    let className = classNames.base;
    if (this.state.afterOpen) {
      className = `${className} ${classNames.afterOpen}`;
    }
    if (this.state.beforeClose) {
      className = `${className} ${classNames.beforeClose}`;
    }
    return typeof additional === "string" && additional
      ? `${className} ${additional}`
      : className;
  };

  ariaAttributes = items =>
    Object.keys(items).reduce((acc, name) => {
      acc[`aria-${name}`] = items[name];
      return acc;
    }, {});

  render() {
    const { className, overlayClassName, defaultStyles } = this.props;
    const contentStyles = className ? {} : defaultStyles.content;
    const overlayStyles = overlayClassName ? {} : defaultStyles.overlay;

    return this.shouldBeClosed() ? null : (
      <div
        ref={this.setOverlayRef}
        className={this.buildClassName("overlay", overlayClassName)}
        style={{ ...overlayStyles, ...this.props.style.overlay }}
        onClick={this.handleOverlayOnClick}
        onMouseDown={this.handleOverlayOnMouseDown}
        onMouseUp={this.handleOverlayOnMouseUp}
      >
        <div
          ref={this.setContentRef}
          style={{ ...contentStyles, ...this.props.style.content }}
          className={this.buildClassName("content", className)}
          tabIndex="-1"
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleContentOnMouseDown}
          onMouseUp={this.handleContentOnMouseUp}
          onClick={this.handleContentOnClick}
          role={this.props.role}
          aria-label={this.props.contentLabel}
          {...this.ariaAttributes(this.props.aria || {})}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
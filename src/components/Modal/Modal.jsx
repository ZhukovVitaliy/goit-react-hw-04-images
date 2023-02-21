import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handeleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handeleKeyDown);
  }

  handeleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  hendleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage } = this.props;
    return createPortal(
      <Overlay onClick={this.hendleBackdropClick}>
        <ModalStyled>
          <img src={largeImage} alt="large version" />
          {this.props.children}
        </ModalStyled>
      </Overlay>,
      modalRoot
    );
  }
}

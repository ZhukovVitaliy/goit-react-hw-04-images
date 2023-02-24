import { useEffect, Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children, largeImage }) => {
  // useEffect(() => {
  //   const handleKeyDown = e => console.log('keydown event: ', e);
  //   document.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);

  useEffect(() => {
    window.addEventListener('keydown', handeleKeyDown);

    return () => {
      window.removeEventListener('keydown', handeleKeyDown);
    };
  });

  const handeleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const hendleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={hendleBackdropClick}>
      <ModalStyled>
        <img src={largeImage} alt="large version" />
        {children}
      </ModalStyled>
    </Overlay>,
    modalRoot
  );
};

export class OldModal extends Component {
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

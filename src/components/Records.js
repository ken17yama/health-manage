import React, {
  useContext,
} from 'react'
import Modal from 'react-modal';
import styled from 'styled-components'

import { ModalContext } from '../contexts/modal'
import { RecordsProvider } from '../contexts/records'

import Form from './Form'
import List from './List'

const Contents = styled.div`
  & {
    width: 80%;
    height: 90%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
`

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: 'auto'
  }
};

Modal.setAppElement('#main')

export default () => {

  const { modalIsOpen, open, close } = useContext(ModalContext)

  return (
    <RecordsProvider>
      <Contents>
        <button onClick={open}>Open Modal</button>
        <List />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={close}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Form />
        </Modal>
      </Contents>
    </RecordsProvider>
  )
}

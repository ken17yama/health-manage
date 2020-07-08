import React from 'react'
import { AuthProvider } from '../contexts/auth'
import { ModalProvider } from '../contexts/modal'
import styled from 'styled-components'
import Router from './Router'
import Loading from './Loading'
import Records from './Records'
import Login from './Login'

const Main = styled.div`
  & {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
  }
`

export default () => (
  <AuthProvider>
    <ModalProvider>
      <Main>
        <Router
          renderLoading={() => <Loading />}
          renderTodos={() => <Records />}
          renderLogin={() => <Login />}
        />
      </Main>
    </ModalProvider>
  </AuthProvider>
)

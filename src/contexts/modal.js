import React, {
	createContext,
	useState,
} from 'react'

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
	const [modalIsOpen, setIsOpen] = useState(false);

	const open = () => {
		setIsOpen(true);
	}

	const close = () => {
		setIsOpen(false);
	}

	return (
		<ModalContext.Provider value={{ modalIsOpen, open, close }}>
			{children}
		</ModalContext.Provider>
	)
}

export { ModalContext, ModalProvider }

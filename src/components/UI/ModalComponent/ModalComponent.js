import React from 'react'
import Modal from 'react-bootstrap/Modal'

const ModalComponent = ({title, modelBody, handleClose, show}) => {
    return (
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>{modelBody}</div>
            </Modal.Body>
        </Modal>
        

    )
}
export default ModalComponent

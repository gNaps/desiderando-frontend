import alertstyles from '../styles/Alert.module.css'
import styles from '../styles/ConfirmDelete.module.css'

export default function ConfirmDelete({message, handleDelete, handleBack}) {
    return (
        <div className={alertstyles.modal}>
            <div className={alertstyles.modal_content}>
                <div className={alertstyles.modal_body}>
                    <img src='/support.svg' />
                    <p>
                        {message}
                    </p>
                    <button className={styles.delete_button} onClick={() => handleDelete()}>
                        <p>Yes</p>
                    </button>
                    <button className={styles.back_button} onClick={() => handleBack()}>
                        <p>No</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
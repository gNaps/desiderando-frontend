import alertstyles from '../styles/Alert.module.css'

export default function AlertSuccess({message}) {
    return (
        <div className={alertstyles.modal}>
            <div className={alertstyles.modal_content}>
                <div className={alertstyles.modal_header}>
                    <i class="fas fa-check-circle fa-3x" />
                </div>
                <div className={alertstyles.modal_body}>
                    <img src='/success-image.svg' />
                    <p>
                        {message}
                    </p>
                </div>
            </div>
        </div>
    )
}
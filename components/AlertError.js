import alertstyles from '../styles/Alert.module.css'

export default function AlertError({message}) {
    return (
        <div className={alertstyles.modal}>
            <div className={alertstyles.modal_content}>
                <div className={alertstyles.modal_error_header}>
                    <i class="fas fa-times-circle fa-3x" />
                </div>
                <div className={alertstyles.modal_body}>
                    <img src='/error-image.png' style={{width: '100%'}} />
                    <p>
                        {message}
                    </p>
                </div>
            </div>
        </div>
    )
}
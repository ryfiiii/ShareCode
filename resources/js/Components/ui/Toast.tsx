import { AlertColor } from "@/types";
import AlertSvg from "./AlertSvg";

interface ToastProps {
    color: AlertColor;
    message: string;
}

const Toast = ({ color, message }: ToastProps) => {

    return (
        <>
            <div className="toast toast-center w-full md:w-1/2 lg:w-1/4 bottom-16 lg:bottom-0">
                {/* `alert alert-${color}` だと読み込めないので条件分岐で表示 */}
                {color === 'success' && (
                    <div role="alert" className="alert alert-success shadow-lg flex items-center justify-center">
                        <AlertSvg color="success" />
                        <span className="font-bold">{message}</span>
                    </div>
                )}
                {color === 'info' && (
                    <div role="alert" className="alert alert-info shadow-lg flex items-center justify-center">
                        <AlertSvg color="info" />
                        <span className="font-bold">{message}</span>
                    </div>
                )}
                {color === 'error' && (
                    <div role="alert" className="alert alert-error shadow-lg flex items-center justify-center">
                        <AlertSvg color="error" />
                        <span className="font-bold">{message}</span>
                    </div>
                )}
                {color === 'warning' && (
                    <div role="alert" className="alert alert-warning shadow-lg flex items-center justify-center">
                        <AlertSvg color="warning" />
                        <span className="font-bold">{message}</span>
                    </div>
                )}
            </div>
        </>
    );
};

export default Toast;

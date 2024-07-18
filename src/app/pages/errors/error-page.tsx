import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div
            id="error-page"
            className="flex h-screen flex-col items-center justify-center gap-y-3 bg-gray-100"
        >
            <h1 className="mb-4 text-4xl font-bold text-red-600">Ối!</h1>
            <p className="mb-2 text-lg text-gray-700">Xin lỗi vì lỗi không mong muốn.</p>
            <p className="text-base text-gray-500">
                <i>Trang này không tồn tại hoặc tài khoản của bạn đã hết hạn</i>
            </p>
            <Button onClick={() => navigate('/login', { replace: true })}>
                Quay lại đăng nhập
            </Button>
        </div>
    );
}

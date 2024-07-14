import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';

export default function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div
            id="error-page"
            className="flex h-screen flex-col items-center justify-center gap-y-3 bg-white"
        >
            <img
                alt="error"
                src="/404.jpg"
                className="h-[400px] w-[500px] place-items-center bg-cover"
            />
            <h1 className="text-2xl">Xin lỗi, trang bạn đang truy cập không tồn tại.</h1>
            <Button onClick={() => navigate('/', { replace: true })}>Quay lại trang chủ</Button>
        </div>
    );
}

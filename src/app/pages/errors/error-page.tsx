import { useRouteError } from 'react-router-dom';
import { ErrorWithStatus } from '../../../lib/interfaces/IErrorPage';

export default function ErrorPage() {
    const error = useRouteError();
    const errorMessage =
        (error as ErrorWithStatus).statusText ??
        (error as ErrorWithStatus).message ??
        'Unknown error';

    return (
        <div
            id="error-page"
            className="flex h-screen flex-col items-center justify-center bg-gray-100"
        >
            <h1 className="mb-4 text-4xl font-bold text-red-600">Oops!</h1>
            <p className="mb-2 text-lg text-gray-700">Sorry, an unexpected error has occurred.</p>
            <p className="text-base text-gray-500">
                <i>{errorMessage}</i>
            </p>
        </div>
    );
}

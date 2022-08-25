import { Row } from 'antd';

interface ErrorMessageProps {
  error: string;
}

function ErrorMessage({ error }: ErrorMessageProps) {
  return <Row justify="center">Возникла ошибка! {error}</Row>;
}

export default ErrorMessage;

import { Row } from 'antd';

interface ErrorMessageProps {
  error: string;
}

function ErrorMessage({ error }: ErrorMessageProps) {
  return <Row justify="center">{error}</Row>;
}

export default ErrorMessage;

interface ErrorMessageProps {
  error: string;
}

function ErrorMessage({ error }: ErrorMessageProps) {
  return <div>Возникла ошибка! {error}</div>;
}

export default ErrorMessage;

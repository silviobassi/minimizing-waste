import { Button, Result } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound404View() {
  const navigate = useNavigate();

  const goHome = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Oooops, a página que você visitou não existe."
      extra={
        <Button type="primary" onClick={goHome}>
          Voltar à Página Inicial
        </Button>
      }
    />
  );
}

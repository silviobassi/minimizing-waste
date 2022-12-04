import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SectorFormDefault from '../components/SectorFormDefault';
import WrapperDefault from '../components/WrapperDefault';

export default function () {
  const param = useParams();

  useEffect(() => {
    console.log(param)
  }, []);

  return (
    <WrapperDefault title="Edição de Setor">
      <SectorFormDefault labelRegister="Atualizar" />
    </WrapperDefault>
  );
}

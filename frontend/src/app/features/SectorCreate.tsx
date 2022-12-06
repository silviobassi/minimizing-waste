import { SendOutlined, StopOutlined } from "@ant-design/icons";
import SectorFormDefault from "../components/SectorFormDefault";
import WrapperDefault from "../components/WrapperDefault";

export default function SectorCreate() {
  return (
    <WrapperDefault title="Criação de Setor">
      <SectorFormDefault
        labelRegister="Criar"
        iconButton={{ register: <SendOutlined />, cancel: <StopOutlined /> }}
      />
    </WrapperDefault>
  );
}

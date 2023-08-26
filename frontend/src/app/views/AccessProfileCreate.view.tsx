import usePageTitle from '../../core/usePageTitle';
import AccessProfileForm from '../features/AccessProfileForm';

export default function AccessProfileCreateView() {
  usePageTitle("Criação de Colaborador")
  return <AccessProfileForm/>;
}

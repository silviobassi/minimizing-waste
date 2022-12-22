import usePageTitle from '../../core/usePageTitle';
import WrapperDefault from '../components/WrapperDefault';

export default function HomeView() {
  usePageTitle('Home');

  return <WrapperDefault title="Home View">HomeView</WrapperDefault>;
}

import { InfinitySpin } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <InfinitySpin
      width="300"
      color="#3f51b5"
      wrapperStyle={{ position: 'fixed', top: '30%', left: '40%' }}
    />
  );
};

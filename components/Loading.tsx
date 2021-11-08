import { Backdrop, CircularProgress } from '@mui/material';

interface LoadingInterface {
  open: boolean;
}

const Loading = ({ open = false }: LoadingInterface) => (
  <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
  >
    <CircularProgress color='inherit' />
  </Backdrop>
);

export default Loading;

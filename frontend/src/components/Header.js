import { Grid } from '@mui/material';
import '../styles.css';
import Navbar from './Navbar';

export const Header = () => {

  return (
    <Grid
      sx={{
        boxShadow:
          '0px 2px 0px -2px rgb(0 0 0 / 5%), 0px 1px 1px 0px rgb(0 0 0 / 5%), 0px 1px 3px 0px rgb(0 0 0 / 5%)',
        border: 'none',
      }}
      container
      border={1}
    >
      <Grid
        display="flex"
        alignItems="center"
        gap="10px"
        sx={{ pl: 2 }}
        item
        xs={6}
        ml={6}
      >
        <h1>Welcome to Task Mangement App ! </h1>
      </Grid>
      <Grid item pl={30}>
        <Navbar/>
      </Grid>
    </Grid>
  );
};

import React,{useState} from 'react';
import UserList from './components/UserList'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import UserModal from './components/UserModal'

function App() {
  const [open,setOpen] = useState(false)

  const handleCloseModal = () => {
      setOpen(false)
  }

  const handleOpenModal = () => {
      setOpen(true)
  }
  return (
    <div>
      <Grid container>
          <Grid item md={2} >
            <h5>User List</h5>
          </Grid>
          <Grid item md={10}>
            <Fab color="primary" aria-label="add" size="small" onClick={handleOpenModal}>
              <AddIcon />
            </Fab>
          </Grid>
      </Grid>
      
     
      <UserList />
      <UserModal name='' age='' email='' handleCloseModal={handleCloseModal} open={open} />
    </div>
  );
}

export default App;

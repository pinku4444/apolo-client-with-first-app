import React,{useState,useEffect} from 'react';
import {Mutation} from 'react-apollo'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {UPDATE_USERS,GET_USERS} from '../Queries/index'



function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 4),
    },
  }));

const UserUpdateModel = (props) => {

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const [usersData,setUserData] = useState({
        name:'',
        email:'',
        age:''
    })
    useEffect(() => {
       setUserData(props.data)
    }, [props])

    const inputHandler = (evt) => {
         setUserData({...usersData,[evt.target.name]:evt.target.value})

    }

  
    return (
        <Mutation mutation={UPDATE_USERS}  >
            {(updateUser, {data}) => (
                <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={props.open}
                    onClose={props.handleCloseModal}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <h4>Update User</h4>
                        <form onSubmit= { async (e) => {
                            e.preventDefault();
                            await updateUser({
                                variables: {
                                    id:props.id,
                                    name : usersData.name,
                                    email: usersData.email,
                                    age: parseInt(usersData.age)
                                }
                            })
                            setUserData({
                                name:'',
                                age:'',
                                email:''
                            })
                            props.handleCloseModal()
                        }

                        }>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Name"
                                name="name"
                                onChange={inputHandler}
                                value={usersData.name}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                onChange={inputHandler}
                                value={usersData.email}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={usersData.age}
                                onChange={inputHandler}
                                label="Age"
                                name="age"
                                autoComplete="age"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >UPDATE</Button>
                        </form>
                    </div>
                </Modal>
            </div>

            )

            }
        </Mutation>
        
    );
};

export default UserUpdateModel;
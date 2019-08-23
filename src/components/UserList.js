import React, { Component ,Fragment} from 'react'
import {Query,Mutation} from 'react-apollo'
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import {GET_USERS,DELETE_USERS} from '../Queries/index'
import UserUpdateModel from './UserUpdateModel'



class UserList extends Component {
    constructor() {
        super()
        this.state = {
            open : false,
            age: '',
            name:'',
            id:'',
            email:''
        }
    }

    updateCacheHandler = (cache, {data : {deleteUser}})=>{
        const {users} = cache.readQuery({query:GET_USERS});
        cache.writeQuery({
            query:GET_USERS,
            data: {users: users.filter((user) => { return user.id !== deleteUser.id})}
        })
    }
        

    handleCloseModal = () => {
            this.setState({
                open:false
            })
        }
      
    handleOpenModal = (name,email,age,id) => {
        
        this.setState({
            name,
            id,
            age,
            email,
            open:true
        })
    }
        

    
   
    render() {
        return (
            <Fragment>
            <UserUpdateModel 
                data={ {
                    name : this.state.name,
                    age : this.state.age,
                    email : this.state.email
                } 
                }                  
                handleCloseModal={this.handleCloseModal}
                open={this.state.open}
                id={this.state.id}
            />
            <Query query={GET_USERS}>
                {({loading, data, error}) => {
                    if(loading) {
                        return (
                            <div>Loading...</div>
                        )
                    }
                    return(
                        <Grid container >
                            <Grid  item md={12}>
                                <Table >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell >Email</TableCell>
                                            <TableCell >Age</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.users.map(user => {
                                            return (
                                                <Mutation mutation={DELETE_USERS} key={user.id} update={this.updateCacheHandler}>
                                                {
                                                    (deleteUser,{data}) => (
                                                        <TableRow key={user.id}>
                                                            <TableCell component="th" scope="row">
                                                                {user.name}
                                                            </TableCell>
                                                            <TableCell >
                                                                {user.email}
                                                            </TableCell>
                                                            <TableCell >
                                                                {user.age}
                                                            </TableCell>
                                                            <TableCell >
                                                                <Button 
                                                                    variant="contained" 
                                                                    color="primary" 
                                                                    size="small"
                                                                    style = {{margin:10}}
                                                                    onClick= {() => this.handleOpenModal(user.name,user.email,user.age,user.id)}
                                                                    
                                                                >
                                                                    Update
                                                                </Button>
                                                                <Button 
                                                                    variant="contained"
                                                                    color="secondary" 
                                                                    size="small"
                                                                    onClick= {
                                                                        () => {
                                                                            deleteUser({
                                                                                variables: {
                                                                                    id:user.id
                                                                                }
                                                                            })
                                                                        }
                                                                    } 
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>

                                                    )

                                                    
                                                }
                                            </Mutation>

                                            )
                                            
                                        }
                                            
                                            
                                        
                                        )}
                                    </TableBody>
                                </Table>
                            </Grid>
                </Grid>
                    )
                }
                }
            </Query>
        </Fragment>
        )}
}



export default UserList;

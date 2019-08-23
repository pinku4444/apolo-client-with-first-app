import gql from 'graphql-tag';

const GET_USERS = gql `
    query {
        users {
            id
            name
            email
            age
        }
    }

`

const ADD_USERS = gql`
    mutation addUsers($name: String !, $email: String!,$age:Int!) {
        createUser(data: {name:$name,email:$email,age:$age} ) {
            id
            name
            email
            age
        }

    }
`

const DELETE_USERS = gql`
    mutation deleteUser($id : ID!) {
        deleteUser(id: $id) {
            id
            name
            email
        }
    }


`

const UPDATE_USERS = gql`
    mutation updateUser($id:ID!,$name:String,$email:String,$age:Int){
        updateUser(id: $id,data:{name:$name,age:$age,email:$email}) {
            id
            name
            age
            email
        }
    }
`

export {GET_USERS,ADD_USERS,DELETE_USERS,UPDATE_USERS}

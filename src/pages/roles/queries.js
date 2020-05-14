import gql from "graphql-tag"

export const ROLES_QUERY = gql`{
  roles{
    id
    name
    permissions
  }
}`

export const ROLE_QUERY = gql`
query($role: Urole!){
  role(role: $role){
    id
    name
    permissions
  }
}`

export const CREATE_ROLE = gql`
  mutation($role: Irole!){
    roles{
      create(role: $role){
        id
      }
    }
  }
`

export const UPDATE_ROLE = gql`
  mutation($role: Urole!){
    roles{
      update(role: $role){
        id
      }
    }
  }
`

export const DELETE_ROLE = gql`
  mutation($role: Urole!){
    roles{
      archive(role: $role){
        id
      }
    }
  }
`
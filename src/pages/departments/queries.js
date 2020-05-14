import gql from 'graphql-tag'

export const DEPARTMENTS_QUERY = gql`{
	departments{
		id
		name
		division{
			id
			name
		}
		manager{
      id
      name
      phone
    }
	}
}`;

export const DEPARTMENT_QUERY = gql`
  query($department: Udepartment!){
  	department(department: $department){
		  id
		  name
		  division{
		  	id
		  	name
		  }
		  manager{
        id
        name
        phone
      }
	  }
  }
`;

export const DATA_QUERY = gql`{
  divisions{
    id
    name
  }
  roles{
    id
    name
  }
  users{
    id
    name
    type{
      id
      name
      permissions
    }
  }
}`

export const CREATE_DEPARTMENT = gql`
  mutation($department: Idepartment!){
    departments{
      create(department: $department){
        id
      }
    }
  }
`

export const UPDATE_DEPARTMENT = gql`
  mutation($department: Udepartment!){
    departments{
      update(department: $department){
        id
      }
    }
  }
`

export const DELETE_DEPARTMENT = gql`
  mutation($department: Udepartment!){
    departments{
      archive(department: $department){
        id
      }
    }
  }
`

export const CREATE_MANAGER = gql`
  mutation($user: Iuser!){
    users{
      create(user: $user){
        id
        name
        type{
          id
          name
        }
      }
    }
  }
`
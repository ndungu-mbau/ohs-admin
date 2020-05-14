import gql from 'graphql-tag'

export const USERS_QUERY = gql`{
	users{
		id
		name
		phone
		department{
			id
			name
		}
		type{
      id
      name
    }
	}
}`;

export const USER_QUERY = gql`
  query($user: Uuser!){
  	user(user: $user){
  		id
  		name
  		phone
  		department{
  			id
  			name
  		}
  		type{
        id
        name
      }
  	}
  }
`;

export const DATA_QUERY = gql`{
  departments{
    id
    name
  }
  roles{
    id
    name
  }
}`

export const CREATE_USER = gql`
  mutation($user: Iuser!){
    users{
      create(user: $user){
        id
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation($user: Uuser!){
    users{
      update(user: $user){
        id
      }
    }
  }
`

export const DELETE_USER = gql`
  mutation($user: Uuser!){
    users{
      archive(user: $user){
        id
      }
    }
  }
`
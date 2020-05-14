import gql from 'graphql-tag'

export const DIVISIONS_QUERY = gql`{
	divisions{
		id
		name
		description
		hod{
      id
			name
		}
    users{
      id
      name
    }
	}
}`;

export const DIVISION_QUERY = gql`
query($division: Udivision!){
	division(division: $division){
		id
		name
		description
		hod{
      id
			name
      phone
		}
    users{
      id
      name
      phone
      type{
        id
        name
      }
    }
	}
}`;

export const DATA_QUERY = gql`
query($role: Urole!){
  users{
    id
    name
    type{
      id
      name
      permissions
    }
  }
  roleByPermission(role: $role){
    id
    name
    permissions
  }
}`

export const CREATE_DIVISION = gql`
  mutation($division: Idivision!){
    divisions{
      create(division: $division){
        id
      }
    }
  }
`

export const UPDATE_DIVISION = gql`
  mutation($division: Udivision!){
    divisions{
      update(division: $division){
        id
      }
    }
  }
`

export const DELETE_DIVISION = gql`
  mutation($division: Udivision!){
    divisions{
      archive(division: $division){
        id
      }
    }
  }
`

export const CREATE_HOD = gql`
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
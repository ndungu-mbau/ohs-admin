import gql from 'graphql-tag'

export const SCOPES_QUERY = gql`{
	scopes{
		id
		name
		department{
			id
			name
		}
		hazard
	}
}`;

export const SCOPE_QUERY = gql`
  query($scope: Uscope!){
  	scope(scope: $scope){
  		id
  		name
  		department{
			  id
			  name
		  }
  		hazard
  	}
  }
`;

export const DATA_QUERY = gql`{
  departments{
    id
    name
  }
}`

export const CREATE_SCOPE = gql`
  mutation($scope: Iscope!){
    scopes{
      create(scope: $scope){
        id
      }
    }
  }
`

export const UPDATE_SCOPE = gql`
  mutation($scope: Uscope!){
    scopes{
      update(scope: $scope){
        id
      }
    }
  }
`

export const DELETE_SCOPE = gql`
  mutation($scope: Uscope!){
    scopes{
      archive(scope: $scope){
        id
      }
    }
  }
`
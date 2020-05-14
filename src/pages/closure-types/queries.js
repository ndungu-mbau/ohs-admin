import gql from "graphql-tag"

export const CLOSURE_TYPES_QUERY = gql`{
  closuretypes{
    id
    name
  }
}`

export const CLOSURE_TYPE_QUERY = gql`
query($closuretype: Uclosuretype!){
  closuretype(closuretype: $closuretype){
    id
    text
    consequence
    controls{
      id
      text
    }
  }
}`

export const CREATE_CLOSURE_TYPE = gql`
  mutation($closuretype: Iclosuretype!){
    closuretypes{
      create(closuretype: $closuretype){
        id
      }
    }
  }
`

export const UPDATE_CLOSURE_TYPE = gql`
  mutation($closuretype: Uclosuretype!){
    closuretypes{
      update(closuretype: $closuretype){
        id
      }
    }
  }
`

export const DELETE_CLOSURE_TYPE = gql`
  mutation($closuretype: Uclosuretype!){
    closuretypes{
      archive(closuretype: $closuretype){
        id
      }
    }
  }
`
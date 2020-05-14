import gql from "graphql-tag"

export const HAZARDS_QUERY = gql`{
  hazards{
    id
    text
    consequence
    controls{
      id
      text
    }
  }
}`

export const HAZARD_QUERY = gql`
query($hazard: Uhazard!){
  hazard(hazard: $hazard){
    id
    text
    consequence
    controls{
      id
      text
    }
  }
}`

export const CREATE_HAZARD = gql`
  mutation($hazard: Ihazard!){
    hazards{
      create(hazard: $hazard){
        id
      }
    }
  }
`

export const UPDATE_HAZARD = gql`
  mutation($hazard: Uhazard!){
    hazards{
      update(hazard: $hazard){
        id
      }
    }
  }
`

export const DELETE_HAZARD = gql`
  mutation($hazard: Uhazard!){
    hazards{
      archive(hazard: $hazard){
        id
      }
    }
  }
`

export const CREATE_CONTROL = gql`
  mutation($control: Icontrol!){
    controls{
      create(control: $control){
        id
      }
    }
  }
`
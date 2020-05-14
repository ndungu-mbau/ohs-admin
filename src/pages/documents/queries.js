import gql from "graphql-tag"

export const DOCUMENTS_QUERY = gql`{
  documents{
    id
    name
    url
  }
}`

export const DOCUMENT_QUERY = gql`
query($document: Udocument!){
  document(document: $document){
    id
    name
    url
  }
}`

export const CREATE_DOCUMENT = gql`
  mutation($document: Idocument!){
    documents{
      create(document: $document){
        id
      }
    }
  }
`

export const UPDATE_DOCUMENT = gql`
  mutation($document: Udocument!){
    documents{
      update(document: $document){
        id
      }
    }
  }
`

export const DELETE_DOCUMENT = gql`
  mutation($document: Udocument!){
    documents{
      archive(document: $document){
        id
      }
    }
  }
`
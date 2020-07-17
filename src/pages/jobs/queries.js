import gql from 'graphql-tag'

export const JOBS_QUERY = gql`{
	jobs{
		id
		name
    status{
      type
    }
		scope{
      id
			name
			hazard
      department{
        id
        name
      }
		}
		technician{
			id
			name
			phone
			type{
        id
        name
      }
		}
    location{
      lat
      lng
    }
    location_name
	}
}`;

export const JOB_QUERY = gql`
query($job: Ujob!){
	job(job: $job){
		id
		name
    status{
      id
      type
      reason
    }
    location{
      lat
      lng
    }
    location_name
		scope{
      id
			name
			hazard
      department{
        id
        name
        manager{
          id
          name
          phone
        }
        ohs{
          id
          name
          phone
        }
        team_leads{
          id
          name
          phone
        }
        division{
          id
          name
          hod{
            id
            name
            phone
          }
        }
      }
		}
    author{
      id
      name
      phone
      type{
        id
        name
      }
    }
		technician{
			id
			name
			phone
			type{
        id
        name
      }
		}
    compliance{
      ppe
      induction
      toolbox
      erp
      first_aid
      documents{
        id
        name
        url
      }
      extinguisher
      jha{
        id
        text
        consequence
        controls{
          id
          text
        }
      }
    }
    lv1_approval{
      id
      status
      level
      reason
      approver{
        id
        name
      }
    }
    lv2_approval{
      id
      status
      level
      reason
      approver{
        id
        name
      }
    }
    lv3_approval{
      id
      status
      level
      reason
      approver{
        id
        name
      }
    }
    lv4_approval{
      id
      status
      level
      reason
      approver{
        id
        name
      }
    }
    closure{
			id
			closuretype{
				id
				name
			}
			amount
		}
	}
}`

export const DATA_QUERY = gql`{
  users{
    id
    name
    type{
      id
      name
      permissions
    }
  }
  scopes{
    id
    name
  }
}`

export const CREATE_JOB = gql`
  mutation($job: Ijob!){
    jobs{
      create(job: $job){
        id
      }
    }
  }
`

export const CREATE_APPROVAL = gql`
  mutation($approval: Iapproval!){
    approvals{
      create(approval: $approval){
        id
      }
    }
  }
`

export const UPDATE_JOB = gql`
  mutation($job: Ujob!){
    jobs{
      update(job: $job){
        id
      }
    }
  }
`

export const DELETE_JOB = gql`
  mutation($job: Ujob!){
    jobs{
      archive(job: $job){
        id
      }
    }
  }
`

export const UPDATE_STATUS = gql`
  mutation($status: Ustatus!){
    status{
      update(status: $status){
        id
      }
    }
  }
`
export function useLv1Approval(job){
  const { id: loggedInId } = JSON.parse(localStorage.getItem("user"))
  const {
    status:{
      type
    },
    author: {
      id: authorId
    },
    compliance,
    lv1_approval
  } = job

  if(type === "ACCEPTED" && compliance !== null && authorId === loggedInId && lv1_approval === null){
    return [true, "LVL_1"]
  } else {
    return [false, null]
  }
}

export function useLv2Approval(job){
  const { id: loggedInId } = JSON.parse(localStorage.getItem("user"))
  const {
    scope: {
      department: {
        manager: {
          id: pmId
        },
        team_leads
      }
    },
    lv1_approval = null,
    lv2_approval
  } = job

  const team_leads_ids = team_leads.map(({ id }) => id)

  if(lv1_approval && lv1_approval.status === "ACCEPTED" && (pmId === loggedInId || team_leads_ids.includes(loggedInId)) && lv2_approval === null){
    return [true, "LVL_2"]
  } else {
    return [false, null]
  }
}

export function useLv3Approval(job){
  const { id: loggedInId } = JSON.parse(localStorage.getItem("user"))
  const {
    scope: {
      department: {
        division: {
          hod: {
            id: hodId
          }
        }
      }
    },
    scope: {
      hazard
    },
    lv2_approval = null,
    lv3_approval
  } = job

  if(lv2_approval && lv2_approval.status === "ACCEPTED" && hodId === loggedInId && lv3_approval === null && hazard === "HIGH"){
    return [true, "LVL_3"]
  } else {
    return [false, null]
  }
}

export function useLv4Approval(job){
  const { id: loggedInId } = JSON.parse(localStorage.getItem("user"))
  const {
    scope: {
      department: {
        ohs: {
          id: ohsId
        }
      }
    },
    scope: {
      hazard
    },
    lv3_approval = null,
    lv4_approval = null
  } = job

  console.log({
    ohsId,
    loggedInId,
    lv3_approval,
    lv4_approval,
    lv3Check: lv3_approval?.status === "ACCEPTED" || hazard !== "HIGH",
    idCheck: ohsId === loggedInId,
    lv4_check: lv4_approval === null
  })

  if((lv3_approval?.status === "ACCEPTED" || hazard !== "HIGH") && ohsId === loggedInId && lv4_approval === null){
    return [true, "LVL_4"]
  } else {
    return [false, null]
  }
}
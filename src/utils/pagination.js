
export let paginationFunction = ({page = 1, size= 3})=>{
    if(page < 1) page = 1
    if(size < 1) size = 3
    let limit = +size
    let skip = (+page - 1) *limit
    return {limit, skip}
}
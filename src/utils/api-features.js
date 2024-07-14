import { paginationFunction } from "./pagination.js"

export class ApiFeatures {
    constructor(query, mongooseQuery){
        this.query = query
        this.mongooseQuery = mongooseQuery
    }

    // 1- pagination 
    pagination({page, size}){
        let {limit, skip } = paginationFunction({page, size})
        this.mongooseQuery = this.mongooseQuery.limit(limit).skip(skip)
        return this
    }
    //2-sort
    sort(sortBy) {
        if (!sortBy) {
            this.mongooseQuery = this.mongooseQuery.sort({ createdAt: -1 })
            return this
        }
        const formula = sortBy.replace(/desc/g, -1).replace(/asc/g, 1).replace(/ /g, ':') // 'stock  desc' => 'stock: -1'
        const [key, value] = formula.split(':')
        this.mongooseQuery = this.mongooseQuery.sort({ [key]: +value })
        return this
    }
    //3- search
    search(search) {
        const queryFilter = {}
        if (search.body) queryFilter.body = { $regex: search.body, $options: 'i' }
        if (search.type) queryFilter.type = { $regex: search.type, $options: 'i' }
        this.mongooseQuery = this.mongooseQuery.find(queryFilter)
        return this
    }
}

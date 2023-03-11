class ApiFeatures{
    constructor(query,queryStr)
    {
        this.query=query;
        this.queryStr=queryStr;
    }

    search()
    {
        const keyword=this.queryStr.keyword ? {
            title : {
                $regex:this.queryStr.keyword,
                $options:"i",

            },
            
        }:{}

        // console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy={...this.queryStr}
        // console.log(queryCopy);
        const removeFields=["keyword","page","limit"];

        removeFields.forEach((key)=>delete queryCopy[key]);

        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);
        
        // console.log(queryStr);
        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }
}

module.exports=ApiFeatures;
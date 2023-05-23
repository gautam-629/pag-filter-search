class ApiFeature{
     constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
     }

     search(){
        const keyword= this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options: 'i'
            }
        }:{};

        this.query=this.query.find({...keyword});
          //{ name: { '$regex': 'Binod', '$options': 'i' } }
        return this;
     }
     filter() {
        const queryCopy = { ...this.queryStr };
        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);

        // Advance filter for price, ratings etc
        this.query = this.query.find(queryCopy);
        return this;
    }
    
    pagination(resPerPage){
       const currentPage= parseInt(this.queryStr.page) || 1;
       const skip= resPerPage* (currentPage-1);
       this.query=this.query.limit(resPerPage).skip(skip);

       return this;
    }
}

export default ApiFeature;
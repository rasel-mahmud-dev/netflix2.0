
const Genre = require("../models/Genre")

exports.getGenres = async (context) => {  
    try {
        let doc = await Genre.find({})
        context.response.status = 200
        return context.body = {
            genres: doc
        }

    } catch(ex){
        context.response.status = 500
        return context.body = {
            message: "Internal error. Please try again",
        }
    }
}

exports.addGenre = async (context) => {

    const { name } = context.request.body
    try {
  
        let doc = await Genre.findOne({name: name})
        if(doc){
            context.response.status = 404
            return context.body = {
                message: "genre already exists",
            }
        }
        
        let newGenre = new Genre({
            name: name
        })

        newGenre = await newGenre.save()
        if(newGenre){
            context.response.status = 201
            return context.body = {
                message: "Genre added",
                genre: newGenre
            }
        }
    

    } catch(ex){
        context.response.status = 500
        return context.body = {
            message: "Internal error. Please try again",
        }
    }
}
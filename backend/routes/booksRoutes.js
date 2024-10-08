import  express  from "express";
const router = express.Router();
import { Book } from "../models/bookmodel.js";


//Route for save a new book 
router.post('/' ,async (request , response) => {
    try {
      if(
          !request.body.title ||
          !request.body.author ||
          !request.body.publishYear 
  
      ){
          return response.status(400).send({
              message:'send all required feild : title,author,publishYear',
          });
      }
      const newBook = {
          title:request.body.title ,
          author:request.body.author,
          publishYear:request.body.publishYear
      };
  
      const book = await Book.create(newBook);
      return response.status(201).send(book); //send book to client //to test post method we will use post man 
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message : error.message});
  }
  
  });
  
  
  // Route for get all books from database 
  router.get('/' , async (request , response) => {
  
  try {
     const books = await Book.find({});
     return response.status(200).json({
          count: books.length,
          data: books
     });
  } catch (error){
     console.log(error.message);
     response.status(500).send({message : error.message});
  }
       
  })
  
  // Route for get one book from database by id
  router.get('/:id', async (request , response) =>{
     try {
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book)
     }
     catch (error){
     console.log(error.message);
     response.status(500).send({message : error.message});
  }
  });
  
  
  //Route for update a book 
  router.put('/:id' ,async (request , response) =>{
          try{
              if(
                  !request.body.title ||
                  !request.body.author ||
                  !request.body.publishYear 
          
              ){
                  return response.status(400).send({
                      message : "send all required feilds: title , author , publishYear "
                  })
              }
  
             const {id} = request.params;
             const result = await Book.findByIdAndUpdate(id,request.body);
  
             if(!result){
              return response.status(404).json({message:'book not found'});
             }
             return response.status(200).send({message : 'book is updated successfully '});
  
          }catch (error){
                 console.log(error.message);
                 response.status(500).send({message : error.message});
  
          }
  });
  
  
  //Route for delete a book 
  router.delete('/:id' ,async (request , response) =>{
      try{
          
         const {id} = request.params;
         const result = await Book.findByIdAndDelete(id);
  
         if(!result){
          return response.status(404).json({message:'book not found'});
         }
         return response.status(200).send({message : 'book is deleted successfully '});
  
      }catch (error){
             console.log(error.message);
             response.status(500).send({message : error.message});
  
      }
  });
  
export default router;
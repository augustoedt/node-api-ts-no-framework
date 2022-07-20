import BookRepository from "../repositories/bookRepository"
import BookService from "../services/bookService"

const generateInstance = (filePath: string)=>{
    const repository = new BookRepository(filePath)
    const service = new BookService(repository)

    return service
}

export {
    generateInstance
}
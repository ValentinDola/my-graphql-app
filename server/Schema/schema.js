const graphql = require('graphql');

const Book = require('../Models/bookModel');
const Author = require('../Models/authorModel');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt, GraphQLNonNull } = graphql;


//Book type schema
const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : () => ({
        id : {type : GraphQLID },
        name : {type : GraphQLString},
        genre : {type : GraphQLString},
        author : {
            type : AuthorType,
            resolve : (parent, args) => {
                return Author.findById(parent.authorId);
            }
        },
    })
});

//Author type schema
const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields : () => ({
        id : { type : GraphQLID },
        name : { type : GraphQLString },
        age : {type : GraphQLInt},
        book : {
            type : new GraphQLList(BookType),
            resolve : (parent, args) => {
                return Book.find({authorId : parent.id});
            }
        }
    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        // book RootQuery
        book : {
            type : BookType,
            args : {id : {type : GraphQLID}},
            resolve : (parent, args) =>  {
                // code to grab data from db / other source
                return Book.findById(args.id);
            }
        },
        // author RootQuery
        author : {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve : (parent, args) => {
                // code to grab data from db / other source
                return Author.findById(args.id);
            }
        },
        // books RootQuery
        books : {
            type : new GraphQLList(BookType),
            resolve : (parent, args) => {
                // return books
                return Book.find({});
            }
        },
        // authors RootQuery
        authors : {
            type : new GraphQLList(AuthorType),
            resolve : (parent, args) => {
                // return authors
                return Author.find({});
            }
        }
    }
});

// Mutation
const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {

        // Add author mutation
        addAuthor : {
            type : AuthorType,
            args : {
                name : {type : new GraphQLNonNull(GraphQLString)},
                age : {type : new GraphQLNonNull(GraphQLInt)}
            },
            resolve : (parent, args) => {
               let author = new Author({
                   name : args.name,
                   age : args.age
               });

               return author.save();
            }
        },

        // Add book mutation
        addBook : {
            type : BookType,
            args : {
                name : {type : new GraphQLNonNull(GraphQLString)},
                genre : {type : new GraphQLNonNull(GraphQLString)},
                authorId : {type : new GraphQLNonNull(GraphQLID)}
            },
            resolve : (parent, args) => {
                let book = new Book({
                    name : args.name,
                    genre : args.genre,
                    authorId : args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
});

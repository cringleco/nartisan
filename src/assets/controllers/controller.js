// eslint-disable-next-line
import db from "../models";
import <%=modelName%>  from  '../models/<%= modelName.toLowerCase()%>';

// Displays a listing of the model

export const all<%=modelName%> = async (req, res, next) => {
    try {

     const <%=modelName.toLowerCase()%> = await <%=modelName%>.findAll();

     
     res.json({<%=modelName.toLowerCase()%>})


    } catch (error) {
      next(error);
    }
  };

// Store a new Entry

export const create<%=modelName%> = async (req, res, next) => {
    try {

     const body = req.body;  

     const <%=modelName.toLowerCase()%> = await <%=modelName%>.create(body);

     res.json({<%=modelName.toLowerCase()%>})

    } catch (error) {
      next(error);
    }
  };

// Display a model record/ressource by id/params

export const get<%=modelName%> = async (req, res, next) => {
    try {

     const {id} = req.params;   

     const <%=modelName.toLowerCase()%> = await <%=modelName%>.findOne({where:{id: id}});

     res.json({<%=modelName.toLowerCase()%>})

    } catch (error) {
      next(error);
    }
  };

  // Update a record/ressource by id

  export const update<%=modelName%> = async (req, res, next) => {
    try {
     const {id} = req.params;   

     const <%=modelName.toLowerCase()%> = await <%=modelName%>.update({},{where:{id: id}});

     res.json({<%=modelName.toLowerCase()%>})

    } catch (error) {
      next(error);
    }
  };


  // Update a record/ressource by id

  export const delete<%=modelName%> = async (req, res, next) => {
    try {
     const {id} = req.params;   

     const <%=modelName.toLowerCase()%> = await <%=modelName%>.destroy({where:{id: id}});

     res.json({<%=modelName.toLowerCase()%>: null})

    } catch (error) {
      next(error);
    }
  };



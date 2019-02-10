require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../lib/config/prjconfig');
const URL = 'http://localhost:8002/v2';

const request = async (req, api) => {
  try{
    if(!req.session.jwt){
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: config.node.client_secret
      });
      req.session.jwt = tokenResult.data.token;
    }

    return await axios.get(`${URL}${api}`, {
      headers: {authorization: req.session.jwt}
    });
  }catch(error){
    console.error(error);
    if(error.reponse.status < 500){
      return error.response;
    }
    throw error;
  }
};

router.get('/mypost', async (req, res, next) => {
  try{
    const result = await request(req, '/posts/my');
    res.json(result.data);
  }catch(error){
    console.error(error);
    next(error);
  }
});

router.get('/search/:hashtag', async (req, res, next) => {
  try{
    const result = await request(req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`);
    res.json(result.data);
  }catch(error){
    if(error.code){
      console.error(error);
      next(error);
    }
  }
});

router.get('/', (req, res) => {
  res.render('main', { key: config.node.client_secret });
});

module.exports = router;
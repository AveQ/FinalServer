const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET ALL
exports.pollutions_get_all_stations = (req, res, next) => {
    let data;
  const url = "http://api.gios.gov.pl/pjp-api/rest/station/findAll";

  const getData = async (url) => {
    try {
      const response = await axios.get(url)
      data = response.data
      res.status(200).json(data);
    } catch (error) {
      console.log(error)
    }
  }

  getData(url)
}

// GET STATION
exports.pollutions_get_station = (req, res, next) => {
    let data;
  const url = "http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/" + req.params.value;

  const getData = async (url) => {
    try {
      const response = await axios.get(url)
      data = response.data
      res.status(200).json(data);
    } catch (error) {
      console.log(error)
    }
  }

  getData(url)
}
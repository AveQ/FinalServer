/* sekcja odpowiedzialna za pobieranie łączenie się z api.gios.gov.pl i 
   ściąganie danych o zanieczyszczeniach w powietrzu. 
   Do łączenia się z API użyto biblioteki axios */


const express = require('express');
const router = express.Router();
const axios = require('axios');
const PollutionsController = require('../controllers/pollutionExternalApi');

//GET all station
router.get('/', PollutionsController.pollutions_get_all_stations);

//GET polution - one station
router.get('/:value', PollutionsController.pollutions_get_station);

module.exports = router;
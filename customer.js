const database = require('./database');
const express = require('express');
const { response } = require('express');

router = express.Router();

router.get('/customer/all', (req, res, next) => {
    database.connection.all("select * from customer", (errors, results) => {
        if (errors) {
            res.status(500).send('Some error occurred');
        }
        else {
            res.status(200).send(results);
        }
    });
});

router.put('/customer/update', (req, res, next) => {
    let stm = `update customer set email = "${req.body.email}" where name = "${req.body.name}"`;

    database.connection.all(stm, (errors, results) => {
        if (errors) {
            res.status(500).send('Unable to update customer. ' + stm);
        }
        else {
            res.status(200).send('Customer Record updated successfully. ' + stm);
        }
    })
});

router.post('/customer/add', (req, res, next) => {
    let stm = `insert into customer values ("${req.body.email}", "${req.body.name}", "${req.body.password}")`;

    database.connection.all(stm, (errors, results) => {
        if (errors) {
            res.status(500).send('Unable to add customer. ' + stm);
        }
        else {
            res.status(200).send('New Customer Record added successfully. ' + stm);
        }
    });
});

router.delete('/customer/delete', (req, res, next) => {
    let stm = `delete from customer where name = "${req.body.name}"`;

    database.connection.all(stm, (errors, results) => {
        if (errors) {
            res.status(500).send('Unable to delete customer. ' + stm);
        }
        else {
            res.status(200).send('Customer Record deleted successfully. ' + stm);
        }
    });
});

// Get all shop orders of customer using customer name in query
router.get('/customer/getorders', (req, res, next) => {
    let stm = `select c.name, i.name, s.quantity, s.shipping_date from shop_order s, customer c, item i where c.email = s.custEmail and i.id = s.itemID and c.name = "${req.query.name}"`;

    database.connection.all(stm, (errors, results) => {
        if (errors) {
            res.status(500).send('Unable to get all orders of customer. ' + stm);
        }
        else {
            res.status(200).send(results);
        }
    });
});

module.exports = { router };
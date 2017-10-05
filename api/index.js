const express = require('express');

import { getCpuPercentage, current } from './cpuUtils';

const port = 9000;

const app = express();
const router = express.Router();

app.use('/', express.static('./build/static'));
app.use('/api', router);

router.route('/getCpuUsage').get(function(req, res) {
    res.json({ cpuUsage : current.cpuUsage });
});

app.listen(port, () => {
    console.log('Runned on: ' + port)
});

getCpuPercentage();
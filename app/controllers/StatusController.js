const Host = require("../../database/models/Host");
const Status = require("../../database/models/Status");
const https = require("https");
const async = require("async");
const sequelize = require("../../database/connexion");
const { Resolver } = require("../core/Resolver");

async function StatusController(req, res) {
  const dbhosts = await Host.findAll({order: [['id', 'ASC']]});

  async.map(dbhosts, (host, callback) => {
    Resolver.resolveNow(host).then((res) => { return callback(null, res) })
  }).then(async (hosts) => {
    async.map(hosts, (host, callback) => {
      Status.findAll({ where: { host_id: host.id }, limit: 60, raw: true, order:  [['id', 'DESC']] })
        .then((history) => {
          json = JSON.parse(JSON.stringify(history))
          host.history = json
          return callback(null, host)
        })
    }).then(async (hosts) => {
      async.map(hosts, (host, callback) => {
        sequelize.query(`call get_disponibility(${host.id})`).then((response) => {
          host.dispo = response[0].TOTAL;
          return callback(null, host)
        })
      }).then(async (hosts) => {
        let currentTime = new Date();
        currentTime.setDate(currentTime.getDate() - 60);
        const date = currentTime.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'})
        await res.render("home", { message: "test", hosts: hosts, date: date });
      });
    });
  })
}

module.exports = {
  StatusController,
};

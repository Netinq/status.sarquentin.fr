const Host = require("../../database/models/Host");
const Status = require("../../database/models/Status");
const https = require("https");
const async = require("async");
const sequelize = require("../../database/connexion");
const { Resolver } = require("../core/Resolver");

async function StatusController(req, res) {
  console.log('StatusController');
  const dbhosts = await Host.findAll({order: [['id', 'ASC']]});
  async.map(dbhosts, (host, callback) => {
    console.log('MAP DBHOSTS');
    Resolver.resolveNow(host).then((res) => { return callback(null, res) })
  }).then(async (hosts) => {
    console.log('HOST RESOLVED');
    async.map(hosts, (host, callback) => {
      Status.findAll({ where: { host_id: host.id }, limit: 60, raw: true, order:  [['id', 'DESC']] })
        .then((history) => {
          json = JSON.parse(JSON.stringify(history))
          host.history = json.reverse()
          return callback(null, host)
        })
    }).then(async (hosts) => {
      async.map(hosts, (host, callback) => {
        if (host.history.length <= 0) return callback(null, host)
        // host.dispo = response[0].TOTAL;
        let uptime = 0;
        let downtime = 0;
        host.history.map((status) => {
          if (status.code == 200) uptime++
          else downtime++
        })
        host.dispo = Math.round(uptime / (uptime + downtime) * 100)
        return callback(null, host)
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
